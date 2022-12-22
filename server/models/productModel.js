const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({ 
    title : {
        type : String , 
        required : [true , 'Title is required.']
    } ,
    price : {
        type : Number ,
        required : [true , 'Price is required.'] 
    } ,
    image : {
        type : String , 
        required : [true, "Image is required."] 
    },
    seller : {
        type : mongoose.Schema.ObjectId ,
        ref : 'User' , 
        required : [true , 'Seller is required']
    },
    game : {
        type : mongoose.Schema.ObjectId ,
        ref : 'Game' ,
        required : true 
    } ,
    type : {
        type : Number ,
        //update
        // 1 = product , 2 = service , 3 = account ,
        required : [true , 'Product type is required.']
    },
    isActive : {
        type : Boolean ,
        default : true 
    },
    description : String ,
    accountTitle : String ,
    accountEmail : String ,
    accountPassword : String ,
}, { timestamps : true });


const Product = mongoose.model('Product' , productSchema)
module.exports = Product ;