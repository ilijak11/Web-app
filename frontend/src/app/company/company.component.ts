import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../models/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getCompanyFromSession()
  }

  @ViewChild('button1') button1: ElementRef
  company: Company;
  page: number = 6

  getCompanyFromSession(){
    this.company = JSON.parse(sessionStorage.getItem('company'))
  }

  logout(): void{
    var logout = confirm('Da li ste sigurni da zelite da se izlogujete?')
    if(logout){
      sessionStorage.removeItem('company')
      sessionStorage.setItem('userType', '-1')
      this.router.navigate([''])
    }
  }

  changePassword(): void{
    this.router.navigate(['/company/change-password'])
  }

  gotoPage(pageNum: number){
    this.ngOnInit()
    this.page = pageNum
  }

  refresh(){
    this.ngOnInit()
  }

}
