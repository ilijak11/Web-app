import mongoose from "mongoose";

const Schema = mongoose.Schema

let CompanyRegisterRequest = new Schema({
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
    address:{
        type: {
            country: String,
            city: String,
            postCode: Number,
            street: String,
            streetNumber: Number
        }
    },
    status:{
        type: Number
    },
    imageSrc:{
        type: String
    }
})

export default mongoose.model('CompanyRegisterRequest', CompanyRegisterRequest, 'company_register_request')