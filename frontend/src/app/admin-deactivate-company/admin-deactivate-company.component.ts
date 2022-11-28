import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from '../models/company';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-deactivate-company',
  templateUrl: './admin-deactivate-company.component.html',
  styleUrls: ['./admin-deactivate-company.component.css']
})
export class AdminDeactivateCompanyComponent implements OnInit {

  constructor(private adminService: AdminService) { }
  @Input('company') company: Company
  @Output() companyDeactivated: EventEmitter<any> = new EventEmitter()

  ngOnInit(): void {
  }

  deactivate(){
    let proceed = confirm(`Da li ste sigurni da zelite da deaktivirate preduzece: ${this.company.companyName}`)
    if(!proceed) return

    this.adminService.deactivateCompany(this.company.companyID, this.company.pib, this.company.companyName).subscribe((res) => {
      if(res['status'] == -1){
        alert("Doslo je do greske na serveru... Pokusajte ponovo kasnije")
      }
      else{
        alert(`Preduzece: ${this.company.companyName} uspesno deaktivirano!`)
        this.companyDeactivated.emit()
      }
    })
  }

}
