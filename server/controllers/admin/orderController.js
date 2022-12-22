const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Order = require('../../models/orderModel');
const { sendSuccessResponse } = require('../../utils/helpers');

const getQuery = (req) => {
    return req.query.type && req.query.type !== null ? { 
        productType : Number(req.query.type) 
    } : {};
}

exports.getAllOrders = catchAsync( async ( req , res ) => {
    const query = getQuery(req);
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 6;
    const docCount = await Order.countDocuments({ ...query , isActive : true });
    const orders = await Order.find({ ...query , isActive : true })
    .limit(pageSize).skip(pageSize * ( page - 1 ))
    .sort({ createdAt : '-1'})
    .populate('user' , 'name email role')
    .populate('orderItem' , '-__v')
    .populate('seller' , 'name email');

    const pages = Math.ceil( docCount / pageSize );
    return sendSuccessResponse(res , 200 , { 
        orders , pages , currentPage : page , ordersCount : docCount
    })
});