const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({ 
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "User" ,
        required : true
    },
    orderItem : {
        type : mongoose.Schema.ObjectId ,
        ref : 'Product' , 
        required : true 
    },
    amount : {
        type : Number ,
    },
    status : String ,
    isActive : {
        type : Boolean , 
        default : true 
    },
    productType : {
        type : Number ,
        required : true 
    },
    seller : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true 
    } ,
    isPaid : {
        type : Boolean,
        default : false 
    }

}, { timestamps : true });


const Order = mongoose.model('Order' , orderSchema);
module.exports = Order ;
