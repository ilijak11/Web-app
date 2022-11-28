import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  @ViewChild('username') usernameInput: ElementRef
  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService) {
    this.buildForm()
  }

  ngOnInit(): void {
  }

  registerUserForm: FormGroup;
  isSubmitted: boolean;
  idNumberPattern: string = '[0-9]{9}'
  message: string;
  registerError: boolean;
  registerStyle: string = "background-color: orange;"

  buildForm(): void{
    this.registerUserForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['+', [Validators.required]],
      idNumber: ['', [Validators.required, Validators.pattern(this.idNumberPattern)]]
    })
  }

  resetForm(): void{
    this.registerUserForm.reset()
    this.isSubmitted = false;
    this.usernameInput.nativeElement.focus()
  }

  onSubmit(): void{
    this.isSubmitted = true;
    if(this.registerUserForm.invalid){
      console.log('invalid form')
      return;
    }
    let username = this.registerUserForm.controls['username'].value
    let password = this.registerUserForm.controls['password'].value
    let firstname = this.registerUserForm.controls['firstname'].value
    let lastname = this.registerUserForm.controls['lastname'].value
    let phone = this.registerUserForm.controls['phone'].value
    let idNumber = this.registerUserForm.controls['idNumber'].value

    console.log(username)
    console.log(password)
    console.log(firstname)
    console.log(lastname)
    console.log(phone)
    console.log(idNumber)

    this.adminService.registerNewUser(username, password, firstname, lastname, phone, idNumber).subscribe((res) => {
      if(res['status'] == -1){
        alert('Doslo je do greske')
      }
      else if(res['status'] == 1){
        this.message = "Korisnicko ime ili maticni broj vec postoje"
        this.registerError = true;
        this.registerStyle = "border: 5px solid red; background-color: orange;"
        setInterval(() => {
          this.message = ""
          this.registerError = false;
          this.registerStyle = "background-color: orange;"
        }, 2000)
      }
      else{
        alert('Kupac uspesno registrovan')
      }
    })
  }

}
