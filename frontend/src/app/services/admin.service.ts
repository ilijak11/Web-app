import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ht } from 'date-fns/locale';
import { Company } from '../models/company';
import { CompanyRegisterRequest } from '../models/companyRegisterRequest';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  uri: string = 'http://localhost:4000'

  login(username: string, password: string){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/admin/login`, data)
  }

  registerNewUser(username: string, password: string, firstname: string, lastname: string, phone: string, idNumber: string){
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      idNumber: idNumber
    }

    return this.http.post(`${this.uri}/admin/registerNewUser`, data)
  }

  changePassword(username: string, newPass: string){
    const data = {
      username: username,
      newPassword: newPass
    }

    return this.http.post(`${this.uri}/admin/changePassword`, data)
  }

  registerNewCompany(company: Company){
    const data = {
      company: company
    }

    return this.http.post(`${this.uri}/admin/registerNewCompany`, data)
  }

  getRegisterRequests(){
    return this.http.get(`${this.uri}/admin/getRegisterRequests`)
  }

  updateRegisterRequest(request: CompanyRegisterRequest, newStatus: number){
    const data = {
      request: request,
      newStatus: newStatus
    }

    return this.http.post(`${this.uri}/admin/updateRegisterRequest`, data)

  }

  getAllCompanies(){
    return this.http.get(`${this.uri}/admin/getAllCompanies`)
  }

  deactivateCompany(companyID: string, pib: string, companyName: string){
    const data = {
      companyID: companyID,
      pib: pib,
      companyName: companyName
    }

    return this.http.post(`${this.uri}/admin/deactivateCompany`, data)
  }
}
