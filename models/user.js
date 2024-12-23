const {Schema, Model} = require('mongoose');

const userSchema = new Schema({
    fullName:{
        type : String,
        required : true,
    },
    email:{
        type: String,
        required : true,
        unique : true,
    }
    
})