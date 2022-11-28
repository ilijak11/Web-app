import { Address } from "./address"
import { BankAccount } from "./bankAccount"
import { CashRegister } from "./cashRegister"
import { ItemCategory } from "./itemCategory"
import { Orderer } from "./orderer"
import { StorageUnit } from "./storageUnit"

export class Company{
    firstLogin: boolean
    firstname: string
    lastname: string
    username: string
    password: string
    phone: string
    email: string
    companyName: string
    companyID: string
    pib: string
    category: number
    activityCodes: number[]
    PDVsystem: boolean
    address: Address
    bankAccounts: BankAccount[]
    storageUnits: StorageUnit[]
    cashRegisters: CashRegister[]
    orderers: Orderer[]
    itemCategories: ItemCategory[]
    imageSrc: string;
}