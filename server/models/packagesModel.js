const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name : { 
        type : String , 
        required : true 
    },
    shortDescription : { 
        type : String , 
        required : true 
    } ,
    price : { 
        type : Number , 
        required : true 
    } , 
    packageDiscount : {
        type : Number ,
        required : true 
    } ,
    duration : { 
        type : Number , 
        required : true
        //1=week , 2=month , 3=6month , 4=year 
    } ,
    features : { 
        type : Array , 
        required : true 
    } ,
    isActive : { 
        type : Boolean ,
        default : true 
    },
}, { timestamps : true });

const Package = mongoose.model('Package' , packageSchema);
module.exports = Package ;