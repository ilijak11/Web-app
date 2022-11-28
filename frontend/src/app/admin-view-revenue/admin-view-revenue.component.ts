import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bill } from '../models/bill';
import { Report } from '../models/report';
import { BillService } from '../services/bill.service';

@Component({
  selector: 'app-admin-view-revenue',
  templateUrl: './admin-view-revenue.component.html',
  styleUrls: ['./admin-view-revenue.component.css']
})
export class AdminViewRevenueComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private billService: BillService) { }

  formGroup: FormGroup
  isSubmitted: boolean = false
  allBills: Bill[] = null
  showBills: Bill[] = null
  report: Report = null
  viewBills: boolean = false

  ngOnInit(): void {
    this.buildForm()
    this.getAllBills()
  }

  getAllBills(){
    this.billService.getAllBills().subscribe(res => {
      if(res['status'] == -1){
        alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
      }
      else{
        this.allBills = res['bills']
        console.log(this.allBills)
      }
    })
  }

  buildForm(){
    this.formGroup = this.formBuilder.group({
      companyName: [''],
      pib: [''],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required]
    })
  }

  printDateFrom(): string{
    let dateFrom = new Date(this.formGroup.controls['dateFrom'].value)
    return formatDate(dateFrom, 'dd.MM.yyyy', 'en-US')
  }

  printDateTo(): string{
    let dateTo = new Date(this.formGroup.controls['dateTo'].value)
    return formatDate(dateTo, 'dd.MM.yyyy', 'en-US')
  }

  printCompanyName(): string{
    if(this.formGroup.controls['companyName'].value) return this.formGroup.controls['companyName'].value
    else return "~"
  }

  printPIB(): string{
    if(this.formGroup.controls['pib'].value) return this.formGroup.controls['pib'].value
    else return "~"
  }

  toggle(){
    this.viewBills = ! this.viewBills
  }

  onSubmit(){
    this.isSubmitted = true
    if(this.formGroup.invalid){
      console.log('invalid form')
      return
    }
    this.isSubmitted = false

    let companyName = this.formGroup.controls['companyName'].value
    let pib =  this.formGroup.controls['pib'].value
    let dateFrom = this.formGroup.controls['dateFrom'].value
    let dateTo = this.formGroup.controls['dateTo'].value

    console.log(companyName)
    console.log(pib)
    console.log(dateFrom)
    console.log(dateTo)

    let dateF = new Date(dateFrom).getTime()
    let dateT = new Date(dateTo).getTime()

    this.showBills = this.allBills.filter((bill) => {
      let date = new Date(bill.date).getTime()
      if(date >= dateF && date <= dateT){
        if(companyName){
          if(bill.companyName !== companyName) return false
        }
        if(pib){
          if(bill.pib !== pib) return false
        }
        return true
      }
      else{
        return false
      }
    })
    
    this.report = new Report()
    for(let bill of this.showBills){
      this.report.base += bill.basePrice
      this.report.total += bill.price
    }
    this.report.tax = this.report.total - this.report.base
  }

}
