import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../models/bill';
import { Company } from '../models/company';
import { Report } from '../models/report';
import { BillService } from '../services/bill.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private billService: BillService) { }
  @Input('company') company: Company

  allBills: Bill[] = null
  date: Date = new Date()
  page: number = 1
  report: Report = null

  ngOnInit(): void {
    this.getAllBills()
  }

  printDate(): string{
    return formatDate(this.date, "dd.MM.yyyy", 'en-US')
  }


  getAllBills(){
    this.billService.getAllCompanyBills(this.company.companyID).subscribe(res => {
      if(res['status'] == -1){
        alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
      }
      else{
        this.allBills = res['bills']
        console.log(this.allBills)
      }
    })
  }

  changeView(page: number){
    this.page = page
  }

  getReport(){
    console.log(this.date)
    let dateBills = this.allBills.filter((bill) => {
      let billDate = new Date(bill.date)
      let date = new Date(this.date)
      let d1 = billDate.toDateString()
      let d2 = date.toDateString()
      console.log(d1)
      console.log(d2)
      return d1 === d2
    })

    if(dateBills.length){
      this.report = new Report()
      for(let bill of dateBills){
        this.report.total += bill.price
        this.report.base += bill.basePrice
      }
      this.report.tax = this.report.total - this.report.base
    }
  }
}
