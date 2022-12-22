const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { sendSuccessResponse }= require('../utils/helpers');
const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');



exports.sendMessage = catchAsync( async( req , res , next) => {
    const { message , chatId } = req.body;
    if(!message || !chatId){
        return next(new AppError('Missing required credentails.' ,400))
    }
    let newMessage = await Message.create({
        sender : req.user._id , 
        message , 
        chat : chatId
    });
    newMessage = await Message.findById(newMessage._id)
    .populate('sender' , 'name email role')
    .populate({ 
        path : 'chat' ,
        populate : { 
            path : 'users', 
            select : 'name role email'
        }
    });
    await Chat.findByIdAndUpdate(chatId , { latestMessage : newMessage?._id });
    return sendSuccessResponse(res , 200 , { 
        message : newMessage 
    })
});

exports.getMessages = catchAsync( async ( req , res ) => {
    const { chatId } = req.params;
    const messages = await Message.find({ chat : chatId })
    .populate('sender' , 'name email role')
    return sendSuccessResponse(res , 200 , { 
        messages 
    })
});

// exports.getMessages = catchAsync(async (req, res) => {
//     const messages = await Message.find({ chat : req.params.chatId })
//         .populate("sender", "name role email")
//         .populate("chat");
//     return sendSuccessResponse(res , 200 , { messages });
// });
  

// exports.sendMessage = catchAsync(async (req , res) => {
//     const { message , chatId } = req.body;
//     if (!message || !chatId) {
//         return next(new AppError('Missing required credentials.' , 400))
//     }
//     var newMessage = await Message.create({
//         sender : req.user._id ,
//         message , 
//         chat : chatId
//     });
//     newMessage = await newMessage.populate("sender", "name pic").execPopulate();
//     newMessage = await newMessage.populate("chat");
//     newMessage = await User.populate(newMessage, {
//         path: "chat.users",
//         select: "name role email",
//     });
//     await Chat.findByIdAndUpdate( chatId, { latestMessage: message });
//     return sendSuccessResponse(res , 201 , { 
//         message : newMessage 
//     })
// });
  