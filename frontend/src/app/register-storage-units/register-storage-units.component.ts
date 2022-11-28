import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageUnit } from '../models/storageUnit';

@Component({
  selector: 'app-register-storage-units',
  templateUrl: './register-storage-units.component.html',
  styleUrls: ['./register-storage-units.component.css']
})
export class RegisterStorageUnitsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
    this.getStyle()
  }

  @Input('numberOfStorageUnits') numberOfStorageUnits: number;
  formGroup: FormGroup
  storageUnits: StorageUnit[] = new Array<StorageUnit>()
  isSubmitted: boolean
  number: number = 0;
  style: string

  getStyle(){
    var type = parseInt(sessionStorage.getItem('userType'))
    if(type == 0 || type == 1){
      this.style = 'background-color: cadetblue'
    }
    else{
      this.style = 'background-color: salmon'
    }
  }

  buildForm(): void{
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.formGroup.invalid) return;
    this.number += 1
    if(this.number > this.numberOfStorageUnits){
      this.number -= 1
      return
    } 

    let name = this.formGroup.controls['name'].value
    this.storageUnits.push(new StorageUnit(this.number, name))
    sessionStorage.setItem('storageUnits', JSON.stringify(this.storageUnits))
    this.isSubmitted = false
    this.formGroup.reset()
  }

  deleteUnit(unit: StorageUnit){
    var ind = this.storageUnits.indexOf(unit)
    this.storageUnits.splice(ind, 1)
    sessionStorage.setItem('storageUnits', JSON.stringify(this.storageUnits))
    this.number -= 1
  }

}
