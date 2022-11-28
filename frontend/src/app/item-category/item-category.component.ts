import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../models/company';
import { Item } from '../models/item';
import { ItemCategory } from '../models/itemCategory';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.css']
})
export class ItemCategoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private companyService: CompanyService) { }

  @Input('company') company: Company

  form: FormGroup
  isSubmitted: boolean = false
  allItems: Item[]

  ngOnInit(): void {
    this.getAllItems()
    this.buildForm()
  }

  buildForm(){
    this.form = this.formBuilder.group({
      category: ['', Validators.required]
    })
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

  addNewItemCategory(){
    this.isSubmitted = true
    if(this.form.invalid){
      console.log('invalid form')
      return
    }

    let categoryName = this.form.controls['category'].value

    let category = new ItemCategory(categoryName)

    this.companyService.addNewItemCategory(this.company.companyID, category).subscribe((res) => {
      if(res['status'] == -1){
        alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
      }
      else{
        let company = res['company']
        alert('Nova kategorija uspesno dodata')
        console.log(company)
        this.company = company
        sessionStorage.setItem('company', JSON.stringify(this.company))
      }
    })
    this.isSubmitted = false
  }

  addedNewSubcategory(event: any){
    this.company = JSON.parse(sessionStorage.getItem('company'))
  }

  itemAssigned(event: any){
    this.allItems = null
    this.ngOnInit()
  }

}
