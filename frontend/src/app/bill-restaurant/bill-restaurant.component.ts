import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BillItem } from '../models/billItem';
import { CashRegister } from '../models/cashRegister';
import { Company } from '../models/company';
import { Item } from '../models/item';
import { ObjectDescrtiptor } from '../models/object';
import { BillService } from '../services/bill.service';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-bill-restaurant',
  templateUrl: './bill-restaurant.component.html',
  styleUrls: ['./bill-restaurant.component.css']
})
export class BillRestaurantComponent implements OnInit {

  constructor(private companyService: CompanyService,
              private formBuilder: FormBuilder,
              private billService: BillService) {

          
  }
  @Input('company') company: Company

  billItems: BillItem[] = new Array<BillItem>()
  object: ObjectDescrtiptor = null
  objectName: string = ""
  allObjects: ObjectDescrtiptor[]
  restaurant: CashRegister = null
  takenTables: Array<{tableID: number, sectionName: string, billItems: BillItem[]}> = new Array<{tableID: number, sectionName: string, billItems: BillItem[]}>()
  changeNum: number = 0;


  ngOnInit(): void {
    this.getObjectDescriptors()
  }

  getObjectDescriptors(){
    this.allObjects = new Array<ObjectDescrtiptor>()
    for(let reg of this.company.cashRegisters){
      let obj = new ObjectDescrtiptor(reg.id, reg.storeName, 1)
      this.allObjects.push(obj)
    }
  }

  change(){
    this.restaurant = null
    this.object = this.allObjects.find((obj) => {
      return obj.name === this.objectName
    })
    if(this.object.type == 1){
      this.restaurant = this.company.cashRegisters.find((obj) => {
        return obj.storeName === this.object.name && obj.id === this.object.id
      })
    }
  }

  openBill(event: any){
    console.log(event)
    this.takenTables.push({tableID: event.tableID, sectionName: event.sectionName, billItems: new Array<BillItem>()})
    console.log(this.takenTables)
  }

  selectedTableBill: {tableID: number, sectionName: string, billItems: BillItem[]} = null

  showBill(tableDesc: {tableID: number, sectionName: string}){
    this.selectedTableBill = this.takenTables.find((table) => {
      return table.tableID == tableDesc.tableID && table.sectionName === tableDesc.sectionName
    })
    console.log(this.selectedTableBill)
  }

  closeBill(event: any){
    let tableDesc = this.takenTables.find((table) => {
      return table.tableID == event.tableID && table.sectionName == event.sectionName
    })
    let ind = this.takenTables.indexOf(tableDesc)
    this.takenTables.splice(ind, 1)
    this.selectedTableBill = null
    let section = this.restaurant.sections.find((sect) => {
      return sect.name === event.sectionName
    })
    let table = section.tables.find((t) =>{
      return t.id == event.tableID
    })
    table.taken = false
    this.changeNum = (this.changeNum + 1)%2
  }

}
