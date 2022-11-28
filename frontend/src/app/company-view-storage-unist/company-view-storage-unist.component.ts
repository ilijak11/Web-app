import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../models/company';
import { StorageUnit } from '../models/storageUnit';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-view-storage-unist',
  templateUrl: './company-view-storage-unist.component.html',
  styleUrls: ['./company-view-storage-unist.component.css']
})
export class CompanyViewStorageUnistComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private companyService: CompanyService) { }

  @Input('company') company: Company
  formGroup: FormGroup
  isSubmitted: boolean = false


  ngOnInit(): void {
    this.buildForm()
  }

  buildForm(): void{
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  deleteStorageUnit(unit: StorageUnit){
    let companyID = this.company.companyID;

    let ok = confirm(`Da li ste sigurni da zelite da izbrisete magacin ${unit.name}?`)
    if(!ok) return

    this.companyService.deleteStorageUnit(companyID, unit).subscribe((res) => {
      if(res['status'] == -1){
        alert("Doslo je do greske na serveru... Pokusajte ponovo kasnije")
      }
      else{
        let company = res['company']
        console.log(company)
        this.company = company
        sessionStorage.setItem('company', JSON.stringify(company))
        alert("Uspesno izbrisan magacin")
      }
    })

  }

  getID(): number{
    let id = 0
    for(let unit of this.company.storageUnits){
      if(id + 1 < unit.id) break
      id = unit.id
    }
    return id+1
  }

  registerNewStorageUnit(){
    this.isSubmitted = true;
    if(this.formGroup.invalid){
      console.log('invalid form')
      return
    }

    let ok = confirm("Da li ste sigurni da zelite da dodate novi magacin?")
    if(!ok) return

    let unit = new StorageUnit(this.getID(), this.formGroup.controls['name'].value)

    this.companyService.registerNewStorageUnit(this.company.companyID, unit).subscribe((res) => {
      if(res['status'] == -1){
        alert("Doslo je do greske na serveru... Pokusajte ponovo kasnije")
      }
      else{
        let company = res['company']
        console.log(company)
        this.company = company
        sessionStorage.setItem('company', JSON.stringify(company))
        alert("Uspesno dodat novi magacin")
      }
    })
    this.isSubmitted = false;
  }

}
