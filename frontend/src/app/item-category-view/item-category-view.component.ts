import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ItemSelectDialogComponent } from '../item-select-dialog/item-select-dialog.component';
import { ItemCategory, SubCategory } from '../models/itemCategory';
import { CompanyService } from '../services/company.service';


@Component({
  selector: 'app-item-category-view',
  templateUrl: './item-category-view.component.html',
  styleUrls: ['./item-category-view.component.css']
})
export class ItemCategoryViewComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private companyService: CompanyService,
              private dialog: MatDialog) { }

  @Input('category') category: ItemCategory
  @Input('companyID') companyID: string
  @Output() addedNewSubcategoryEvent: EventEmitter<any> = new EventEmitter()
  @Output() itemAssignedEvent: EventEmitter<any> =  new EventEmitter()
  

  ngOnInit(): void {
  }

  form: FormGroup
  isSubmitted: boolean = false
  addSubCategory: boolean = false

  buildForm(){
    this.form = this.formBuilder.group({
      subCategory: ['', Validators.required]
    })
  }

  addedNewSubcategory(){
    this.addedNewSubcategoryEvent.emit()
  }

  itemAssigned(){
    this.itemAssignedEvent.emit()
  }

  addNewItemSubCategory(){
    this.isSubmitted = true
    if(this.form.invalid){
      console.log('invalid form')
      return
    }

    let subCategoryName = this.form.controls['subCategory'].value

    let subCategory = new SubCategory(subCategoryName)

    this.companyService.addNewItemSubCategory(this.companyID, this.category, subCategory).subscribe((res) => {
      if(res['status'] == -1){
        alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
      }
      else{
        let company = res['company']
        console.log(company)
        sessionStorage.setItem('company', JSON.stringify(company))
        alert('Uspesno dodata nova potkategorija')
        this.addedNewSubcategory()
      }
    })
    this.isSubmitted = false
  }

  toggle(){
    if(this.addSubCategory == false){
      this.buildForm()
      this.addSubCategory = true
    }
    else{
      this.addSubCategory = false;
    }
  }


  assignProductToCategory(){
    const dialogRef = this.dialog.open(ItemSelectDialogComponent, {
      height: '400px',
      width: '600px',
      data: {category: this.category.category, subCategory: null}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result === 'closed') return

      let companyID = this.companyID
      let itemID = result
      let category = this.category.category

      this.companyService.assignCategoryToProduct(companyID, itemID, category).subscribe((res) => {
        if(res['status'] == -1){
          alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
        }
        else{
          this.itemAssigned()
          alert('Uspesno dodeljena kategorija proizvodu')
        }
      })
    });
  }

  assignProductToSubcategory(subCategory: SubCategory){
    const dialogRef = this.dialog.open(ItemSelectDialogComponent, {
      height: '400px',
      width: '600px',
      data: {category: this.category.category, subCategory: subCategory.subCategory}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result === 'closed') return

      let companyID = this.companyID
      let itemID = result
      let category = this.category.category
      let subcategory = subCategory.subCategory

      this.companyService.assignSubCategoryToProduct(companyID, itemID, category, subcategory).subscribe((res) => {
        if(res['status'] == -1){
          alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
        }
        else{
          this.itemAssigned()
          alert('Uspesno dodeljena kategorija proizvodu')
          //event parent
        }
      })
    });
  }

}
