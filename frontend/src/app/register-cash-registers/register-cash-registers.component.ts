import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../models/address';
import { CashRegister } from '../models/cashRegister';

@Component({
  selector: 'app-register-cash-registers',
  templateUrl: './register-cash-registers.component.html',
  styleUrls: ['./register-cash-registers.component.css']
})
export class RegisterCashRegistersComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getStyle()
    this.buildForm()
  }

  cashRegisterTypes: number[] = [1,2,3]

  @Input('cashRegisterNumber') cashRegisterNumber: number
  formGroup: FormGroup
  isSubmitted: boolean
  cashRegisters: CashRegister[] = new Array<CashRegister>()
  number: number = 0
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
      country: ['Srbija', [Validators.required]],
      city: ['', [Validators.required]],
      postCode: ['', [Validators.required]],
      street: ['', [Validators.required]],
      streetNum: ['', [Validators.required]],
      type: ['', [Validators.required]],
      storeName: ['', [Validators.required]]
    })
  }

  onSubmit(): void{
    this.isSubmitted = true;
    if(this.formGroup.invalid) return
    this.number += 1
    if(this.number > this.cashRegisterNumber){
      this.number -= 1
      return
    }

    let type = this.formGroup.controls['type'].value
    let storeName = this.formGroup.controls['storeName'].value
    let country = this.formGroup.controls['country'].value
    let city = this.formGroup.controls['city'].value
    let postC = this.formGroup.controls['postCode'].value
    let street = this.formGroup.controls['street'].value
    let streetNum = this.formGroup.controls['streetNum'].value

    let address = new Address(country, city, postC, street, streetNum)
    this.cashRegisters.push(new CashRegister(this.number, type, storeName,  address))
    sessionStorage.setItem('cashRegisters', JSON.stringify(this.cashRegisters))
    this.isSubmitted = false;
    this.formGroup.reset()
  }

  deleteCashRegister(cashRegister: CashRegister){
    var ind = this.cashRegisters.indexOf(cashRegister)
    this.cashRegisters.splice(ind, 1)
    sessionStorage.setItem('cashRegisters', JSON.stringify(this.cashRegisters))
    this.number -= 1
  }


}
