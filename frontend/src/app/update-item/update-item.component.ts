import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../models/company';
import { Item, ItemAdditionalInformation, ItemStorageDescriptor } from '../models/item';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private companyService: CompanyService) { }

  @Input('company') company: Company
  @Input('item') item: Item
  @Output() updatedEvent: EventEmitter<any> = new EventEmitter()
  @Output() cancelUpdateEvent: EventEmitter<any> = new EventEmitter()
  ngOnInit(): void {
    this.buildForm()
    this.makeStorage()
  }


  cancelUpdate(){
    this.cancelUpdateEvent.emit()
  }

  updated(){
    this.updatedEvent.emit()
  }

  units: string[] = ['paket', 'litar', 'kilogram','tona', 'paleta', 'komad', 'porcija']

  formGroup: FormGroup
  page: number = 1
  toggle: boolean = false
  isSubmitted: boolean = false
  tooMuchStock: boolean = false
  tooFewStock: boolean = false
  storageArr: ItemStorageDescriptor[]

  imageSrc: any;

  buildForm(): void{
    this.formGroup = this.formBuilder.group({
      picture: [''],
      id: [this.item.id, [Validators.required]],
      name: [this.item.name, [Validators.required]],
      unit: [this.item.unit, [Validators.required]],
      tax: [this.item.tax, [Validators.required]],
      productType: [this.item.productType, [Validators.required]],
      originCountry: [this.getOriginCountry()],
      foreignName: [this.getForeignName()],
      barcode: [this.getBarcode()],
      manufacturer: [this.getManufacturer()],
      customsTariff: [this.getCustomsTariff()],
      ecoTax: [this.getEcoTax()],
      exciseTax: [this.getExciseTax()],
      minStock: [this.getMinStock()],
      maxStock: [this.getMaxStock()],
      description: [this.getDescription()],
      declaration: [this.getDeclaration()],
    })
    this.imageSrc = this.item.imageSrc
  }

  getOriginCountry(): string{
    if(this.item.additionalInfo){
      if(this.item.additionalInfo.originCountry) return this.item.additionalInfo.originCountry
    }
    return null
  }

  getForeignName(): string{
    if(this.item.additionalInfo){
      if(this.item.additionalInfo.foreignName) return this.item.additionalInfo.foreignName
    }
    return null
  }

  getBarcode(): number{
    if(this.item.additionalInfo){
      if(this.item.additionalInfo.barcode) return this.item.additionalInfo.barcode
    }
    return null
  }

  getManufacturer(): string{
    if(this.item.additionalInfo){
      if(this.item.additionalInfo.manufacturer) return this.item.additionalInfo.manufacturer
    }
    return null
  }

  getCustomsTariff(): number{
    if(this.item.additionalInfo){
      if(this.item.additionalInfo.customsTariff) return this.item.additionalInfo.customsTariff
    }
    return null
  }

  getEcoTax(): boolean{
    if(this.item.additionalInfo){
      if(this.item.additionalInfo.ecoTax) return this.item.additionalInfo.ecoTax
    }
    return null
  }

  getExciseTax(): boolean{
    if(this.item.additionalInfo){
      if(this.item.additionalInfo.exciseTax) return this.item.additionalInfo.exciseTax
    }
    return null
  }

  getMinStock(): number{
    if(this.item.additionalInfo){
      if(this.item.additionalInfo.minStock) return this.item.additionalInfo.minStock
    }
    return null
  }

  getMaxStock(): number{
    if(this.item.additionalInfo){
      if(this.item.additionalInfo.maxStock) return this.item.additionalInfo.maxStock
    }
    return null
  }

  getDescription(): string{
    if(this.item.additionalInfo){
      if(this.item.additionalInfo.description) return this.item.additionalInfo.description
    }
    return null
  }

  getDeclaration(): string{
    if(this.item.additionalInfo){
      if(this.item.additionalInfo.declaration) return this.item.additionalInfo.declaration
    }
    return null
  }

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
          }
        }
      }
      reader.readAsDataURL(picture)
    }
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
    this.storageArr = this.item.storage
    //delete removed storage
    let removeInd = new Array<number>()
    for(let storage of this.storageArr){
      if(storage.storageType == 1){
        let found = this.company.cashRegisters.find((reg) => {
          return storage.id == reg.id && storage.name === reg.storeName
        })
        if(found == undefined){
          removeInd.push(this.storageArr.indexOf(storage))
        }
      }
      else{
        let found = this.company.storageUnits.find((reg) => {
          return storage.id == reg.id && storage.name === reg.name
        })
        if(found == undefined){
          removeInd.push(this.storageArr.indexOf(storage))
        }
      }
    }
    for(let ind of removeInd){
      this.storageArr.splice(ind, 1)
    }

    //add new storage
    for(let obj of this.company.cashRegisters){
      let found = this.storageArr.find((elem) => {
        return elem.id == obj.id && elem.name === obj.storeName
      })
      if(found == undefined){
        let storage = new ItemStorageDescriptor()
        storage.id = obj.id
        storage.storageType = 1
        storage.name = obj.storeName
        storage.purchasePrice = 0
        storage.retailPrice = 0
        storage.currentStock = 0
        storage.maxStock = 0
        storage.minStock = 0 
        this.storageArr.push(storage)
      }
    }
    for(let obj of this.company.storageUnits){
      let found = this.storageArr.find((elem) => {
        return elem.id == obj.id && elem.name === obj.name
      })
      if(found == undefined){
        let storage = new ItemStorageDescriptor()
        storage.id = obj.id
        storage.storageType = 0
        storage.name = obj.name
        storage.purchasePrice = 0
        storage.retailPrice = 0
        storage.currentStock = 0
        storage.maxStock = 0
        storage.minStock = 0 
        this.storageArr.push(storage)
      }
    }
  }

  storageType(storage: ItemStorageDescriptor): string{
    if(storage.storageType == 0) return 'Magacin'
    else return 'Objekat'
  }

  onSubmit(): void{
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

    let updatedItem = new Item(id, name, unit, tax, productType)
    updatedItem.additionalInfo = additionalInfo
    updatedItem.stock = 0
    for(let storage of this.storageArr){
      if(storage.currentStock < storage.minStock){
        this.tooFewStock = true;
        return
      } 
      if(storage.currentStock > storage.maxStock){
        this.tooMuchStock = true;
        return
      }
      updatedItem.stock += storage.currentStock
    }
    updatedItem.storage = this.storageArr
    updatedItem.category = this.item.category
    updatedItem.subCategory = this.item.subCategory
    updatedItem.imageSrc = this.imageSrc

    if(updatedItem.additionalInfo){
      if(updatedItem.stock < updatedItem.additionalInfo.minStock){
        this.tooFewStock = true;
        return
      } 
      if(updatedItem.stock > updatedItem.additionalInfo.maxStock){
        this.tooMuchStock = true;
        return
      }
    }

    this.companyService.updateItem(this.company.companyID, updatedItem, this.item).subscribe((res) => {
      if(res['status'] == -1){
        alert("Doslo je do greske na serveru... Pokusajte ponovo kasnije")
      }
      else if(res['status'] == 1){
        alert("Postoji artikal sa istom sifrom")
      }
      else{
        alert("Uspesno sacuvane izmene")
        this.updated()
      }
    })
  }

  selectPage(page: number){
    this.page = page
  }
}
