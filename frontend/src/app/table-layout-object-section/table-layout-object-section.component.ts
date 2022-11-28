import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CashRegister, Section } from '../models/cashRegister';
import { Company } from '../models/company';
import { Table } from '../models/table';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-table-layout-object-section',
  templateUrl: './table-layout-object-section.component.html',
  styleUrls: ['./table-layout-object-section.component.css']
})
export class TableLayoutObjectSectionComponent implements OnInit, AfterViewInit {

  constructor(private formBuilder: FormBuilder,
              private companyService: CompanyService){}
  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLCanvasElement>
  @Input('object') object: CashRegister
  @Input('section') section: Section
  @Output() tableEvent: EventEmitter<any> = new EventEmitter()

  showDialog: boolean = false;
  formGroup: FormGroup
  isSubmitted: boolean = false
  company: Company
  update: boolean = false;

  ngOnInit(): void {
    this.getCompanyFromSession()
  }

  getCompanyFromSession(){
    this.company = JSON.parse(sessionStorage.getItem('company'))
  }

  buildForm(): void{
    this.formGroup = this.formBuilder.group({
      id: ['', [Validators.required]],
      shape: ['', [Validators.required]],
      height: [40, Validators.required],
      width: [40, Validators.required],
      radius: [30, Validators.required],
    })
  }

  toggle(){
    this.table = null
    if(this.showDialog == false){
      this.buildForm()
      this.showDialog = true
    }
    else{
      this.showDialog = false
    }
  }

  table: Table = null

  onSubmit(): void{
    this.isSubmitted = true
    if(this.formGroup.invalid){
      console.log('invalid form')
      return
    }
    this.isSubmitted = false

    let id = this.formGroup.controls['id'].value
    let shape = this.formGroup.controls['shape'].value
    let height = this.formGroup.controls['height'].value
    let width = this.formGroup.controls['width'].value
    let radius = this.formGroup.controls['radius'].value

    if(shape == 0){
      //krug
      height = 0
      width = 0
    }
    else{
      //pravougaonik
      radius = 0
    }

    console.log(id)
    console.log(shape)
    console.log(height)
    console.log(width)
    console.log(radius)

    let table = new Table(id, 0, 0,  shape, height, width, radius)

    this.table = table

    console.log(table)

  }
  
  drawGrid(){
    let width = this.section.width
    let height = this.section.height

    console.log(width)
    console.log(height)

    let context = this.canvas.nativeElement.getContext('2d');

    for (var x = 0; x <= width; x += 40) {
      context.moveTo(x, 0);
      context.lineTo(x, height);
    }

    for (var x = 0; x <= height; x += 40) {
        context.moveTo(0,x);
        context.lineTo(width, x);
    }
    context.strokeStyle = "lightgray";
    context.stroke();
  }

  drawTable(table: Table){
    if(table.shape == 0) this.drawCircle(table)
    else this.drawRectangle(table)
  }

  drawCircle(table: Table){
    let ctx = this.canvas.nativeElement.getContext('2d');
    ctx.beginPath();
    ctx.arc(table.x, table.y, table.radius, 0, 2*Math.PI)
    ctx.fillStyle = "green"
    ctx.fill()
    ctx.font = "20px Arial"
    ctx.fillStyle = "black"
    ctx.fillText(table.id, table.x, table.y)
    ctx.stroke()
  }

  drawRectangle(table: Table){
    let ctx = this.canvas.nativeElement.getContext('2d')
    ctx.beginPath();
    ctx.rect(table.x, table.y ,table.width, table.height)
    ctx.fillStyle = "green"
    ctx.fill()
    ctx.font = "20px Arial"
    ctx.fillStyle = "black"
    ctx.fillText(table.id, table.x + 20, table.y + 20)
    ctx.stroke()
  }

