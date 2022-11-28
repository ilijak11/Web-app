import { DatePipe, formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.getTime()
    }, 30000)

  }

  time: string = formatDate(new Date(), "HH:mm - dd.MM.yyyy", 'en-Us')
  
  getTime(): void {
    let date = new Date()
    this.time = formatDate(date, "HH:mm - dd.MM.yyyy", 'en-US')
  }

  getUserFromSession(): string { 
    var type = parseInt(sessionStorage.getItem('userType'))
    switch(type){
      case 0: {
        let user: User = JSON.parse(sessionStorage.getItem('user'))
        return `Korisnik: ${user.username} - tip: Kupac`
      }
      case 1:{
        let user: User = JSON.parse(sessionStorage.getItem('company'))
        return `Korisnik: ${user.username} - tip: Preduzece`
      }
      case 2:{
        let user: User = JSON.parse(sessionStorage.getItem('admin'))
        return `Admin: ${user.username}`
      }
      case -1:{
        return '';
      }
      default:{
        return '';
      }
    }
  }

}
