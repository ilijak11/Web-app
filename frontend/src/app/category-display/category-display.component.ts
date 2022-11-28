import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../models/company';
import { Item } from '../models/item';
import { ItemCategory } from '../models/itemCategory';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-category-display',
  templateUrl: './category-display.component.html',
  styleUrls: ['./category-display.component.css']
})
export class CategoryDisplayComponent implements OnInit {

  constructor(private companyService: CompanyService) { }

  @Input('category') category: ItemCategory
  @Input('allItems') allItems: Item[];

  ngOnInit(): void {
    this.filterItems()
  }

  categoryItems: Item[] = null;
  filteredItems: Item[] = null;

  filterItems(){
    this.categoryItems = this.allItems.filter((item) => {
      if(!item.category) return false
      return (item.category === this.category.category) && !item.subCategory
    })

    this.filteredItems = this.allItems.filter((item) => {
      if(!item.category) return false
      return (item.category === this.category.category) && item.subCategory
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
