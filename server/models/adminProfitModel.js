const mongoose = require('mongoose');

const adminProfitSchema = new mongoose.Schema({
    profit : { 
        type : Number ,
        required : [true , 'Profit is required.']
    },
    isActive : {
        type : Boolean ,
        default : true 
    }
}, { timestamps : true });


const AdminProfit = mongoose.model('AdminProfit' , adminProfitSchema);
module.exports = AdminProfit ;