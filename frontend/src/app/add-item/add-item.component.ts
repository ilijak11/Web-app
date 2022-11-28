import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Company } from '../models/company';
import { Item, ItemAdditionalInformation, ItemStorageDescriptor } from '../models/item';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private companyService: CompanyService) { }

  ngOnInit(): void {
    this.buildForm()
    this.makeStorage()
  }

  units: string[] = ['paket', 'litar', 'kilogram','tona', 'paleta', 'komad', 'porcija']

  @Input('company') company: Company
  @Output() itemAdded: EventEmitter<any> = new EventEmitter() 
  formGroup: FormGroup
  page: number = 1
  toggle: boolean = false
  isSubmitted: boolean = false
  tooMuchStock: boolean = false
  tooFewStock: boolean = false
  storageArr: ItemStorageDescriptor[]

  buildForm(): void{
    this.formGroup = this.formBuilder.group({
      picture: [''],
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      tax: ['', [Validators.required]],
      productType: ['', [Validators.required]],
      originCountry: [null],
      foreignName: [null],
      barcode: [null],
      manufacturer: [null],
      customsTariff: [null],
      ecoTax: [null],
      exciseTax: [null],
      minStock: [null],
      maxStock: [null],
      description: [''],
      declaration: [''],
    })
  }

  itemAddedEvent(){
    this.itemAdded.emit()
  }

  printData(){
    console.log(this.formGroup.controls['id'].value)
    console.log(this.formGroup.controls['name'].value)
    console.log(this.formGroup.controls['unit'].value)
    console.log(this.formGroup.controls['tax'].value)
    console.log(this.formGroup.controls['productType'].value)
    console.log(this.formGroup.controls['originCountry'].value)
    console.log(this.formGroup.controls['foreignName'].value)
    console.log(this.formGroup.controls['barcode'].value)
    console.log(this.formGroup.controls['manufacturer'].value)
    console.log(this.formGroup.controls['customsTariff'].value)
    console.log(this.formGroup.controls['ecoTax'].value)
    console.log(this.formGroup.controls['exciseTax'].value)
    console.log(this.formGroup.controls['minStock'].value)
    console.log(this.formGroup.controls['maxStock'].value)
    console.log(this.formGroup.controls['description'].value)
    console.log(this.formGroup.controls['declaration'].value)
  }

  makeStorage(){
    this.storageArr = new Array<ItemStorageDescriptor>()
    for(let unit of this.company.storageUnits){
      let storage = new ItemStorageDescriptor()
      storage.id = unit.id
      storage.storageType = 0
      storage.name = unit.name
      storage.purchasePrice = 0
      storage.retailPrice = 0
      storage.currentStock = 0
      storage.maxStock = 0
      storage.minStock = 0 
      this.storageArr.push(storage)
    }
    for(let unit of this.company.cashRegisters){
      let storage = new ItemStorageDescriptor()
      storage.id = unit.id
      storage.storageType = 1
      storage.name = unit.storeName
      storage.purchasePrice = 0
      storage.retailPrice = 0
      storage.currentStock = 0
      storage.maxStock = 0
      storage.minStock = 0 
      this.storageArr.push(storage)
    }
  }

  storageType(storage: ItemStorageDescriptor): string{
    if(storage.storageType == 0) return 'Magacin'
    else return 'Objekat'
  }

  imageSrc: any = '../../assets/items/default.png'

  onFileChange(event: any){
    if(event.target.files.length > 0){
      const picture = event.target.files[0]
      const reader = new FileReader();
      reader.onload = (e) => {
        var img = new Image()
        img.src = <string>e.target.result
        img.onload = () => {
          console.log(img.width)
          console.log(img.height)
          if(img.height > 100 || img.width > 100){
            alert('Fajl mora biti izmedju 100x100 ili 300x300 px')
            this.formGroup.controls['picture'].setValue("")
            return
          }
          else{
            this.imageSrc = reader.result
            console.log(this.imageSrc)
          }
        }
      }
      reader.readAsDataURL(picture)
    }
  }

  onSubmit(): void{

    if(this.company.category == 0){
      this.formGroup.controls['productType'].setValue(-1)
    }

    this.tooFewStock = false;
    this.tooMuchStock = false;

    console.log(this.storageArr)
    this.isSubmitted = true;
    if(this.formGroup.invalid){
      console.log('invalid form')
      return
    }

    let id = this.formGroup.controls['id'].value
    let name = this.formGroup.controls['name'].value
    let unit = this.formGroup.controls['unit'].value
    let tax = this.formGroup.controls['tax'].value
    let productType = this.formGroup.controls['productType'].value
    let originCountry = this.formGroup.controls['originCountry'].value
    let foreignName = this.formGroup.controls['foreignName'].value
    let barcode = this.formGroup.controls['barcode'].value
    let manufacturer = this.formGroup.controls['manufacturer'].value
    let customsTariff = this.formGroup.controls['customsTariff'].value
    let exciseTax = this.formGroup.controls['exciseTax'].value
    let ecoTax = this.formGroup.controls['ecoTax'].value
    let minStock = this.formGroup.controls['minStock'].value
    let maxStock = this.formGroup.controls['maxStock'].value
    let description = this.formGroup.controls['description'].value
    let declaration = this.formGroup.controls['declaration'].value


    let additionalInfo: ItemAdditionalInformation = null
    if(originCountry || foreignName || barcode || manufacturer || customsTariff || exciseTax || ecoTax || minStock || maxStock || description || declaration){
      additionalInfo = new ItemAdditionalInformation()
      additionalInfo.originCountry = originCountry
      additionalInfo.foreignName = foreignName
      additionalInfo.barcode = barcode
      additionalInfo.manufacturer = manufacturer
      additionalInfo.customsTariff = customsTariff
      additionalInfo.ecoTax = ecoTax
      additionalInfo.exciseTax = exciseTax
      additionalInfo.minStock = minStock
      additionalInfo.maxStock = maxStock
      additionalInfo.description = description
      additionalInfo.declaration = declaration
    }

    let item = new Item(id, name, unit, tax, productType)
    item.additionalInfo = additionalInfo
    item.stock = 0
    for(let storage of this.storageArr){
      if(storage.currentStock < storage.minStock){
        this.tooFewStock = true;
        return
      } 
      if(storage.currentStock > storage.maxStock){
        this.tooMuchStock = true;
        return
      }
      item.stock += storage.currentStock
    }
    item.storage = this.storageArr
    item.category = null
    item.subCategory = null
    item.imageSrc = this.imageSrc


    if(item.additionalInfo){
      if(item.stock < item.additionalInfo.minStock){
        this.tooFewStock = true;
        return
      } 
      if(item.stock > item.additionalInfo.maxStock){
        this.tooMuchStock = true;
        return
      }
    }

    console.log(item)

    this.companyService.addNewProduct(this.company.companyID, item).subscribe((res) => {
      if(res['status'] == -1){
        alert("Doslo je do greske na serveru... Pokusajte ponovo kasnije")
      }
      else if(res['status'] == 1){
        alert("Postoji artikal sa istom sifrom")
      }
      else{
        let company = res['company']
        console.log(company)
        this.company = company
        sessionStorage.setItem('company', JSON.stringify(company))
        this.itemAddedEvent()
        alert("Uspesno dodat nov proizvod")
      }
    })
  }

  resetForm(): void{
    this.tooFewStock = false;
    this.tooMuchStock = false;
    this.isSubmitted = false
    this.makeStorage()
    this.formGroup.reset()
  }

  showForm(): void{
    if(this.toggle == false){
      this.buildForm()
      this.toggle = true
    }
    else{
      this.resetForm()
      this.imageSrc = '../../assets/items/default.png'
      this.toggle = false
    }
  }

  selectPage(page: number){
    this.page = page
  }

}
