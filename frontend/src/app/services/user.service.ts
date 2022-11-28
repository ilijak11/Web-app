import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri: string = 'http://localhost:4000'

  login(username: string, password: string){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/user/login`, data)
  }

  changePassword(username: string, newPass: string){
    const data = {
      username: username,
      newPassword: newPass
    }

    return this.http.post(`${this.uri}/user/changePassword`, data)
  }

  getAllProductsAndCompanies(){
    return this.http.get(`${this.uri}/user/getAllProductsAndCompanies`)
  }
}
