import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BankAccount } from '../models/bankAccount';
import { CashRegister } from '../models/cashRegister';
import { Company } from '../models/company';
import { StorageUnit } from '../models/storageUnit';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-first-login',
  templateUrl: './company-first-login.component.html',
  styleUrls: ['./company-first-login.component.css']
})
export class CompanyFirstLoginComponent implements OnInit {

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompanyFromSession()
    this.buildForm()
  }

  codes: Array<string> = ['1111','2222','3333', '4444', '5555', '6666', '7777']
  formGroup: FormGroup
  isSubmitted: boolean = false;
  bankAcconts: BankAccount[];
  storageUnits: StorageUnit[];
  cashRegisters: CashRegister[];
  errorCR: boolean = false
  errorSU: boolean = false

  company: Company;

  getCompanyFromSession(){
    this.company = JSON.parse(sessionStorage.getItem('company'))
  }

  buildForm(): void{
    this.formGroup = this.formBuilder.group({
      category: ['', Validators.required], 
      activityCodes: ['', Validators.required],
      PDVsystem: [true, ],
      storageUnitNumber: ['', Validators.required],
      cashRegisterNumber: ['', Validators.required],
      registerBankAccounts: ['']
    })
  }

  resetForm(){
    this.isSubmitted = false;
    this.errorCR = false;
    this.errorSU = false;
    this.formGroup.reset()
    sessionStorage.removeItem('companyBankAccounts')
    sessionStorage.removeItem('storageUnits')
    sessionStorage.removeItem('cashRegisters')
  }

  onSubmit(){
    this.isSubmitted = true;
    this.bankAcconts = JSON.parse(sessionStorage.getItem('companyBankAccounts'))

    this.storageUnits = JSON.parse(sessionStorage.getItem('storageUnits'))
    let lenSU = 0;
    if(this.storageUnits != null){
      lenSU = this.storageUnits.length
    }

    this.cashRegisters = JSON.parse(sessionStorage.getItem('cashRegisters'))
    let lenCR = 0;
    if(this.cashRegisters != null){
      lenCR = this.cashRegisters.length
    }

    this.errorCR = false;
    this.errorSU = false;

    if(lenCR != this.formGroup.controls['cashRegisterNumber'].value){
      this.errorCR = true;
    }
    if(lenSU != this.formGroup.controls['storageUnitNumber'].value){
      this.errorSU = true;
    }
    if(this.formGroup.invalid || this.errorCR || this.errorSU){
      console.log("invalid form")
      return;
    }
    else{

      let register = confirm("Podatci ce biti uneti u bazu")
      if(register == false) return

      sessionStorage.removeItem('companyBankAccounts')
      sessionStorage.removeItem('storageUnits')
      sessionStorage.removeItem('cashRegisters')

      let category = this.formGroup.controls['category'].value
      let activityCodes = this.formGroup.controls['activityCodes'].value
      let PDVsystem = this.formGroup.controls['PDVsystem'].value

      if(this.bankAcconts == null){
        this.bankAcconts = new Array<BankAccount>()
      }
      if(this.storageUnits == null){
        this.storageUnits = new Array<StorageUnit>()
      }
      if(this.cashRegisters == null){
        this.cashRegisters = new Array<CashRegister>()
      }

      this.companyService.firstLoginInfoUpdate(this.company.companyID,
                                                this.company.companyName,
                                                category,
                                                activityCodes,
                                                PDVsystem,
                                                this.bankAcconts,
                                                this.storageUnits,
                                                this.cashRegisters).subscribe((res) => {
        
        if(res['status'] == -1){
          alert('Doslo je do greske na serveru...')
        }
        else{
          alert('Dodatne informacije uspesno zabelezene')
          this.company = res['company']
          console.log(this.company)
          sessionStorage.setItem('company', JSON.stringify(this.company))
          this.router.navigate(['company'])
        }
      })
    }
  }

  logout(): void{
    var logout = confirm('Da li ste sigurni da zelite da se izlogujete?')
    if(logout){
      sessionStorage.removeItem('company')
      sessionStorage.setItem('userType', '-1')
      this.router.navigate([''])
    }
  }

}
