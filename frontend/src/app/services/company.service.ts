import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankAccount } from '../models/bankAccount';
import { CashRegister, Section } from '../models/cashRegister';
import { CompanyRegisterRequest } from '../models/companyRegisterRequest';
import { Item } from '../models/item';
import { ItemCategory, SubCategory } from '../models/itemCategory';
import { Orderer } from '../models/orderer';
import { StorageUnit } from '../models/storageUnit';
import { Table } from '../models/table';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  uri: string = 'http://localhost:4000'

  makeRegisterRequest(requestObj: CompanyRegisterRequest){
    const data = {
      companyRequest: requestObj
    }

    return this.http.post(`${this.uri}/company/makeRegisterRequest`, data)
  }

  login(username: string, password: string){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/company/login`, data)
  }

  changePassword(companyID: string, username: string, companyName: string, newPass: string){
    const data = {
      companyID: companyID,
      username: username,
      companyName: companyName, 
      newPass: newPass
    }

    return this.http.post(`${this.uri}/company/changePassword`, data)
  }

  firstLoginInfoUpdate(companyID: string,
                      companyName: string,
                      category: number, 
                      activityCodes: number[], 
                      PDVsystem: boolean, 
                      bankAccounts: BankAccount[],
                      storageUnits: StorageUnit[],
                      cashRegisters: CashRegister[]){
    const data = {
      companyID: companyID,
      companyName: companyName,
      category: category,
      activityCodes: activityCodes,
      PDVsystem: PDVsystem,
      bankAccounts: bankAccounts,
      storageUnits: storageUnits,
      cashRegisters: cashRegisters
    }

    return this.http.post(`${this.uri}/company/firstLoginInfoUpdate`, data)
  }

  updateInfo(companyID: string, update: any, updateType: number){
    const data = {
      companyID: companyID,
      update: update,
      updateType: updateType
    }

    return this.http.post(`${this.uri}/company/updateInfo`, data)
  }

  registerNewBankAccount(companyID: string, bankAccount: BankAccount){
    const data = {
      companyID: companyID,
      bankAccount: bankAccount
    }

    return this.http.post(`${this.uri}/company/registerNewBankAccount`, data)
  }

  deleteAccount(companyID: string, bankAccount: BankAccount){
    const data = {
      companyID: companyID,
      bankAccount: bankAccount
    }

    return this.http.post(`${this.uri}/company/deleteAccount`, data)
  }

  registerNewStorageUnit(companyID: string, storageUnit: StorageUnit){
    const data = {
      companyID: companyID,
      storageUnit: storageUnit
    }

    return this.http.post(`${this.uri}/company/registerNewStorageUnit`, data)
  }

  deleteStorageUnit(companyID: string, storageUnit: StorageUnit){
    const data = {
      companyID: companyID,
      storageUnit: storageUnit
    }

    return this.http.post(`${this.uri}/company/deleteStorageUnit`, data)
  }

  registerNewCashRegister(companyID: string, register: CashRegister){
    const data = {
      companyID: companyID,
      cashRegister: register
    }

    return this.http.post(`${this.uri}/company/registerNewCashRegister`, data)
  }

  deleteCashRegister(companyID: string, register: CashRegister){
    const data = {
      companyID: companyID,
      cashRegister: register
    }

    return this.http.post(`${this.uri}/company/deleteCashRegister`, data)
  }

  addNewProduct(companyID: string, item: Item){
    const data = {
      companyID: companyID,
      item: item
    }

    return this.http.post(`${this.uri}/company/addNewProduct`, data)
  }

  getAllItems(companyID: string){
    const data = {
      companyID: companyID
    }

    return this.http.post(`${this.uri}/company/getAllItems`, data)
  }

  deleteItem(companyID: string, item: Item){
    const data = {
      companyID: companyID,
      item: item
    }

    return this.http.post(`${this.uri}/company/deleteItem`, data)
  }

  updateItem(companyID: string, updatedItem: Item, oldItem: Item){
    const data = {
      companyID: companyID,
      updatedItem: updatedItem,
      oldItem: oldItem
    }

    return this.http.post(`${this.uri}/company/updateItem`, data)
  }

  getAllCompanies(){
    return this.http.get(`${this.uri}/company/getAllCompanies`)
  }

  addNewOrderer(companyID: string, orderer: Orderer){
    const data = {
      companyID: companyID,
      orderer: orderer
    }

    return this.http.post(`${this.uri}/company/addNewOrderer`, data)
  }

  deleteOrderer(companyID: string, orderer: Orderer){
    const data = {
      companyID: companyID,
      orderer: orderer
    }

    return this.http.post(`${this.uri}/company/deleteOrderer`, data)
  }

  addNewItemCategory(companyID: string, itemCategory: ItemCategory){
    const data = {
      companyID: companyID,
      itemCategory: itemCategory
    }

    return this.http.post(`${this.uri}/company/addNewItemCategory`, data)
  }

  addNewItemSubCategory(companyID: string, itemCategory: ItemCategory, subCategory: SubCategory){
    const data = {
      companyID: companyID,
      itemCategory: itemCategory,
      subCategory: subCategory
    }

    return this.http.post(`${this.uri}/company/addNewItemSubCategory`, data)
  }

  assignCategoryToProduct(companyID: string, itemID: string, category: string){
    const data = {
      companyID: companyID,
      itemID: itemID,
      category: category
    }

    return this.http.post(`${this.uri}/company/assignCategoryToProduct`, data)
  }

  assignSubCategoryToProduct(companyID: string, itemID: string, category: string, subCategory: string){
    const data = {
      companyID: companyID,
      itemID: itemID,
      category: category,
      subCategory: subCategory
    }

    return this.http.post(`${this.uri}/company/assignSubCategoryToProduct`, data)
  }

  addNewSection(companyID: string, objectID: number, section: Section){
    const data = {
      companyID: companyID,
      objectID: objectID,
      section: section
    }

    return this.http.post(`${this.uri}/company/addNewSection`, data)
  }

  deleteSection(companyID: string, objectID: number, section: Section){
    const data = {
      companyID: companyID,
      objectID: objectID,
      section: section
    }

    return this.http.post(`${this.uri}/company/deleteSection`, data)
  }

  addNewTable(companyID: string, objectID: number, sectionName: string, table: Table){
    const data = {
      companyID: companyID,
      objectID: objectID,
      sectionName: sectionName,
      table: table
    }

    return this.http.post(`${this.uri}/company/addNewTable`, data)
  }

  deleteTable(companyID: string, objectID: number, sectionName: string, table: Table){
    const data = {
      companyID: companyID,
      objectID: objectID,
      sectionName: sectionName,
      table: table
    }

    return this.http.post(`${this.uri}/company/deleteTable`, data)
  }

  moveTable(companyID: string, objectID: number, sectionName: string, table: Table){
    const data = {
      companyID: companyID,
      objectID: objectID,
      sectionName: sectionName,
      table: table
    }

    return this.http.post(`${this.uri}/company/moveTable`, data)
  }

  updateStorageStock(companyID: string, itemID: string, storageID: number, storageName: string, quantity: number){
    const data = {
      companyID: companyID,
      itemID: itemID,
      storageID: storageID,
      storageName: storageName,
      quantity: quantity
    }

    return this.http.post(`${this.uri}/company/updateStorageStock`, data)
  }
  
}
