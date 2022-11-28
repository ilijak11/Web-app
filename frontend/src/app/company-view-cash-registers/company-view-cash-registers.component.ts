import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../models/address';
import { CashRegister } from '../models/cashRegister';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-view-cash-registers',
  templateUrl: './company-view-cash-registers.component.html',
  styleUrls: ['./company-view-cash-registers.component.css']
})
export class CompanyViewCashRegistersComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private companyService: CompanyService) { }

  @Input('company') company: Company
  formGroup: FormGroup
  cashRegisterTypes: number[] = [1,2,3]
  isSubmitted: boolean


  ngOnInit(): void {
    this.buildForm()
  }


  buildForm(): void{
    this.formGroup = this.formBuilder.group({
      country: ['Srbija', [Validators.required]],
      city: ['', [Validators.required]],
      postCode: ['', [Validators.required]],
      street: ['', [Validators.required]],
      streetNum: ['', [Validators.required]],
      type: ['', [Validators.required]],
      storeName: ['', [Validators.required]]
    })
  }

  getID(): number{
    let id = 0
    for(let register of this.company.cashRegisters){
      if(id + 1 < register.id) break
      id = register.id
    }
    return id+1
  }

  registerNewCashRegister(){
    this.isSubmitted = true
    if(this.formGroup.invalid){
      console.log('invalid form')
      return
    }

    let ok = confirm("Da li ste sigurni da zelite da dodate novu fiskalnu kasu?")
    if(!ok) return

    let type = this.formGroup.controls['type'].value
    let storeName = this.formGroup.controls['storeName'].value
    let country = this.formGroup.controls['country'].value
    let city = this.formGroup.controls['city'].value
    let postC = this.formGroup.controls['postCode'].value
    let street = this.formGroup.controls['street'].value
    let streetNum = this.formGroup.controls['streetNum'].value

    let address = new Address(country, city, postC, street, streetNum)
    let register = new CashRegister(this.getID(), type, storeName, address)

    this.companyService.registerNewCashRegister(this.company.companyID, register).subscribe((res) => {
      if(res['status'] == -1){
        alert("Doslo je do greske na serveru... Pokusajte ponovo kasnije")
      }
      else{
        let company = res['company']
        console.log(company)
        this.company = company
        sessionStorage.setItem('company', JSON.stringify(company))
        alert("Uspesno dodata nova fiskalna kasa")
      }
    })

    this.isSubmitted = false;

  }

  deleteCashRegister(register: CashRegister){
    let companyID = this.company.companyID;

    let ok = confirm(`Da li ste sigurni da zelite da izbrisete fiskalu kasu?`)
    if(!ok) return

    this.companyService.deleteCashRegister(companyID, register).subscribe((res) => {
      if(res['status'] == -1){
        alert("Doslo je do greske na serveru... Pokusajte ponovo kasnije")
      }
      else{
        let company = res['company']
        console.log(company)
        this.company = company
        sessionStorage.setItem('company', JSON.stringify(company))
        alert("Uspesno izbrisana fiskalna kasa")
      }
    })
  }
}
