import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CompanyRegisterRequest } from '../models/companyRegisterRequest';

@Component({
  selector: 'app-register-request',
  templateUrl: './register-request.component.html',
  styleUrls: ['./register-request.component.css']
})
export class RegisterRequestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input('request') request: CompanyRegisterRequest
  @Output('event') event: EventEmitter<{action: number, request: CompanyRegisterRequest}> = new EventEmitter()


  accept(){
    var action: number = 1
    var request = this.request
    this.event.emit({action, request})
  }
  
  decline(){
    var action: number = 0
    var request = this.request
    this.event.emit({action, request})
  }
}
