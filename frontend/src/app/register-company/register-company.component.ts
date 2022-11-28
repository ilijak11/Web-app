import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Address } from '../models/address';
import { CompanyRegisterRequest } from '../models/companyRegisterRequest';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private companyService: CompanyService) {
    this.buildForm()
  }

  ngOnInit(): void {
  }

  registerForm: FormGroup;
  passwordPattern: string = '.*'//^([a-zA-z](?=.*\d)(?=.*[A-Z])(?=.*\W).{7,11})$
  emailPattern: string = '[a-zA-Z0-9.]*@[a-zA-Z0-9]*\.[a-z]*'
  pibPattern: string = '[1-9][0-9]{8}'
  isSubmitted: boolean = false;

  buildForm(){
    this.registerForm = this.formBuilder.group({
      picture: ['', Validators.required],
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
      console.log(event.target.files[0].size)
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
  }

  makeCompanyRegisterRequestObject(): CompanyRegisterRequest{
    let companyObj = new CompanyRegisterRequest()
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
    companyObj.imageSrc = this.imageSrc
    return companyObj
  } 

  resetForm(){
    this.isSubmitted = false;
    this.imageSrc = null
    this.registerForm.reset()
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid){
      console.log("invalid form")
      return;
    }
    else{
      this.printData()
      let requestObj = this.makeCompanyRegisterRequestObject()
      this.companyService.makeRegisterRequest(requestObj).subscribe((res) => {
        var status = res['status']
        if(status == -1){
          alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
        }
        else if(status == 1){
          alert('Postoji registrovana firma sa istim Maticnim brojem ili nazivom ili emailom ili korisnickim imenom')
        }
        else{
          alert('Zahtev za registracijom uspresno kreiran')
        }
      })
    }
  }

}
