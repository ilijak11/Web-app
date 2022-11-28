import { BillItem } from "./billItem"


export class Bill{
    paymentMethod: number
    userFirstname: string
    userLastname: string
    userPaid: number
    userChange: number
    billNumber: number //slip racun
    userID: string // licna karta
    companyID: string
    companyName: string
    pib: string
    objectName: string
    virmanCompanyID: string
    discount: number
    paymentDeadline: number
    date: Date
    price: number
    basePrice: number
    items: BillItem[]

    constructor(paymentMethod: number, companyID: string, objectName: string, companyName: string, pib: string, price: number, basePrice: number, items: BillItem[]){
        this.paymentMethod = paymentMethod
        this.companyID = companyID
        this.companyName = companyName
        this.pib = pib
        this.objectName = objectName
        this.items = items
        this.date = new Date()
        this.price = price
        this.basePrice = basePrice
        //
        this.userFirstname = null
        this.userLastname = null
        this.userPaid = null
        this.userChange = null
        this.billNumber = null
        this.userID = null
        this.virmanCompanyID = null
        this.discount = null
        this.paymentDeadline = null
    }
}