import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bill } from '../models/bill';
import { BillItem, BillItemStorage } from '../models/billItem';
import { Company } from '../models/company';
import { Item } from '../models/item';
import { ObjectDescrtiptor } from '../models/object';
import { BillService } from '../services/bill.service';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  constructor(private companyService: CompanyService,
              private formBuilder: FormBuilder,
              private billService: BillService) { }
  @Input('company') company: Company

  allItems: Item[]
  billItems: BillItem[] = new Array<BillItem>()
  formGroup: FormGroup
  isSubmitted: boolean = false
  displayForm: number = -1
  totalPrice: number = 0
  totalBasePrice: number = 0
  object: ObjectDescrtiptor = null
  objectName: string = ""
  allObjects: ObjectDescrtiptor[]
  error: boolean = false

  ngOnInit(): void {
    this.getAllItems()
    this.buildForm()
    this.getObjectDescriptors()
  }

  getObjectDescriptors(){
    this.allObjects = new Array<ObjectDescrtiptor>()
    for(let reg of this.company.cashRegisters){
      let obj = new ObjectDescrtiptor(reg.id, reg.storeName, 1)
      this.allObjects.push(obj)
    }
    for(let storage of this.company.storageUnits){
      let obj = new ObjectDescrtiptor(storage.id, storage.name, 0)
      this.allObjects.push(obj)
    }
  }

  change(){
    this.object = this.allObjects.find((obj) => {
      return obj.name === this.objectName
    })
    this.getAllItems()
  }

  buildForm(){
    this.formGroup = this.formBuilder.group({
      paymentMethod: ['', [Validators.required]]
    })
  }

  formCash: FormGroup
  buildFormCash(){
    this.formCash = this.formBuilder.group({
      userID: ['', []],
      userPaid: ['', [Validators.required]],
      userChange: ['']
    })
    console.log('form cash')
  }

  calculateChange(){
    console.log('change')
    this.formCash.controls['userChange'].setValue(this.formCash.controls['userPaid'].value - this.totalPrice)
  }

  formCheck: FormGroup
  buildFormCheck(){
    this.formCheck = this.formBuilder.group({
      userFirstname: ['', [Validators.required]],
      userLastname: ['', [Validators.required]],
      userID: ['', [Validators.required]],
    })
    console.log('form check')
  }

  formCard: FormGroup
  buildFormCard(){
    this.formCard = this.formBuilder.group({
      userID: ['', [Validators.required]],
      billNumber: ['', [Validators.required]]
    })
    console.log('form card')
  }

  formVirman: FormGroup
  buildFormVirman(){
    this.formVirman = this.formBuilder.group({
      virman: ['', [Validators.required]]
    })
    console.log('form virman')
  }

  getAllItems(){
    this.companyService.getAllItems(this.company.companyID).subscribe((res) => {
      if(res['status'] == -1){
        alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
      }
      else if(res['status'] == 1){
        alert('Pogresan maticni broj firme')
      }
      else{
        this.allItems = res['items']
        console.log(this.allItems)
      }
    })
  }

  addToBill(event: any){
    console.log(event.item)
    console.log(event.billItem)
    let billItem = new BillItem(event.item.id, event.item.name, event.item.unit, event.item.tax, event.billItem)
    console.log(billItem)
    this.billItems.push(billItem)
    this.error = false
    this.totalPrice += billItem.price
    this.totalBasePrice += billItem.basePrice
  }

  onSubmit(){
    this.isSubmitted = true
    if(this.billItems.length == 0){
      this.error = true
      return
    }
    switch(this.displayForm){
      case  0:{
        this.submitCash()
        break;
      }
      case  1:{
        this.submitCheck()
        break;
      }
      case  2:{
        this.submitCard()
        break;
      }
      case  3:{
        this.submitVirman()
        break;
      }
      default:{
        console.log('default')
      }
    }
  }

  submitCash(){
    if(this.formCash.invalid){
      console.log('invalid form')
      return
    }
    
    let userID = this.formCash.controls['userID'].value
    let userPaid = this.formCash.controls['userPaid'].value
    let userChange = this.formCash.controls['userChange'].value


    if(this.totalPrice > userPaid){
      alert('Kupac nije dao dovoljno novca!')
      return
    }

    this.isSubmitted = false

    let bill = new Bill(this.displayForm, this.company.companyID, this.object.name, this.company.companyName, this.company.pib,  this.totalPrice, this.totalBasePrice, this.billItems)
    bill.userPaid = userPaid
    bill.userChange = userChange
    bill.userID = userID

    console.log(bill)

    this.billService.addNewBill(bill).subscribe((res) => {
      if(res['stauts'] == -1){
        alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
      }
      else{
        this.updateItemStock()
        alert('Racun uspesno registrovan')
      }
    })
  }

  submitCheck(){
    if(this.formCheck.invalid){
      console.log('invalid form')
      return
    }
    
    let userFirstname = this.formCheck.controls['userFirstname'].value
    let userLastname = this.formCheck.controls['userLastname'].value
    let userID = this.formCheck.controls['userID'].value

    this.isSubmitted = false
    let bill = new Bill(this.displayForm, this.company.companyID, this.object.name, this.company.companyName, this.company.pib, this.totalPrice, this.totalBasePrice, this.billItems)
    bill.userFirstname = userFirstname
    bill.userLastname = userLastname
    bill.userID = userID

    console.log(bill)

    this.billService.addNewBill(bill).subscribe((res) => {
      if(res['stauts'] == -1){
        alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
      }
      else{
        this.updateItemStock()
        alert('Racun uspesno registrovan')
      }
    })
  }

  submitCard(){
    if(this.formCard.invalid){
      console.log('invalid form')
      return
    }
    
    let userID = this.formCard.controls['userID'].value
    let billNumber = this.formCard.controls['billNumber'].value

    this.isSubmitted = false

    let bill = new Bill(this.displayForm, this.company.companyID, this.object.name, this.company.companyName, this.company.pib, this.totalPrice, this.totalBasePrice, this.billItems)
    bill.userID = userID
    bill.billNumber = billNumber

    this.billService.addNewBill(bill).subscribe((res) => {
      if(res['stauts'] == -1){
        alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
      }
      else{
        this.updateItemStock()
        alert('Racun uspesno registrovan')
      }
    })
  }

  submitVirman(){
    if(this.formVirman.invalid){
      console.log('invalid form')
      return
    }
    
    let virmanCompanyID = this.formVirman.controls['virman'].value

    this.isSubmitted = false

    let bill = new Bill(this.displayForm, this.company.companyID, this.object.name, this.company.companyName, this.company.pib,  this.totalPrice, this.totalBasePrice, this.billItems)
    bill.virmanCompanyID = virmanCompanyID
    let virman = this.company.orderers.find((orderer) => {
      return orderer.companyID === virmanCompanyID
    })
    bill.discount = virman.discount
    bill.paymentDeadline = virman.paymentDeadline
    bill.price = (1 - virman.discount) * bill.price
    bill.basePrice = (1 - virman.discount) * bill.basePrice

    this.billService.addNewBill(bill).subscribe((res) => {
      if(res['stauts'] == -1){
        alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
      }
      else{
        this.updateItemStock()
        alert('Racun uspesno registrovan')
      }
    })
  }

  onChange(){
    let paymentMethod = this.formGroup.controls['paymentMethod'].value
    console.log(paymentMethod)
    switch(paymentMethod){
      case  '0':{
        this.buildFormCash()
        break;
      }
      case  '1':{
        this.buildFormCheck()
        break;
      }
      case  '2':{
        this.buildFormCard()
        break;
      }
      case  '3':{
        this.buildFormVirman()
        break;
      }
      default:{
        console.log('default')
      }
    }
    this.displayForm = parseInt(paymentMethod)
  }

  updateItemStock(){
    for(let item of this.billItems){
        this.companyService.updateStorageStock(this.company.companyID, item.itemID, item.storage.storageID, item.storage.storageName, -item.storage.itemQuantity).subscribe(res => {
          if(res['status'] == -1){
            console.log('greska...')
          }
          else{
            console.log(`updated stock for item: ${item.itemID} storage: ${item.storage.storageID}, ${item.storage.storageName}, quantity: -${item.storage.itemQuantity}`)
            this.getAllItems()
          }
      })
    }
  }

}
