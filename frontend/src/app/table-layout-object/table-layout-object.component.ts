import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CashRegister, Section } from '../models/cashRegister';
import { Company } from '../models/company';
import { Table } from '../models/table';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-table-layout-object',
  templateUrl: './table-layout-object.component.html',
  styleUrls: ['./table-layout-object.component.css']
})
export class TableLayoutObjectComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private companyService: CompanyService) { }
  @Input('object') object: CashRegister
  @Output() objectEvent: EventEmitter<any> = new EventEmitter()

  showForm: boolean = false;
  formGroup: FormGroup;
  isSubmitted: boolean = false

  ngOnInit(): void {
  }

  buildForm(){
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      height: [200, Validators.required],
      width: [200, Validators.required]
    })
  }

  toggle(){
    if(this.showForm == false){
      this.buildForm()
      this.showForm = true
    }
    else{
      this.showForm = false
    }
  }

  onSubmit(){
    this.isSubmitted = true
    if(this.formGroup.invalid){
      console.log('invalid form')
      return
    }

    this.isSubmitted = false

    let name = this.formGroup.controls['name'].value
    let height = this.formGroup.controls['height'].value
    let width = this.formGroup.controls['width'].value

    let section = new Section(height, width, name)
    let company = JSON.parse(sessionStorage.getItem('company'))

    console.log(section)
    console.log(company)

    this.companyService.addNewSection(company.companyID, this.object.id, section).subscribe((res) => {
      if(res['status'] == -1){
        alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
      }
      else{
        let company = res['company']
        console.log(company)
        sessionStorage.setItem('company', JSON.stringify(company))
        this.sectionEvent()
      }
    })
  }

  tableEvent(event: any){
    this.objectEvent.emit()
  }

  sectionEvent(){
    this.objectEvent.emit()
  }
}
