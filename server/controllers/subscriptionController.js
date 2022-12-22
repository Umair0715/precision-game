const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Subscription = require('../models/subscriptionModel');
const { sendSuccessResponse } = require('../utils/helpers');

exports.getMySubscription = catchAsync( async ( req , res ) => {
    const subscription = await Subscription.findOne({ user : req.user._id , isActive : true , endDate : { $gt : Date.now() }})
    return sendSuccessResponse(res , 200 , {
        subscription
    }) 
});