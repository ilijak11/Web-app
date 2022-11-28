export class BillItem{
    itemID: string
    itemName: string
    itemUnit: string
    itemTax: number
    itemQuantity: number
    price: number
    basePrice: number
    storage: BillItemStorage

    constructor(id: string, name: string, unit: string, tax: number, billItem: BillItemStorage){
        this.itemID = id
        this.itemName = name
        this.itemUnit = unit
        this.itemTax = tax
        this.price = billItem.price
        this.itemQuantity = billItem.itemQuantity
        this.basePrice = Math.floor(this.price / (1 + tax))
        this.storage = billItem
    }
}

export class BillItemStorage{
    storageName: string
    storageID: number
    itemTax: number
    itemQuantity: number
    price: number

    constructor(name: string, id: number, tax: number){
        this.storageName = name
        this.storageID = id
        this.itemTax = tax
        this.itemQuantity = 0
        this.price = 0
    }
}