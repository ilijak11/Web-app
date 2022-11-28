import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../models/address';
import { Company } from '../models/company';
import { Orderer } from '../models/orderer';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-orderers',
  templateUrl: './orderers.component.html',
  styleUrls: ['./orderers.component.css']
})
export class OrderersComponent implements OnInit {

  constructor(private companyService: CompanyService,
              private formBuilder: FormBuilder) { }

  @Input('company') company: Company
  @ViewChild('input') input: ElementRef

  allCompanies: Orderer[]
  registerForm: FormGroup
  searchParam: string = ''
  showCompanies: Orderer[] = null
  firstSearch: boolean = true
  emailPattern: string = '.*'
  pibPattern: string = '[1-9][0-9]{8}'
  selectedCompany: Orderer = null
  isSubmitted: boolean = false

  ngOnInit(): void {
    this.getAllCompanies()
    this.buildFormNew()
  }

  buildFormNew(){
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['+', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      companyName: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      pib: ['', [Validators.required, Validators.pattern(this.pibPattern)]],
      companyID: ['', Validators.required],
      discount: ['', Validators.required],
      paymentDeadline: ['', Validators.required]
    })
  }

  buildFormSelected(){
    this.registerForm = this.formBuilder.group({
      firstname: [this.selectedCompany.firstname, Validators.required],
      lastname: [this.selectedCompany.lastname, Validators.required],
      username: [this.selectedCompany.username, Validators.required],
      phone: [this.selectedCompany.phone, [Validators.required]],
      email: [this.selectedCompany.email, [Validators.required, Validators.pattern(this.emailPattern)]],
      companyName: [this.selectedCompany.companyName, Validators.required],
      country: [this.selectedCompany.address.country, Validators.required],
      city: [this.selectedCompany.address.city, Validators.required],
      postCode: [this.selectedCompany.address.postCode, Validators.required],
      street: [this.selectedCompany.address.street, Validators.required],
      streetNumber: [this.selectedCompany.address.streetNumber, Validators.required],
      pib: [this.selectedCompany.pib, [Validators.required, Validators.pattern(this.pibPattern)]],
      companyID: [this.selectedCompany.companyID, Validators.required],
      discount: ['', Validators.required],
      paymentDeadline: ['', Validators.required]
    })
  }


  getAllCompanies(){
    this.companyService.getAllCompanies().subscribe((res) => {
      if(res['status'] == -1){
        alert('Doslo je do greske na serveru... Pkusajte ponovo kasnije')
      }
      else{
        this.allCompanies = res['companies']
        console.log(this.allCompanies)
      }
    })
  }

  search(){
    this.firstSearch = false
    if(this.searchParam === '') return
    const regex = new RegExp(this.searchParam)
    this.showCompanies = this.allCompanies.filter((company) => {
      return regex.test(company.pib) && company.companyID !== this.company.companyID
    })
  }

  selectOrderer(orderer: Orderer){
    this.selectedCompany = orderer
    this.buildFormSelected()
    this.input.nativeElement.focus()
  } 

  makeOrderer(): Orderer{
    let companyObj = new Orderer()
    companyObj.firstname = this.registerForm.controls['firstname'].value
    companyObj.lastname = this.registerForm.controls['lastname'].value
    companyObj.username = this.registerForm.controls['username'].value
    companyObj.email = this.registerForm.controls['email'].value
    companyObj.phone = this.registerForm.controls['phone'].value
    companyObj.companyName = this.registerForm.controls['companyName'].value
    let address = new Address(
      this.registerForm.controls['country'].value,
      this.registerForm.controls['city'].value,
      this.registerForm.controls['postCode'].value,
      this.registerForm.controls['street'].value,
      this.registerForm.controls['streetNumber'].value
    )
    companyObj.address = address
    companyObj.pib = this.registerForm.controls['pib'].value
    companyObj.companyID = this.registerForm.controls['companyID'].value
    companyObj.discount = this.registerForm.controls['discount'].value
    companyObj.paymentDeadline = this.registerForm.controls['paymentDeadline'].value
    return companyObj
  }

  onSubmit(): void{
    this.isSubmitted = true
    if(this.registerForm.invalid){
      console.log('invalid form')
      return
    }
    let orderer = this.makeOrderer()
      this.companyService.addNewOrderer(this.company.companyID, orderer).subscribe((res) => {
        var status = res['status']
        if(status == -1){
          alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
        }
        else{
          alert('Novi narucilac uspesno dodat')
          let company = res['company']
          console.log(company)
          this.company = company
          sessionStorage.setItem('company', JSON.stringify(this.company))
        }
      })
  }

  resetForm(): void{
    this.isSubmitted = false
    this.selectedCompany = null
    this.registerForm.reset()
    this.buildFormNew()
  }

  deleteOrderer(orderer){
    this.companyService.deleteOrderer(this.company.companyID, orderer).subscribe((res) => {
      var status = res['status']
      if(status == -1){
        alert('Doslo je do greske na serveru... Pokusajte ponovo kasnije')
      }
      else{
        alert('Narucilac uspesno obrisan')
        let company = res['company']
        console.log(company)
        this.company = company
        sessionStorage.setItem('company', JSON.stringify(this.company))
      }
    })
  }

}
