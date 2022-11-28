import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { CompanyService } from '../services/company.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private adminService: AdminService,
              private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getUser()
    this.buildForm()
  }

  userType: number;
  user: any;
  class: string;
  changePasswordForm: FormGroup;
  isSubmitted: boolean = false;
  passwordPattern: string = '.*'
  message: string;
  error: boolean;
  errorStyle: string;

  getUser(): void{
    this.userType = parseInt(sessionStorage.getItem('userType'))
    switch(this.userType){
      case 0:{
        this.user = JSON.parse(sessionStorage.getItem('user'))
        this.class = 'change-password-user'
        break;
      }
      case 1:{
        this.user = JSON.parse(sessionStorage.getItem('company'))
        this.class = 'change-password-user'
        break;
      }
      case 2:{
        this.user = JSON.parse(sessionStorage.getItem('admin'))
        this.class = 'change-password-admin'
        break;
      }
      default:{
        this.class = 'no-class'
        break;
      }
    }
  }

  buildForm(): void{
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      newPasswordRepeat: ['', [Validators.required]],
    })
    this.changePasswordForm.controls['newPasswordRepeat'].addValidators(this.MatchingPassValidator())
  }

  MatchingPassValidator(): ValidatorFn{
    return (repeatPass: AbstractControl): ValidationErrors | null => {
      let pass: string = this.changePasswordForm.controls['newPassword'].value
      let repeat: string = repeatPass.value
      if(repeat !== pass){
        return {noMatch: true}
      }
      return null;
    }
  }

  onSubmit(): void{
    this.isSubmitted = true;
    if(this.changePasswordForm.invalid){
      console.log('form invalid')
      return;
    }

    let oldPass = this.changePasswordForm.controls['oldPassword'].value
    let newPass = this.changePasswordForm.controls['newPassword'].value


    if(oldPass !== this.user.password){
      this.message = 'Pogresna stara lozinka!'
      this.error = true;
      this.errorStyle = 'border: 5px solid red'
      setTimeout(() => {
        this.message = ''
        this.error = false;
        this.errorStyle = ''
      }, 2000)
      return;
    }

    var change = confirm('Da li ste sigurni da zelite da promenite lozinku?')
    if(change == false) return;

    switch(this.userType){
      case 0:{
        this.userService.changePassword(this.user.username, newPass).subscribe((res) => {
          var status = res['status']
          if(status == -1){
            alert('Doslo je do greske na serveru... Pokusajte ponovo')
          }
          else{
            alert('Lozinka uspesno promenjena, bicete izlogovani')
            sessionStorage.removeItem('user')
            sessionStorage.setItem('userType', '-1')
            this.router.navigate([''])
          }
        })
        break;
      }
      case 1:{
        this.companyService.changePassword(this.user.companyID, this.user.username, this.user.companyName, newPass).subscribe((res) => {
          var status = res['status']
          if(status == -1){
            alert('Doslo je do greske na serveru... Pokusajte ponovo')
          }
          else{
            alert('Lozinka uspesno promenjena, bicete izlogovani')
            sessionStorage.removeItem('company')
            sessionStorage.setItem('userType', '-1')
            this.router.navigate([''])
          }
        })
        break;
      }
      case 2:{
        this.adminService.changePassword(this.user.username, newPass).subscribe((res) => {
          var status = res['status']
          if(status == -1){
            alert('Doslo je do greske na serveru... Pokusajte ponovo')
          }
          else{
            alert('Lozinka uspesno promenjena, bicete izlogovani')
            sessionStorage.removeItem('admin')
            sessionStorage.setItem('userType', '-1')
            this.router.navigate(['admin-login'])
          }
        })
        break;
      }
    }
  }

  back(){
    switch(this.userType){
      case 0:{
        this.router.navigate(['user'])
        break;
      }
      case 1:{
        this.router.navigate(['company'])
        break;
      }
      case 2:{
        this.router.navigate(['admin'])
        break;
      }
    }
  }
}
