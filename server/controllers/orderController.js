const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Order = require('../models/orderModel');
const { sendSuccessResponse } = require('../utils/helpers');
const Product = require('../models/productModel');


const getQuery = (req) => {
    return req.query.type && req.query.type !== null ? { 
        productType : Number(req.query.type) 
    } : {};
}


exports.createOrder = catchAsync( async ( req , res , next) => {
    const { orderItem , amount } = req.body;
    if(!orderItem || !amount){
        return next(new AppError('Missing required credentials.' , 400))
    } 
    const product = await Product.findById(orderItem);
    let newOrder = await Order.create({ 
        orderItem , 
        amount ,
        user : req.user._id , 
        seller : product?.seller,
        productType : product?.type
    });
    newOrder = await Order.findById(newOrder._id)
    .populate('user' , 'name email role')
    .populate('orderItem' , '-__v');

    return sendSuccessResponse(res , 201 , { 
        order : newOrder 
    })
});

exports.getMyOrders = catchAsync( async ( req , res ) => {
    let query = getQuery(req);
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 6;
    const docCount = await Order.countDocuments({ 
        ...query , user : req.user._id , isActive : true 
    });
    const orders = await Order.find({ 
        ...query , user : req.user._id , isActive : true 
    })
    .limit(pageSize).skip(pageSize * (page - 1))
    .sort({ createdAt : '-1'})
    .populate('user' , 'name email role')
    .populate('orderItem' , '-__v')
    .populate('seller' , 'name email')
    const pages = Math.ceil( docCount / pageSize );

    return sendSuccessResponse(res , 200 , { 
        orders , pages , currentPage : page , ordersCount : docCount
    })
});

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

exports.getSingleOrder = catchAsync( async ( req , res , next) => {
    const order = await Order.findById(req.params.id)
    .populate('user' , 'name email role')
    .populate('orderItem' , '-__v')
    .populate('seller' , 'name email');

    return sendSuccessResponse(res , 200 , { 
        order  
    })
});

exports.getSellerOrders = catchAsync( async ( req , res ) => {
    let query = getQuery(req);
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 6;
    const docCount = await Order.countDocuments({ 
        ...query , seller : req.user._id , isActive : true 
    });
    const orders = await Order.find({ 
        ...query , seller : req.user._id , isActive : true 
    })
    .limit(pageSize).skip(pageSize * (page - 1))
    .sort({ createdAt : '-1'})
    .populate('user' , 'name email role')
    .populate('orderItem' , '-__v')
    .populate('seller' , 'name email')
    const pages = Math.ceil( docCount / pageSize );

    return sendSuccessResponse(res , 200 , { 
        orders , pages , currentPage : page , ordersCount : docCount
    })
});


exports.updateOrder = catchAsync( async (req , res , next ) => {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id , req.body , {
        new : true , 
        runValidators : true 
    });
    return sendSuccessResponse(res , 200 , {
        order 
    })
});


exports.deleteOrder = catchAsync(async(req ,res ,next) => {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    return sendSuccessResponse(res , 200 , {
        message : 'Order deleted successfully.'
    })
});

exports.checkAccountPaid = catchAsync(async(req , res , next) => {
    const { orderItem } = req.body;
    const order = await Order.findOne({ user : req.user._id , orderItem , isActive : true });
    
    return sendSuccessResponse(res , 200 , {
        isPaid : order?.isPaid ? true : false 
    });
});