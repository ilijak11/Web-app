import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Address } from '../models/address';
import { BankAccount } from '../models/bankAccount';
import { CashRegister } from '../models/cashRegister';
import { Company } from '../models/company';
import { StorageUnit } from '../models/storageUnit';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-register-company-admin',
  templateUrl: './register-company-admin.component.html',
  styleUrls: ['./register-company-admin.component.css']
})
export class RegisterCompanyAdminComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.buildForm()
  }

  codes: Array<string> = ['1111','2222','3333', '4444', '5555', '6666', '7777']

  registerForm: FormGroup;
  passwordPattern: string = '.*'//^([a-zA-z](?=.*\d)(?=.*[A-Z])(?=.*\W).{7,11})$
  emailPattern: string = '[a-zA-Z0-9.]*@[a-zA-Z0-9]*\.[a-z]*' //[a-zA-Z0-9.]*@[a-zA-Z0-9]*\.[a-z]*
  pibPattern: string = '[1-9][0-9]{8}'
  isSubmitted: boolean = false;
  bankAcconts: BankAccount[];
  storageUnits: StorageUnit[];
  cashRegisters: CashRegister[];
  errorCR: boolean = false
  errorSU: boolean = false

  buildForm(){
    /*
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      passwordRepeat: ['', [Validators.required]],
      phone: ['+', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      companyName: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      pib: ['', [Validators.required, Validators.pattern(this.pibPattern)]],
      companyID: ['', Validators.required],
      category: ['', Validators.required], 
      activityCodes: ['', Validators.required],
      PDVsystem: [true],
      storageUnitNumber: ['', Validators.required],
      cashRegisterNumber: ['', Validators.required]
    });
    this.registerForm.controls['passwordRepeat'].addValidators(this.MatchingPassValidator())
    */
    this.registerForm = this.formBuilder.group({
      picture: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      passwordRepeat: ['', [Validators.required]],
      phone: ['+', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      companyName: ['',Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required ],
      postCode: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['',Validators.required ],
      pib: ['', [Validators.required, Validators.pattern(this.pibPattern)]],
      companyID: ['', Validators.required],
      category: ['', Validators.required], 
      activityCodes: ['', Validators.required],
      PDVsystem: [true, ],
      storageUnitNumber: ['', Validators.required],
      cashRegisterNumber: ['', Validators.required],
      registerBankAccounts: ['']
    });
    this.registerForm.controls['passwordRepeat'].addValidators(this.MatchingPassValidator())
  }

  MatchingPassValidator(): ValidatorFn{
    return (confirmPass: AbstractControl): ValidationErrors | null => {
      let pass: string = this.registerForm.controls['password'].value
      let repeat: string = confirmPass.value
      if(repeat !== pass){
        return {noMatch: true}
      }
      return null;
    }
  }

  imageSrc: any

  onFileChange(event: any){
    if(event.target.files.length > 0){
      if(event.target.files[0].type !== 'image/jpeg' && event.target.files[0].type !== 'image/jpg' && event.target.files[0].type !== 'image/png'){
        alert('Fajl mora biti u JPG/PNG formatu')
        this.registerForm.controls['picture'].setValue("")
        return
      }
      const picture = event.target.files[0]
      const reader = new FileReader();
      reader.onload = (e) => {
        var img = new Image()
        img.src = <string>e.target.result
        img.onload = () => {
          console.log(img.width)
          console.log(img.height)
          if(img.height < 100 || img.width < 100 || img.width > 300 || img.height > 300){
            alert('Fajl mora biti izmedju 100x100 ili 300x300 px')
            this.registerForm.controls['picture'].setValue("")
            return
          }
          else{
            this.imageSrc = reader.result
          }
        }
      }
      reader.readAsDataURL(picture)
    }
  }

  printData(){
    console.log(this.registerForm.controls['firstname'].value)
    console.log(this.registerForm.controls['lastname'].value)
    console.log(this.registerForm.controls['username'].value)
    console.log(this.registerForm.controls['email'].value)
    console.log(this.registerForm.controls['password'].value)
    console.log(this.registerForm.controls['companyName'].value)
    console.log(this.registerForm.controls['country'].value)
    console.log(this.registerForm.controls['postCode'].value)
    console.log(this.registerForm.controls['street'].value)
    console.log(this.registerForm.controls['streetNumber'].value)
    console.log(this.registerForm.controls['pib'].value)
    console.log(this.registerForm.controls['companyID'].value)
    console.log(this.registerForm.controls['category'].value)
    console.log(this.registerForm.controls['activityCodes'].value)
    console.log(this.registerForm.controls['PDVsystem'].value)
    console.log(this.bankAcconts)
    console.log(this.storageUnits)
    console.log(this.cashRegisters)
  }

  makeCompanyObject(): Company{
    let companyObj = new Company()
    companyObj.firstLogin = false;
    companyObj.firstname = this.registerForm.controls['firstname'].value
    companyObj.lastname = this.registerForm.controls['lastname'].value
    companyObj.username = this.registerForm.controls['username'].value
    companyObj.email = this.registerForm.controls['email'].value
    companyObj.phone = this.registerForm.controls['phone'].value
    companyObj.password = this.registerForm.controls['password'].value
    companyObj.companyName = this.registerForm.controls['companyName'].value
    let address = new Address(
      this.registerForm.controls['country'].value,
      this.registerForm.controls['city'].value,
      this.registerForm.controls['postCode'].value,
      this.registerForm.controls['street'].value,
      this.registerForm.controls['streetNumber'].value
    )
    companyObj.address = address
    companyObj.pib = this.registerForm.controls['pib'].value
    companyObj.companyID = this.registerForm.controls['companyID'].value
    companyObj.category = this.registerForm.controls['category'].value
    companyObj.activityCodes = this.registerForm.controls['activityCodes'].value
    companyObj.PDVsystem = this.registerForm.controls['PDVsystem'].value
    companyObj.bankAccounts = this.bankAcconts
    companyObj.storageUnits = this.storageUnits
    companyObj.cashRegisters = this.cashRegisters
    companyObj.imageSrc = this.imageSrc
    return companyObj
  } 

  resetForm(){
    this.imageSrc = null
    this.isSubmitted = false;
    this.errorCR = false;
    this.errorSU = false;
    this.registerForm.reset()
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

    if(lenCR < this.registerForm.controls['cashRegisterNumber'].value){
      this.errorCR = true;
    }
    if(lenSU < this.registerForm.controls['storageUnitNumber'].value){
      this.errorSU = true;
    }
    if(this.registerForm.invalid || this.errorCR || this.errorSU){
      console.log("invalid form")
      return;
    }
    else{

      let register = confirm("Da li ste sigurni da zelite da registrujete preduzece?")
      if(register == false) return

      sessionStorage.removeItem('companyBankAccounts')
      sessionStorage.removeItem('storageUnits')
      sessionStorage.removeItem('cashRegisters')

      if(this.bankAcconts == null){
        this.bankAcconts = new Array<BankAccount>()
      }
      if(this.storageUnits == null){
        this.storageUnits = new Array<StorageUnit>()
      }
      if(this.cashRegisters == null){
        this.cashRegisters = new Array<CashRegister>()
      }

      let company = this.makeCompanyObject()

      console.log(company)
      
      this.adminService.registerNewCompany(company).subscribe((res) => {
        if(res['status'] == -1){
          alert('Doslo je do greske na serveru...')
        }
        else if(res['status'] == 1){
          alert('Postoji registrovano preduzece sa istim Maticnim brojem ili nazivom ili emailom ili korisnickim imenom!')
        }
        else{
          alert('Preduzece uspesno registrovano')
        }
      })
    }
  }

}
