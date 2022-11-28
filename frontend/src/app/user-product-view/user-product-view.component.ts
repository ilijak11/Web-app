import { Component, Input, OnInit } from '@angular/core';
import { CompanyProduct } from '../models/companyProducts';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-product-view',
  templateUrl: './user-product-view.component.html',
  styleUrls: ['./user-product-view.component.css']
})
export class UserProductViewComponent implements OnInit {

  constructor(private userService: UserService) { }
  @Input('user') user: User

  ngOnInit(): void {
    this.getAllProductsAndCompanies()
  }

  searchParam: string = '';
  formInput: string;
  companyProducts: CompanyProduct[] = null

  getAllProductsAndCompanies(){
    this.userService.getAllProductsAndCompanies().subscribe((res) => {
      if(res['status'] == -1){
        alert('Doslo je do greske na serveru... pokusajte ponovo kasnije')
      }
      else{
        this.companyProducts = res['data']
        console.log(this.companyProducts)
      }
    })
  }


  search(){
    this.searchParam = this.formInput
  }

}
