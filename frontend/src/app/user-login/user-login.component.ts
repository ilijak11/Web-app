import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { User } from '../models/user';
import { CompanyService } from '../services/company.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private companyService: CompanyService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  isSubmitted: boolean;
  loginForm: FormGroup;
  message: string;
  loginError: boolean;
  loginErrorStyle: string;

  buildForm(): void{
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      type: ['', Validators.required]
    })
  }

  printData(){
    console.log(this.loginForm.controls['username'].value)
    console.log(this.loginForm.controls['password'].value)
    console.log(this.loginForm.controls['type'].value)
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }

    let username = this.loginForm.controls['username'].value
    let password = this.loginForm.controls['password'].value
    let type = parseInt(this.loginForm.controls['type'].value)
    
    switch(type){
      case 0:{
        //user
        this.userService.login(username, password).subscribe((res) => {
          var status = res['status']
          if(status == -1){
            alert('Doslo je do greske na serveru... Probajte ponovo kasnije')
          }
          else if(status == 1){
            this.loginError = true
            this.loginErrorStyle = 'border: 5px solid red'
            this.message = 'Pogresno korisnicko ime ili lozinka'
            setTimeout(()=>{
              this.loginError = false
              this.loginErrorStyle = ''
              this.message = ''
            }, 2000)
          }
          else{
            let sessionUser: User = res['user'];
            sessionStorage.setItem('user', JSON.stringify(sessionUser))
            sessionStorage.setItem('userType', '0')
            this.router.navigate(['/user'])
          }
        })
        break;
      }
      case 1:{
        //company
        this.companyService.login(username, password).subscribe((res) => {
          var status = res['status']
          if(status == -1){
            alert('Doslo je do greske na serveru... Probajte ponovo kasnije')
          }
          else if(status == 1){
            this.loginError = true
            this.loginErrorStyle = 'border: 5px solid red'
            this.message = 'Pogresno korisnicko ime ili lozinka'
            setTimeout(()=>{
              this.loginError = false
              this.loginErrorStyle = ''
              this.message = ''
            }, 2000)
          }
          else if(status == 2){
            alert("Vase preduzece je deaktivirano")
          }
          else{
            let sessionCompany: Company = res['company']
            sessionStorage.setItem('company', JSON.stringify(sessionCompany))
            sessionStorage.setItem('userType', '1')
            if(sessionCompany.firstLogin) this.router.navigate(['/company/company-first-login'])
            else this.router.navigate(['/company'])
          }
        })
      }
    }
  }

}
