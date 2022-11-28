import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ItemCategory, SubCategory } from '../models/itemCategory';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-sub-category-display',
  templateUrl: './sub-category-display.component.html',
  styleUrls: ['./sub-category-display.component.css']
})
export class SubCategoryDisplayComponent implements OnInit {

  constructor(private companyService: CompanyService) { }

  @Input('subCategory') subCategory: SubCategory
  @Input('categoryItems') categoryItems: Item[];

  ngOnInit(): void {
    console.log(this.categoryItems)
    this.filterItems()
  }

  subCategoryItems: Item[]

  filterItems(){
    this.subCategoryItems = this.categoryItems.filter((item) => {
      if(!item.subCategory) return false
      return item.subCategory == this.subCategory.subCategory
    })
  }

  printManufacturer(item: Item): string{
    if(item.additionalInfo){
      if(item.additionalInfo.manufacturer){
        return item.additionalInfo.manufacturer
      }
    }
    
    return 'Nije unet'
  }

}
