export class Item{
    //obavezni podaci
    id: string;
    name: string;
    unit: string;
    tax: number;
    productType: number; //ugostitelji pice=0 hrana=1 sirovina=2 nista=-1
    //dopunski podaci
    additionalInfo: ItemAdditionalInformation
    storage: ItemStorageDescriptor[]
    stock: number; //ukupno proizvoda
    category: string
    subCategory: string
    imageSrc: string;

    constructor(id: string, name: string, unit: string, tax: number, productType: number){
        this.id = id
        this.name = name
        this.unit = unit
        this.tax = tax
        this.productType = productType
        this.additionalInfo = null
        this.storage = null
        this.category = null
        this.subCategory = null
    }
}

export class ItemAdditionalInformation{
    originCountry: string;
    foreignName: string;
    barcode: number;
    manufacturer: string;
    customsTariff: number;
    ecoTax: boolean;
    exciseTax: boolean;
    minStock: number;
    maxStock: number;
    description: string;
    declaration: string;
}

export class ItemStorageDescriptor{
    storageType: number
    id: number
    name: string
    purchasePrice: number
    retailPrice: number
    currentStock: number
    minStock: number
    maxStock: number
}

