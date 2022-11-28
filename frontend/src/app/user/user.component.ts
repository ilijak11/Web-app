import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router,
              ) { }

  ngOnInit(): void {
    this.getUserFromSession()
  }

  user: User;

  getUserFromSession(){
    this.user = JSON.parse(sessionStorage.getItem('user'))
  }

  logout(): void{
    var logout = confirm('Da li ste sigurni da zelite da se izlogujete?')
    if(logout){
      sessionStorage.removeItem('user')
      sessionStorage.setItem('userType', '-1')
      this.router.navigate([''])
    }
  }

  changePassword(): void{
    this.router.navigate(['/user/change-password'])
  }

}
