import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BillItem, BillItemStorage } from '../models/billItem';
import { Item, ItemStorageDescriptor } from '../models/item';
import { ObjectDescrtiptor } from '../models/object';

@Component({
  selector: 'app-bill-item',
  templateUrl: './bill-item.component.html',
  styleUrls: ['./bill-item.component.css']
})
export class BillItemComponent implements OnInit {

  constructor() { }
  @Input('item') item: Item
  @Input('object') object: ObjectDescrtiptor
  @ViewChild('input') input: ElementRef
  @Output() addToBillEvent: EventEmitter<{item: Item, billItem: BillItemStorage}> = new EventEmitter()

  showDialog: boolean = false
  storageDescriptor: ItemStorageDescriptor
  quantity: number


  ngOnInit(): void {
    console.log(this.item.storage)
    console.log(this.object)
    this.getStorageDescriptor()
  }

  getStorageDescriptor(){
    this.storageDescriptor = this.item.storage.find((storage) => {
      return storage.name === this.object.name && storage.id == this.object.id
    })
  }

  show(){
    this.showDialog = !this.showDialog
  }


  add(){
    if(this.quantity == 0) return
    if(this.quantity < 0){
      alert('Uneli ste negativan broj')
      return
    }
    if(this.storageDescriptor.currentStock < this.quantity){
      alert(`Nema dovoljno artikala na stanju u objektu: ${this.storageDescriptor.name}`)
      return
    }
    if(this.storageDescriptor.currentStock - this.quantity < this.storageDescriptor.minStock){
      alert(`Ostace premalo artikla na stanju u objektu: ${this.storageDescriptor.name}`)
      return
    }
    let billItem = new BillItemStorage(this.object.name, this.object.id, this.item.tax)
    billItem.itemQuantity = this.quantity
    billItem.price = this.quantity*this.storageDescriptor.retailPrice * (1 +  billItem.itemTax)
    let item = this.item
    this.addToBillEvent.emit({item, billItem})
    this.showDialog = false
    this.quantity = 0
  }


  cancel(){
    this.quantity = 0
    this.showDialog = false
  }
}