  drawTableAtPosition(evt: any){
    if(this.table == null) return

    let rect = this.canvas.nativeElement.getBoundingClientRect()


    let x = (evt.clientX - rect.left) / (rect.right - rect.left) * this.canvas.nativeElement.width
    let y = (evt.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.nativeElement.height

    this.table.x = Math.floor(x)
    this.table.y = Math.floor(y)

    if(this.checkOverlap()){
      alert('Stolovi se preklapaju')
      return
    }
    

    if(this.update){
      console.log('update')
      this.companyService.moveTable(this.company.companyID, this.object.id, this.section.name, this.table).subscribe((res) => {
        if(res['status'] == -1){
          alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
        }
        else{
          this.drawTable(this.table)
          let company = res['company']
          sessionStorage.setItem('company', JSON.stringify(company))
          this.tableAction()
          this.table = null
          this.update = false
        }
      })
    }
    else{
      console.log('new')
      this.companyService.addNewTable(this.company.companyID, this.object.id, this.section.name, this.table).subscribe((res) => {
        if(res['status'] == -1){
          alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
        }
        else{
          this.drawTable(this.table)
          let company = res['company']
          sessionStorage.setItem('company', JSON.stringify(company))
          this.tableAction()
          this.table = null
        }
      })
    }
  }

  deleteSection(){
    let proceed = confirm(`Da li ste sigurni da zelite da obrisete sekciju: ${this.section.name} objekta: ${this.object.storeName}`)
    if(!proceed) return

    this.companyService.deleteSection(this.company.companyID, this.object.id, this.section).subscribe((res) => {
      if(res['status'] == -1){
        alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
      }
      else{
        alert('Sekcija uspesno izbrisana')
        let company = res['company']
        this.company = company
        sessionStorage.setItem('company', JSON.stringify(company))
        this.tableAction()
      }
    })
  }

  deleteTable(table: Table){
    this.companyService.deleteTable(this.company.companyID, this.object.id, this.section.name, table).subscribe((res) => {
      if(res['status'] == -1){
        alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
      }
      else{
        let company = res['company']
        sessionStorage.setItem('company', JSON.stringify(company))
        this.tableAction()
      }
    })
  }

  moveTable(table: Table){
    this.table = table;
    this.update = true;
  }

  cancelUpdate(){
    this.table = null;
    this.update = false
  }

  drawAllTables(){
    console.log(this.section.tables)
    for(let table of this.section.tables){
      console.log(table)
      this.drawTable(table)
    }
  }

  checkOverlap(): boolean{
    if(!this.table) return false
    for(let t of this.section.tables){
      if(this.update && t.id == this.table.id) continue
      if(this.table.shape == 0){ //circle
        if(t.shape == 0){//circle
          if(this.overlapCircle(this.table, t)){
            console.log(`Overlap cc tables: ${this.table.id}, ${t.id}`)
            return true
          }
        }
        else{  // square
          if(this.overlapCircleSquare(this.table, t)){
            console.log(`Overlap cs tables: ${this.table.id}, ${t.id}`)
            return true
          }
        }
      }
      else{ // square
        if(t.shape == 0){ // circle
          if(this.overlapCircleSquare(t, this.table)){
            console.log(`Overlap cs tables: ${this.table.id}, ${t.id}`)
            return true
          }
        }
        else{//square
          if(this.overlapSquare(this.table, t)){
            console.log(`Overlap ss tables: ${this.table.id}, ${t.id}`)
            return true
          }
        }
      }
    }
    return false
  }

  overlapCircle(t1: Table, t2: Table){
    var dist = Math.sqrt(Math.pow((t1.x - t2.x), 2) + Math.pow((t1.y - t2.y), 2))
    return dist < t1.radius + t2.radius
  }

  overlapSquare(t1: Table, t2: Table){
    return (t1.x < t2.x + t2.width) && (t1.x + t1.width > t2.x) && (t1.y < t2.y + t2.height) && (t1.y + t1.height > t2.y)
  }

  overlapCircleSquare(c: Table, s: Table){
    //closest edge (xs, ys)
    var xs = s.x
    var ys = s.y
    if(c.x >= s.x + s.width) xs += s.width
    if(c.y >= s.y + s.height) ys += s.height
    var dist = Math.sqrt(Math.pow((c.x - xs), 2) + Math.pow((c.y - ys), 2))
    if(dist < c.radius) return true
    else return (c.x > s.x) && (c.x < s.x + s.width) && (c.y > s.y) && (c.y < s.y + s.height)
  }

  ngAfterViewInit(){
    this.drawGrid()
    this.drawAllTables()
  }

  tableAction(){
    this.tableEvent.emit()
  }
}
