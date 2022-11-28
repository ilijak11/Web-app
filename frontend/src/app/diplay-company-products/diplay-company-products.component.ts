import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CompanyProduct } from '../models/companyProducts';
import { Item } from '../models/item';

@Component({
  selector: 'app-diplay-company-products',
  templateUrl: './diplay-company-products.component.html',
  styleUrls: ['./diplay-company-products.component.css']
})
export class DiplayCompanyProductsComponent implements OnInit, OnChanges {

  constructor() { }
  @Input('companyProducts') companyProducts: CompanyProduct
  @Input('searchParam') searchParam: string

  showInfo: boolean = false
  showItems: Item[]

  ngOnInit(): void {
    this.showItems = this.companyProducts.items
  }

  filterItems(){
    if(this.searchParam === ''){
      this.showItems = this.companyProducts.items
      return
    }
    let regex = new RegExp(this.searchParam)
    this.showItems = this.companyProducts.items.filter((item) => {
      if(regex.test(item.name)) return true
      else{
        if(item.additionalInfo){
          if(item.additionalInfo.manufacturer){
            return regex.test(item.additionalInfo.manufacturer)
          }
        }
        return false
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterItems()
  }

  printManufacturer(item: Item): string{
    if(item.additionalInfo){
      if(item.additionalInfo.manufacturer){
        return item.additionalInfo.manufacturer
      }
    }
    
    return 'Nije unet'
  }

  printCategory(): string{
    if(this.companyProducts.category == 0) return 'Prodavnica'
    else return 'Ugostiteljski obj.'
  }

  toggleInfo(){
    this.showInfo = !this.showInfo
  }

  getMinPrice(item: Item): number{
    if(item.storage){
      let minRetail = item.storage[0].retailPrice
      for(let storage of item.storage){
        if(minRetail > storage.retailPrice){
          minRetail = storage.retailPrice
        }
      }
      return minRetail
    }
    else return 0;
  }
}
