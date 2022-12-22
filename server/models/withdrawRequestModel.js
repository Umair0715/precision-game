const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema({
    paymentMethod : {
        type : Number ,
        required : true 
        // 1 = bank , 2 = stripe , 3 = paypal
    } ,
    amount : {
        type : Number ,
        required : true 
    } ,
    user : {
        type : mongoose.Schema.ObjectId ,
        ref : 'User',
        required : true 
    } ,
    bankIBAN : Number ,
    bankAccountName : String ,
    stripeEmail : String ,
    paypalEmail : String ,
    status : {
        type : Number ,
        default : 1 
        // 1 = pending , 2 = completed , 3 = declined
    } ,
    isActive : {
        type : Boolean ,
        default : true 
    },
    attachement : String 

} , { timestamps : true });

const WithdrawRequest = mongoose.model('WithdrawRequest' , withdrawSchema);
module.exports = WithdrawRequest;