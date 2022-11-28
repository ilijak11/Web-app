import mongoose from "mongoose";
import { type } from "os";

const Schema = mongoose.Schema

let Company = new Schema({
    active:{
        type: Boolean
    },
    firstLogin:{
        type: Boolean
    },
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    username:{
        type: String
    },
    password:{
        type: String
    },
    phone:{
        type: String
    },
    email:{
        type: String
    },
    companyName:{
        type: String
    },
    companyID:{
        type: String
    },
    pib:{
        type: String
    },
    category:{
        type: Number
    },
    activityCodes:{
        type: [{type: Number}]
    },
    PDVsystem:{
        type: Boolean
    },
    address:{
        type: {
            country: String,
            city: String,
            postCode: Number,
            street: String,
            streetNumber: Number
        }
    },
    bankAccounts:{
        type:[{
            accountNumber: String,
            bank: String
        }]
    },
    storageUnits:{
        type:[{
            id: Number,
            name: String
        }]
    },
    cashRegisters:{
        type:[{
            registerType: Number,
            storeName: String,
            id: Number,
            address: {
                country: String,
                city: String,
                postCode: Number,
                street: String,
                streetNumber: Number
            },
            sections: [{
                height: Number,
                width: Number,
                name: String,
                tables: [{
                    id: String,
                    shape: Number,
                    height: Number,
                    width: Number,
                    radius: Number,
                    x: Number,
                    y: Number
                }]
            }]
        }]
    },
    items:{
        type:[{
            id: String,
            name: String,
            unit: String,
            tax: Number,
            productType: Number,
            stock: Number,
            additionalInfo: {
                originCountry: String,
                foreignName: String,
                barcode: Number,
                manufacturer: String,
                customsTariff: Number,
                ecoTax: Boolean,
                exciseTax: Boolean,
                minStock: Number,
                maxStock: Number,
                description: String,
                declaration: String
            },
            storage: [{
                storageType: Number,
                id: Number,
                name: String,
                purchasePrice: Number,
                retailPrice: Number,
                currentStock: Number,
                minStock: Number,
                maxStock: Number
            }],
            category:{
                type: String
            },
            subCategory:{
                type: String
            },
            imageSrc:{
                type: String
            }
        }]
    },
    orderers:{
        type: [{
            firstname: String,
            lastname: String,
            username: String,
            phone: String,
            email: String,
            companyName: String,
            companyID: String,
            pib: String,
            address: {
                country: String,
                city: String,
                postCode: Number,
                street: String,
                streetNumber: Number
            },
            discount: Number,
            paymentDeadline: Number
        }]
    },
    itemCategories:{
        type:[{
            category: String,
            subCategories: [{
                subCategory: String 
            }]
        }]
    },
    imageSrc:{
        type: String
    }
})

export default mongoose.model('Company', Company, 'companies')

