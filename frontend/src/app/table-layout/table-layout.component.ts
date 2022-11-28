import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../models/company';
import { Table } from '../models/table';

@Component({
  selector: 'app-table-layout',
  templateUrl: './table-layout.component.html',
  styleUrls: ['./table-layout.component.css']
})
export class TableLayoutComponent implements OnInit {

  constructor() { }
  @Input('company') company: Company
  @Output() changeEvent: EventEmitter<any> = new EventEmitter()


  ngOnInit(): void {
    
  }

  objectEvent(event: any){
    this.changeEvent.emit()
  }
}
