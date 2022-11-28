import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { using } from 'rxjs';
import { Bill } from '../models/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  uri: string = 'http://localhost:4000'

  addNewBill(bill: Bill){
    const data = {
      bill: bill
    }

    return this.http.post(`${this.uri}/bill/addNewBill`, data)
  }

  getAllCompanyBills(companyID: string){
    const data = {
      companyID: companyID
    }

    return this.http.post(`${this.uri}/bill/getAllCompanyBills`, data)
  }

  getAllBills(){
    return this.http.get(`${this.uri}/bill/getAllBills`)
  }

  getUserBills(userID: string){
    const data = {
      userID: userID
    }

    return this.http.post(`${this.uri}/bill/getUserBills`, data)
  }
}
