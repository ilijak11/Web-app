import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccount } from '../models/bankAccount';

@Component({
  selector: 'app-register-bank-accounts',
  templateUrl: './register-bank-accounts.component.html',
  styleUrls: ['./register-bank-accounts.component.css']
})
export class RegisterBankAccountsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getStyle()
    this.buildForm()
  }

  banks: Array<string> = ['Komercijalna Banka', 'Raiffeisen Banka', 'Unicredit Banka', 'OTP Banka', 'Erste Banka', 'Banca Intesa', 'Banka Postanska Stedionica', 'Euro Banka', 'Halk Banka']

  formGroup: FormGroup
  accountNumberPattern: string = "[0-9]{3}-[0-9]{12}-[0-9]{2}"
  accounts: BankAccount[] = new Array<BankAccount>()
  isSubmitted: boolean
  style: string

  getStyle(){
    var type = parseInt(sessionStorage.getItem('userType'))
    if(type == 0 || type == 1){
      this.style = 'background-color: cadetblue'
    }
    else{
      this.style = 'background-color: salmon'
    }
  }

  buildForm(): void{
    this.formGroup = this.formBuilder.group({
      accountNumber: ['', [Validators.required, Validators.pattern(this.accountNumberPattern)]],
      bank: ['', [Validators.required]]
    })
  }

  onSubmit(): void{
    this.isSubmitted = true;
    if(this.formGroup.invalid) return;

    let accNum = this.formGroup.controls['accountNumber'].value
    let bank = this.formGroup.controls['bank'].value

    let newAccount = new BankAccount(accNum, bank)
    this.accounts.push(newAccount)

    sessionStorage.setItem('companyBankAccounts', JSON.stringify(this.accounts))

    this.isSubmitted = false;
    this.formGroup.reset()
  }

  deleteAccount(acc: BankAccount){
    var ind = this.accounts.indexOf(acc)
    this.accounts.splice(ind, 1)
    sessionStorage.setItem('companyBankAccounts', JSON.stringify(this.accounts))
  }

}
