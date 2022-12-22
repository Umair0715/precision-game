const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    comment : {
        type : String ,
        required : true 
    },
    rating : {
        type : Number ,
        required : true 
    },
    seller : {
        type : mongoose.Schema.ObjectId ,
        ref : "User",
        required : true 
    },
    user : {
        type : mongoose.Schema.ObjectId , 
        ref : "User" ,
        required : true 
    },
    isActive : {
        type : Boolean,
        default : true 
    }
}, { timestamps : true });

const Review = mongoose.model('Review' , reviewSchema);
module.exports = Review;