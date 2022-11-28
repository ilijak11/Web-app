import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    username:{
        type: String
    },
    password:{
        type: String
    },
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    phone:{
        type: String
    },
    idNumber:{
        type: String
    }
})

export default mongoose.model('User', User, 'users')