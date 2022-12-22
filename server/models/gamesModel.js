const mongoose = require('mongoose');

const gamesSchema = new mongoose.Schema({
    name : {
        type : String ,
        reuired : true 
    } , 
    image : {
        type : String , 
        required : true 
    } ,
    description : {
        type : String ,
        required : true 
    } ,
    isActive : {
        type : Boolean ,
        default : true 
    }
}, { timestamps : true });


const Game = mongoose.model('Game' , gamesSchema);
module.exports = Game;