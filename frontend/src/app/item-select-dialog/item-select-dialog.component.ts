import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from '../models/company';
import { Item } from '../models/item';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-item-select-dialog',
  templateUrl: './item-select-dialog.component.html',
  styleUrls: ['./item-select-dialog.component.css']
})
export class ItemSelectDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ItemSelectDialogComponent>,
              private companyService: CompanyService,
              @Inject(MAT_DIALOG_DATA) private data: {category: string, subCategory: string}) { }

  ngOnInit(): void {
    this.getAllItems()
  }

  allItems: Item[]
  showItems: Item[];
  searchParam: string = ''
  company: Company

  getAllItems(){
    this.company = JSON.parse(sessionStorage.getItem('company'))
    this.companyService.getAllItems(this.company.companyID).subscribe((res) => {
      if(res['status'] == -1){
        alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
      }
      else if(res['status'] == 1){
        alert('Pogresan maticni broj firme')
      }
      else{
        this.allItems = res['items']
        this.showItems = this.allItems
        console.log(this.allItems)
      }
    })
  }

  search(){
    if(this.searchParam === ''){
      this.showItems = this.allItems
    }
    else{
      let regex = new RegExp(this.searchParam)
      this.showItems = this.allItems.filter((item) => {
        return regex.test(item.name)
      })
      this.searchParam = ''
    }
  }

  selectItem(item: Item){
    console.log(this.data.category)
    console.log(this.data.subCategory)

    if(item.category != null){
      if(item.category !== this.data.category){
        alert("Proizvodu je vec dodeljena kategorija")
        return
      }
    }
    console.log(item.id)
    this.dialogRef.close(item.id)
  }


  closeDialog(){
    this.dialogRef.close('closed');
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
