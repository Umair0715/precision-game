const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId ,
        ref : 'User', 
    } ,
    amount : {
        type : Number , 
        required : true 
    } ,
    transactionItem : {
        type : mongoose.Schema.ObjectId ,
        ref : 'Product'
    },
    transactonType : {
        type : Number ,
        // 1 => buy , 2 => earning , 3 => withdrawal
    },
    description : String ,
    transactionBy : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    }
} , { timestamps : true });

const Transaction = mongoose.model('Transaction' , transactionSchema);
module.exports = Transaction;