import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CashRegister } from '../models/cashRegister';

@Component({
  selector: 'app-bill-table-layout',
  templateUrl: './bill-table-layout.component.html',
  styleUrls: ['./bill-table-layout.component.css']
})
export class BillTableLayoutComponent implements OnInit, OnChanges {

  constructor() { }
  @Input('object') object: CashRegister
  @Input('change') change: number
  @Output() openBillEvent: EventEmitter<any> = new EventEmitter()

  ngOnInit(): void {
  }

  changeNum: number = 0

  ngOnChanges(changes: SimpleChanges): void {
    console.log('promena')
    this.changeNum = (this.changeNum + 1)%2
  }

  openBill(event: any){
    this.openBillEvent.emit(event)
  }

}
