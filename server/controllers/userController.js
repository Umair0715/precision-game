const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const { sendSuccessResponse } = require('../utils/helpers');

exports.getSearchUser = catchAsync( async ( req , res ) => {
    const keyword = req.query.keyword ? {
        name : { 
            $regex : req.query.keyword ,
            $options : 'i' ,
        }
    } : {};
    const users = await User.find({ ...keyword , isActive : true });
    return sendSuccessResponse(res , 200 , { 
        users
    })
});


exports.getAdmin = catchAsync(async(req, res , next) => {
    const admin = await User.findOne({ role : 3}).select('name email role');
    return sendSuccessResponse(res , 200 , {
        admin 
    });
})