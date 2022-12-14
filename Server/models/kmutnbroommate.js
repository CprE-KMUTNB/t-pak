const mongoose = require("mongoose")

const kmutnbloroommateSchema = mongoose.Schema({
    ID:{
        type:String,
        require:true,
        unique:false
    },
    place:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    detail:{
        type:String,
        required:true
    },
    telephone:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
    },
    Image:{
        type: String,
        required:true
    }
},{timestamps:true})
module.exports = mongoose.model("kmutnbroommate",kmutnbloroommateSchema)