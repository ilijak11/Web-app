import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Bill } from '../models/bill';
import { User } from '../models/user';
import { BillService } from '../services/bill.service';
import { ArcElement, BarController, BarElement, BubbleController, CategoryScale, Chart, ChartType, Decimation, DoughnutController, Filler, Legend, LinearScale, LineController, LineElement, LogarithmicScale, PieController, PointElement, PolarAreaController, RadarController, RadialLinearScale, registerables, ScatterController, TimeScale, TimeSeriesScale, Title, Tooltip } from 'node_modules/chart.js'
import 'chartjs-adapter-date-fns'

@Component({
  selector: 'app-user-bills',
  templateUrl: './user-bills.component.html',
  styleUrls: ['./user-bills.component.css']
})
export class UserBillsComponent implements OnInit, AfterViewInit {

  constructor(private billService: BillService) { }
  @ViewChild('canvasMonth', {static: false}) canvasMonth: ElementRef<HTMLCanvasElement>
  @ViewChild('canvasYear', {static: false}) canvasYear: ElementRef<HTMLCanvasElement>

  myBills: Bill[] = null
  user: User
  chart_month: Chart
  chart_year: Chart

  ngOnInit(): void {
    this.getUserFromSession()
  }

  ngAfterViewInit(): void {
    this.getMyBills()
  }

  getMyBills(){
    this.billService.getUserBills(this.user.idNumber).subscribe(res => {
      if(res['status'] == -1){
        alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
      }
      else{
        this.myBills = res['bills']
        console.log(this.myBills)
        this.prepareData()
        this.generateCharts()
      }
    })
  }

  dataMonth: Array<{x: number, y: number}> = null
  dataYear: Array<{x: number, y: number}> = null

  prepareData(){
    this.prepareDataMonth()
    this.prepareDataYear()
  }

  prepareDataYear(){
    let data = new Array<{x: number, y: number}>()
    let now = new Date()
    let year = now.getFullYear()
    for(let month = 0; month<12; month++){
      let total = 0;
      let date = new Date(year, month, 1)
      let billsOnMonth = this.myBills.filter((bill) => {
        let m1 = date.getMonth()
        let m2 = new Date(bill.date).getMonth()
        return m1 == m2
      })
      for(let bill of billsOnMonth){
        console.log('equals')
        total += bill.price
      }
      data.push({x: new Date(date).getTime(), y: total})
    }
    this.dataYear = data
  }

  prepareDataMonth(){
    let data = new Array<{x: number, y: number}>()
    let now = new Date()
    let year = now.getFullYear()
    let month = now.getMonth()
    let date = new Date(year, month, 1);
    while(date.getMonth() === month){
      let total = 0
      let billsOnDate = this.myBills.filter((bill) => {
        let d1 = date.toDateString()
        let d2 = new Date(bill.date).toDateString()
        return d1 === d2
      })
      for(let bill of billsOnDate){
        console.log('equals')
        total += bill.price
      }
      data.push({x: new Date(date).getTime(), y: total})
      date.setDate(date.getDate() + 1)
    }
    this.dataMonth = data
    console.log(this.dataMonth)
  }

  getUserFromSession(){
    this.user = JSON.parse(sessionStorage.getItem('user'))
    console.log(this.user)
  }

  generateCharts(){
    Chart.register(ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Decimation,
      Filler,
      Legend,
      Title,
    Tooltip)
    this.generateChartMonth()
    this.generateChartYear()
  }

  generateChartYear(){
    let cntxt = this.canvasYear.nativeElement.getContext('2d')
    this.chart_month = new Chart(cntxt, {
      type: 'bar',
      data: {
        datasets: [{
          data: this.dataYear,
          backgroundColor: [
            'cadetblue',
          ],
        }],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month'
            }
          },
          y: {
            title: {
              display: true,
              text: "RSD"
            }
          }
        }
      }
    })
  }

  generateChartMonth(){
    //npm install date-fns chartjs-adapter-date-fns --save
    //npm install chart.js
    let cntxt = this.canvasMonth.nativeElement.getContext('2d')
    this.chart_month = new Chart(cntxt, {
      type: 'bar',
      data: {
        datasets: [{
          data: this.dataMonth,
          backgroundColor: [
            'cadetblue',
          ],
          borderWidth: 1
          }],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            }
          },
          y: {
            title: {
              display: true,
              text: "RSD"
            }
          }
        }
      }
    })
  }

}
