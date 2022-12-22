const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({ 
    name : {
        type : String ,
        required : [true , 'Name is required.']
    } ,
    email : {
        type : String , 
        required : [true , 'Email is required.']
    } ,
    password : {
        type : String , 
        required : true 
    } ,
    isActive : {
        type : Boolean ,
        default : true 
    } ,
    role : Number ,
    // 1 = buyer , 2 = seller , 3 = admin  
    passwordResetToken : String ,
    passwordResetTokenExpire : Date 

} , { timestamps : true });

userSchema.pre('save' , async function(next) {
    if(!this.isModified('password')){
        return;
    }
    this.password = await bcrypt.hash(this.password , 10);
    next();
});


userSchema.methods.comparePassword = async function(givenPassword){
    return await bcrypt.compare(givenPassword , this.password);
}

const User = mongoose.model('User' , userSchema);
module.exports = User ;