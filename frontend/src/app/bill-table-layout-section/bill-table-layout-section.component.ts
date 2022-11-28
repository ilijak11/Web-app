import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { Section } from '../models/cashRegister';
import { Table } from '../models/table';

@Component({
  selector: 'app-bill-table-layout-section',
  templateUrl: './bill-table-layout-section.component.html',
  styleUrls: ['./bill-table-layout-section.component.css']
})
export class BillTableLayoutSectionComponent implements OnInit, AfterViewInit, OnChanges{

  constructor() { }
  @Input('section') section: Section
  @Input('change') change: number
  @Output() openBillEvent: EventEmitter<any> = new EventEmitter()
  @ViewChild('canvas', {static: false}) canvas: ElementRef<HTMLCanvasElement>

  ngOnInit(): void {
  }

  initView: boolean = false

  ngAfterViewInit(): void {
    this.initView = true
    this.drawGrid()
    this.drawAllTables()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.initView){
      console.log('change123')
      this.drawAllTables()
    }
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
    if(table.taken == true){
      ctx.fillStyle = "red"
      ctx.fill()
      ctx.fillStyle = "black"
      ctx.fillText("zauzet", table.x - 30, table.y + table.radius-15)
      ctx.fillStyle = "black"
      ctx.fillText(table.id, table.x, table.y)
    }
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
    if(table.taken == true){
      ctx.fillStyle = "red"
      ctx.fill()
      ctx.fillStyle = "black"
      ctx.fillText("zauzet", table.x + 10, table.y + table.height - 5)
      ctx.fillStyle = "black"
      ctx.fillText(table.id, table.x + 20, table.y + 20)
    }
    ctx.stroke()
  }

  drawAllTables(){
    console.log(this.section.tables)
    for(let table of this.section.tables){
      console.log(table)
      this.drawTable(table)
    }
  }

  openBill(table: Table){
    if(table.taken){
      alert(`Racun za sto ${table.id} u sekciji ${this.section.name} vec otvoren`)
      return
    }
    table.taken = true
    this.drawAllTables()
    this.openBillEvent.emit({tableID: table.id, sectionName: this.section.name})
  }

}
