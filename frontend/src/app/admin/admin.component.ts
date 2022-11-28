import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { CompanyRegisterRequest } from '../models/companyRegisterRequest';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAdminFromSession()
    this.getRegisterRequests()
    this.getAllCompanies()
  }

  getAdminFromSession(){
    this.admin = JSON.parse(sessionStorage.getItem('admin'))
  }

  getAllCompanies(){
    this.adminService.getAllCompanies().subscribe((res) => {
      if(res['status'] == -1){
        this.allCompanies = null;
        alert('Desila se greska na serveru...')
      }
      else{
        this.allCompanies = res['companies']
        console.log(this.allCompanies)
      }
    })
  }

  companyDeactivated(){
    this.getAllCompanies()
  }

  getRegisterRequests(){
    this.adminService.getRegisterRequests().subscribe((res) => {
      if(res['status'] == -1){
        this.registerRequests = null;
        alert('Desila se greska na serveru...')
      }
      else{
        this.registerRequests = res['requests']
        console.log(this.registerRequests)
      }
    })
  }

  admin: User;
  registerRequests: CompanyRegisterRequest[] = null
  allCompanies: Company[] = null

  logout(){
    let logout = confirm("Da li ste sigurni da zelite da se izlogujete?")
    if(logout){
      sessionStorage.removeItem('admin')
      sessionStorage.setItem('userType', '-1')
      this.router.navigate([''])
    } 
  }

  changePassword(): void{
    this.router.navigate(['/admin/change-password'])
  }

  makeCompanyObject(request: CompanyRegisterRequest): Company{
    let companyObj = new Company()
    companyObj.firstLogin = true;
    companyObj.firstname = request.firstname
    companyObj.lastname = request.lastname
    companyObj.username = request.username
    companyObj.email = request.email
    companyObj.phone = request.phone
    companyObj.password = request.password
    companyObj.companyName = request.companyName
    companyObj.address = request.address
    companyObj.pib = request.pib
    companyObj.companyID = request.companyID
    companyObj.imageSrc = request.imageSrc
    companyObj.category = -1
    companyObj.activityCodes = null
    companyObj.PDVsystem = false
    companyObj.bankAccounts = null
    companyObj.storageUnits = null
    companyObj.cashRegisters = null
    return companyObj
  } 

  processRequest(event: any){
    var action = event.action
    var request = event.request

    if(action == 1){
      //accept
      let company: Company = this.makeCompanyObject(request)

      var accept = confirm("Da li ste sigurni da zelite da prihvatite zahtev?")
      if(accept == false) return
      
      this.adminService.registerNewCompany(company).subscribe((res) => {
        if(res['status'] == -1){
          alert('Doslo je do greske na serveru...')
        }
        else{
          this.adminService.updateRegisterRequest(request, 1).subscribe((res) => {
            if(res['status'] == -1){
              alert('Doslo je do greske na serveru...')
            }else{
              alert('Zahtev uspesno prihvacen')
              this.getRegisterRequests()
              this.getAllCompanies()
            }
          })
        }
      })
    }
    else{
      this.adminService.updateRegisterRequest(request, -1).subscribe((res) => {
        if(res['status'] == -1){
          alert('Doslo je do greske na serveru...')
        }else{
          alert('Zahtev uspesno odbijen')
          this.getRegisterRequests()
        }
      })
    }
  }

}
