import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/bill';
import { BillService } from '../services/bill.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private billService: BillService) { }


  allBills: Bill[] = null
  showBills: Bill[] = null

  ngOnInit(): void {
    this.getAllBills()
  }

  getAllBills(){
    this.billService.getAllBills().subscribe(res => {
      if(res['status'] == -1){
        alert("Doslo je do greske na serveru... Pokusajte ponovo kasnije")
      }
      else{
        this.allBills = res['bills']
        console.log(this.allBills)
        this.filterBills()
      }
    })
  }

  filterBills(){
    this.allBills = this.allBills.sort((b1, b2) => {
      let date1 = new Date(b1.date)
      let date2 = new Date(b2.date)
      return  date2.getTime() - date1.getTime()
    })
    this.showBills = this.allBills.slice(0, 5)

    console.log(this.showBills)
  }

}
