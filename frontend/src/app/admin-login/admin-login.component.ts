import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../models/admin';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService,
              private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  adminLoginForm: FormGroup;
  isSubmitted: boolean;
  message: string;
  loginError: boolean;
  loginErrorStyle: string;

  buildForm(){
    this.adminLoginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.adminLoginForm.invalid){
      console.log('invalid form')
      return;
    }

    let username = this.adminLoginForm.controls['username'].value
    let password = this.adminLoginForm.controls['password'].value

    this.adminService.login(username, password).subscribe((res)=>{
      if(res['status'] == -1){
        alert('Desila se greska na serveru... Probajte ponovo kasnije')
      }
      else if(res['status'] == 0){
        let admin: Admin = res['admin']
        sessionStorage.setItem('admin', JSON.stringify(admin))
        sessionStorage.setItem('userType', '2')
        this.router.navigate(['admin'])
      }
      else{
        this.loginError = true;
        this.loginErrorStyle = 'border: 5px solid red'
        this.message = "Pogresno korisnicko ime ili lozinka"
        setTimeout(()=>{
          this.loginError = false
          this.loginErrorStyle = ''
          this.message = ''
        }, 2000)
      }
    })
  }
}
