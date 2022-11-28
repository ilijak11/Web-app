import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccount } from '../models/bankAccount';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-view-bank-accounts',
  templateUrl: './company-view-bank-accounts.component.html',
  styleUrls: ['./company-view-bank-accounts.component.css']
})
export class CompanyViewBankAccountsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private companyService: CompanyService) { }

  ngOnInit(): void {
    this.buildForm()
  }

  @Input('company') company: Company
  banks: Array<string> = ['Komercijalna Banka', 'Raiffeisen Banka', 'Unicredit Banka', 'OTP Banka', 'Erste Banka', 'Banca Intesa', 'Banka Postanska Stedionica', 'Euro Banka', 'Halk Banka']
  bankAccountForm: FormGroup
  isSubmittedBankAcc: boolean
  accountNumberPattern: string = "[0-9]{3}-[0-9]{12}-[0-9]{2}"

  buildForm(): void{
    this.bankAccountForm = this.formBuilder.group({
      accountNumber: ['', [Validators.required, Validators.pattern(this.accountNumberPattern)]],
      bank: ['', [Validators.required]]
    })
  }

  deleteAccount(account){

    let ok = confirm(`Da li ste sigurni da zelite da izbrisete ziro racun ${account.accountNumber}?`)
    if(!ok) return

    this.companyService.deleteAccount(this.company.companyID, account).subscribe((res) => {
      if(res['status'] == -1){
        alert("Doslo je do greske na serveru... Pokusajte ponovo kasnije")
      }
      else{
        let company = res['company']
        console.log(company)
        this.company = company
        sessionStorage.setItem('company', JSON.stringify(company))
        alert("Uspesno obrisan ziro racun")
      }
    })
  }

  registerNewBankAccount(){
    this.isSubmittedBankAcc = true;
    if(this.bankAccountForm.invalid){
      console.log('invalid form')
      return
    }

    let ok = confirm("Da li ste sigurni da zelite da dodate novi ziro racun?")
    if(!ok) return

    let bankAccont = new BankAccount(this.bankAccountForm.controls['accountNumber'].value, this.bankAccountForm.controls['bank'].value)

    this.companyService.registerNewBankAccount(this.company.companyID, bankAccont).subscribe((res) => {
      if(res['status'] == -1){
        alert("Doslo je do greske na serveru... Pokusajte ponovo kasnije")
      }
      else{
        let company = res['company']
        console.log(company)
        this.company = company
        sessionStorage.setItem('company', JSON.stringify(company))
        alert("Uspesno dodat nov ziro racun")
      }
    })

    this.isSubmittedBankAcc = false;
  }

}
