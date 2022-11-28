import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../models/company';
import { Item } from '../models/item';
import { CompanyService } from '../services/company.service';


@Component({
  selector: 'app-items-and-services',
  templateUrl: './items-and-services.component.html',
  styleUrls: ['./items-and-services.component.css']
})
export class ItemsAndServicesComponent implements OnInit {

  constructor(private companyService: CompanyService) { }

  @Input('company') company: Company
  allItems: Item[];
  showItems: Item[];
  currPage: number = 0;
  numPages: number
  update: boolean = false;
  itemToUpdate: Item = null

  ngOnInit(): void {
    this.getAllItems()
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
        this.numPages = Math.floor(this.allItems.length / 10)
        this.showItems = this.allItems.slice(0, 10)
      }
    })
  }

  next(){
    if((this.currPage + 1) > this.numPages) return
    this.currPage += 1
    this.showItems = this.allItems.slice(this.currPage*10, (this.currPage+1)*10)
  }

  prev(){
    if((this.currPage - 1) < 0) return
    this.currPage -= 1
    this.showItems = this.allItems.slice(this.currPage*10, (this.currPage+1)*10)
  }

  printManufacturer(item: Item): string{
    if(item.additionalInfo){
      if(item.additionalInfo.manufacturer){
        return item.additionalInfo.manufacturer
      }
    }
    
    return 'Nije unet'
  }

  newItemAdded(event: any){
    this.getAllItems()
  }

  deleteItem(item: Item){

    let ok = confirm(`Da li ste sigurni da zelite da izbrisete artikal ${item.name}?`)
    if(!ok) return

    this.companyService.deleteItem(this.company.companyID, item).subscribe((res) => {
      if(res['status'] == -1){
        alert("Doslo je do greske na serveru... Pokusajte ponovo kasnije")
      }
      else{
        this.allItems = res['items']
        this.numPages = Math.floor(this.allItems.length / 10)
        this.showItems = this.allItems.slice(this.currPage*10, (this.currPage+1)*10)
        console.log(this.allItems)
        alert("Uspesno izbrisan proizvod")
      }
    })
  }

  updateItem(item: Item){
    this.itemToUpdate = item
    console.log(item)
    this.update = true
  }

  cancelUpdate(event: any){
    this.itemToUpdate = null
    this.update = false
  }

  itemUpdated(event: any){
    this.itemToUpdate = null
    this.update = false
    this.ngOnInit()
  }

}
