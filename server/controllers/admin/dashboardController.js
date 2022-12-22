const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Product = require('../../models/productModel');
const Order = require('../../models/orderModel');
const User = require('../../models/userModel');
const { sendSuccessResponse } = require('../../utils/helpers');
const Wallet = require('../../models/walletModel');

exports.getDashboardDetails = catchAsync( async ( req , res ) => {
    const ordersCount = await Order.countDocuments({ isActive : true });
    const productsCount = await Product.countDocuments({ isActive : true });
    const wallet = await Wallet.findOne({ user : req.user._id });
    //total sales , total balance remaining 

    sendSuccessResponse(res , 200 , { 
        ordersCount , productsCount  , wallet 
    });
});