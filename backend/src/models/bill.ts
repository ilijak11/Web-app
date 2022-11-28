import mongoose from "mongoose";

const Schema = mongoose.Schema

let Racun = new Schema({
    paymentMethod:{
        type: Number
    },
    userFirstname:{
        type: String
    },
    userLastname:{
        type: String
    },
    userPaid:{
        type: Number
    },
    userChange:{
        type: Number
    },
    billNumber:{
        type: Number
    },
    userID:{
        type: String
    },
    companyID:{
        type: String
    },
    companyName:{
        type: String
    },
    pib:{
        type: String
    },
    objectName:{
        type: String
    },
    virmanCompanyID:{
        type: String
    },
    discount:{
        type: Number
    },
    paymentDeadline:{
        type: Number
    },
    date:{
        type: Date
    },
    price:{
        type: Number
    },
    basePrice:{
        type: Number
    },
    items:{
        type: [{
            itemName: String,
            itemUnit: String,
            itemTax: String,
            itemQuantity: Number,
            price: Number,
            basePrice: Number,
        }]
    }

})


export default mongoose.model("Racun", Racun, 'bills')