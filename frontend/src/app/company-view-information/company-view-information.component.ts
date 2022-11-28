import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccount } from '../models/bankAccount';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-view-information',
  templateUrl: './company-view-information.component.html',
  styleUrls: ['./company-view-information.component.css']
})
export class CompanyViewInformationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private companyService: CompanyService) { }

  @Input('company') company: Company
  displayView: number = 1;

  ngOnInit(): void {
    this.buildForm()
  }

  codes: Array<string> = ['1111','2222','3333', '4444', '5555', '6666', '7777']
  emailPattern: string = 'aaa' //todo
  pibPattern: string = '[1-9][0-9]{8}'
  

  formGroup: FormGroup;
  changeElem: number = 0


  buildForm(): void{
    this.formGroup = this.formBuilder.group({
      picture: ['', Validators.required],
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
      category: ['', Validators.required], 
      activityCodes: ['', Validators.required],
      PDVsystem: [true],
    })
  }

  imageSrc: any

  onFileChange(event: any){
    if(event.target.files.length > 0){
      if(event.target.files[0].type !== 'image/jpeg' && event.target.files[0].type !== 'image/jpg' && event.target.files[0].type !== 'image/png'){
        alert('Fajl mora biti u JPG/PNG formatu')
        this.formGroup.controls['picture'].setValue("")
        return
      }
      const picture = event.target.files[0]
      const reader = new FileReader();
      reader.onload = (e) => {
        var img = new Image()
        img.src = <string>e.target.result
        img.onload = () => {
          console.log(img.width)
          console.log(img.height)
          if(img.height < 100 || img.width < 100 || img.width > 300 || img.height > 300){
            alert('Fajl mora biti izmedju 100x100 ili 300x300 px')
            this.formGroup.controls['picture'].setValue("")
            return
          }
          else{
            this.imageSrc = reader.result
          }
        }
      }
      reader.readAsDataURL(picture)
    }
  }

  category(): string{
    if(this.company.category == 0){
      return 'Prodavnica'
    }
    return 'Ugostiteljski objekat'
  }

  PDVsystem(): string{
    if(this.company.PDVsystem){
      return 'Da'
    }
    return 'Ne'
  }

  changeView(view: number){
    this.displayView = view;
  }

  change(elem: number){
    this.changeElem = elem
    console.log(elem)
  }

  save(): void{
    let companyID = this.company.companyID
    switch(this.changeElem){
      case 1:{
        //ime firme
        let update = this.formGroup.controls['companyName'].value
        console.log(update)

        let ok = confirm("Da li ste sigurni da zelite da promenite ime preduzeca?")
        if(ok == false) return

        this.companyService.updateInfo(companyID, update, this.changeElem).subscribe((res) => {
          if(res['status'] == -1){
            alert('Doslo je do greske na serveru... prokusajte ponovo kasnije')
          }
          else{
            let company = res['company']
            console.log(company)
            this.company = company
            sessionStorage.setItem('company', JSON.stringify(company))
            alert("Uspesno promenjeno ime preduzeca")
          }
        })
        break;
      }
      case 2:{
        //kategorija
        let update = this.formGroup.controls['category'].value
        console.log(update)

        let ok = confirm("Da li ste sigurni da zelite da promenite kategoriju preduzeca?")
        if(ok == false) return 

        this.companyService.updateInfo(companyID, update, this.changeElem).subscribe((res) => {
          if(res['status'] == -1){
            alert('Doslo je do greske na serveru... prokusajte ponovo kasnije')
          }
          else{
            let company = res['company']
            console.log(company)
            this.company = company
            sessionStorage.setItem('company', JSON.stringify(company))
            alert("Uspesno promenjena kategorija preduzeca")
          }
        })
        break;
      }
      case 3:{
        //sifre delatnosti
        let update = this.formGroup.controls['activityCodes'].value
        console.log(update)

        let ok = confirm("Da li ste sigurni da zelite da promenite sifre delatnosti?")
        if(ok == false) return 

        this.companyService.updateInfo(companyID, update, this.changeElem).subscribe((res) => {
          if(res['status'] == -1){
            alert('Doslo je do greske na serveru... prokusajte ponovo kasnije')
          }
          else{
            let company = res['company']
            console.log(company)
            this.company = company
            sessionStorage.setItem('company', JSON.stringify(company))
            alert("Uspesno promenjene sifre delatnosti preduzeca")
          }
        })
        break;
      }
      case 4:{
        //PDV
        let update = this.formGroup.controls['PDVsystem'].value
        console.log(update)

        let ok = confirm("Da li ste sigurni da zelite da promenite PDV status?")
        if(ok == false) return 

        this.companyService.updateInfo(companyID, update, this.changeElem).subscribe((res) => {
          if(res['status'] == -1){
            alert('Doslo je do greske na serveru... prokusajte ponovo kasnije')
          }
          else{
            let company = res['company']
            console.log(company)
            this.company = company
            sessionStorage.setItem('company', JSON.stringify(company))
            alert("Uspesno promenjen PDV status preduzeca")
          }
        })
        break;
      }
      case 5:{
        //drzava
        let update = this.formGroup.controls['country'].value
        console.log(update)

        let ok = confirm("Da li ste sigurni da zelite da promenite drzavu?")
        if(ok == false) return 

        this.companyService.updateInfo(companyID, update, this.changeElem).subscribe((res) => {
          if(res['status'] == -1){
            alert('Doslo je do greske na serveru... prokusajte ponovo kasnije')
          }
          else{
            let company = res['company']
            console.log(company)
            this.company = company
            sessionStorage.setItem('company', JSON.stringify(company))
            alert("Uspesno promenjen drzava preduzeca")
          }
        })
        break;
      }
      case 6:{
        //grad
        let update = this.formGroup.controls['city'].value
        console.log(update)

        let ok = confirm("Da li ste sigurni da zelite da promenite grad?")
        if(ok == false) return 

        this.companyService.updateInfo(companyID, update, this.changeElem).subscribe((res) => {
          if(res['status'] == -1){
            alert('Doslo je do greske na serveru... prokusajte ponovo kasnije')
          }
          else{
            let company = res['company']
            console.log(company)
            this.company = company
            sessionStorage.setItem('company', JSON.stringify(company))
            alert("Uspesno promenjen grad preduzeca")
          }
        })
        break;
      }
      case 7:{
        let update = this.formGroup.controls['postCode'].value
        console.log(update)

        let ok = confirm("Da li ste sigurni da zelite da promenite postanski kod?")
        if(ok == false) return 

        this.companyService.updateInfo(companyID, update, this.changeElem).subscribe((res) => {
          if(res['status'] == -1){
            alert('Doslo je do greske na serveru... prokusajte ponovo kasnije')
          }
          else{
            let company = res['company']
            console.log(company)
            this.company = company
            sessionStorage.setItem('company', JSON.stringify(company))
            alert("Uspesno promenjen postanski kod preduzeca")
          }
        })
        break;
      }
      case 8:{
        let update = this.formGroup.controls['street'].value
        console.log(update)

        let ok = confirm("Da li ste sigurni da zelite da promenite ulicu kod?")
        if(ok == false) return 

        this.companyService.updateInfo(companyID, update, this.changeElem).subscribe((res) => {
          if(res['status'] == -1){
            alert('Doslo je do greske na serveru... prokusajte ponovo kasnije')
          }
          else{
            let company = res['company']
            console.log(company)
            this.company = company
            sessionStorage.setItem('company', JSON.stringify(company))
            alert("Uspesno promenjena ulica kod preduzeca")
          }
        })
        break;
      }
      case 9:{
        let update = this.formGroup.controls['streetNumber'].value
        console.log(update)

        let ok = confirm("Da li ste sigurni da zelite da promenite broj ulice?")
        if(ok == false) return 

        this.companyService.updateInfo(companyID, update, this.changeElem).subscribe((res) => {
          if(res['status'] == -1){
            alert('Doslo je do greske na serveru... prokusajte ponovo kasnije')
          }
          else{
            let company = res['company']
            console.log(company)
            this.company = company
            sessionStorage.setItem('company', JSON.stringify(company))
            alert("Uspesno promenjen broj ulice kod preduzeca")
          }
        })
        break;
      }
      case 10:{
        let update = this.formGroup.controls['firstname'].value
        console.log(update)

        let ok = confirm("Da li ste sigurni da zelite da promenite ime odgovornog lica?")
        if(ok == false) return 

        this.companyService.updateInfo(companyID, update, this.changeElem).subscribe((res) => {
          if(res['status'] == -1){
            alert('Doslo je do greske na serveru... prokusajte ponovo kasnije')
          }
          else{
            let company = res['company']
            console.log(company)
            this.company = company
            sessionStorage.setItem('company', JSON.stringify(company))
            alert("Uspesno promenjeno ime odgovornog lica preduzeca")
          }
        })
        break;
      }
      case 11:{
        let update = this.formGroup.controls['lastname'].value
        console.log(update)

        let ok = confirm("Da li ste sigurni da zelite da promenite prezime odgovornog lica?")
        if(ok == false) return 

        this.companyService.updateInfo(companyID, update, this.changeElem).subscribe((res) => {
          if(res['status'] == -1){
            alert('Doslo je do greske na serveru... prokusajte ponovo kasnije')
          }
          else{
            let company = res['company']
            console.log(company)
            this.company = company
            sessionStorage.setItem('company', JSON.stringify(company))
            alert("Uspesno promenjeno prezime odgovornog lica preduzeca")
          }
        })
        break;
      }
      case 12: {
        let update = this.formGroup.controls['username'].value
        console.log(update)

        let ok = confirm("Da li ste sigurni da zelite da promenite korisnicko ime odgovornog lica?")
        if(ok == false) return 

        this.companyService.updateInfo(companyID, update, this.changeElem).subscribe((res) => {
          if(res['status'] == -1){
            alert('Doslo je do greske na serveru... prokusajte ponovo kasnije')
          }
          else{
            let company = res['company']
            console.log(company)
            this.company = company
            sessionStorage.setItem('company', JSON.stringify(company))
            alert("Uspesno promenjeno korisnicko ime odgovornog lica preduzeca")
          }
        })
        break;
      }
      case 13:{
        let update = this.formGroup.controls['phone'].value
        console.log(update)

        let ok = confirm("Da li ste sigurni da zelite da promenite telefon odgovornog lica?")
        if(ok == false) return 

        this.companyService.updateInfo(companyID, update, this.changeElem).subscribe((res) => {
          if(res['status'] == -1){
            alert('Doslo je do greske na serveru... prokusajte ponovo kasnije')
          }
          else{
            let company = res['company']
            console.log(company)
            this.company = company
            sessionStorage.setItem('company', JSON.stringify(company))
            alert("Uspesno promenjen telefon odgovornog lica preduzeca")
          }
        })
        break;
      }
      case 14:{
        let update = this.formGroup.controls['email'].value
        console.log(update)

        let ok = confirm("Da li ste sigurni da zelite da promenite e-mail odgovornog lica?")
        if(ok == false) return 

        this.companyService.updateInfo(companyID, update, this.changeElem).subscribe((res) => {
          if(res['status'] == -1){
            alert('Doslo je do greske na serveru... prokusajte ponovo kasnije')
          }
          else{
            let company = res['company']
            console.log(company)
            this.company = company
            sessionStorage.setItem('company', JSON.stringify(company))
            alert("Uspesno promenjen e-mail odgovornog lica preduzeca")
          }
        })
        break;
      }
      case 15:{
        let update = this.imageSrc
        console.log(update)

        let ok = confirm("Da li ste sigurni da zelite da promenite logo?")
        if(ok == false) return 

        this.companyService.updateInfo(companyID, update, this.changeElem).subscribe((res) => {
          if(res['status'] == -1){
            alert('Doslo je do greske na serveru... prokusajte ponovo kasnije')
          }
          else{
            let company = res['company']
            console.log(company)
            this.company = company
            sessionStorage.setItem('company', JSON.stringify(company))
            alert("Uspesno promenjen logo")
          }
        })
      }

    }
    this.changeElem = 0;
  }

  

  cancel(): void{
    this.changeElem = 0
  }




}
