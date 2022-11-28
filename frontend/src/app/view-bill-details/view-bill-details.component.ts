import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../models/bill';

@Component({
  selector: 'app-view-bill-details',
  templateUrl: './view-bill-details.component.html',
  styleUrls: ['./view-bill-details.component.css']
})
export class ViewBillDetailsComponent implements OnInit {

  constructor() { }
  @Input('bill') bill: Bill

  details: boolean = false

  ngOnInit(): void {
  }

  showDetails(){
    this.details = !this.details
  }

  printDate(): string{
    return formatDate(this.bill.date, 'dd.MM.yyyy HH:mm', 'en-US')
  }

}
