const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.ObjectId, ref: "User" },
    message : { type: String, trim: true },
    chat: { type: mongoose.Schema.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    isActive : { 
        type : Boolean ,
        default : true 
    }
} , { timestamps : true });

const Message = mongoose.model('Message' , messageSchema);
module.exports = Message;