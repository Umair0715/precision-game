const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Transaction = require('../models/transactionModel');
const { sendSuccessResponse } = require('../utils/helpers');


exports.getAllTransactions = catchAsync( async( req , res ) => {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 6;

    const docCount = await Transaction.countDocuments({ isActive : true });
    const transactions = await Transaction.find({ isActive : true })
    .limit(pageSize)
    .skip(pageSize * ( page - 1 ))
    .sort({ createdAt : '-1' })
    .populate('user', 'name email role')
    .populate('transactionBy' , 'name email role')
    .populate('transactionItem' , 'title image price seller');

    const pages = Math.ceil(docCount/pageSize);
    return sendSuccessResponse(res , 200 , {
        transactions , currentPage : page , pages , docCount 
    });
});

exports.getMyTransactions = catchAsync( async ( req , res ) => {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 6;

    const docCount = await Transaction.countDocuments({ 
        isActive : true , user : req.user._id 
    });
    const transactions = await Transaction.find({ 
        isActive : true , user : req.user._id 
    })
    .limit(pageSize)
    .skip(pageSize * ( page - 1 ))
    .sort({ createdAt : '-1' })
    .populate('user', 'name email role')
    .populate('transactionBy' , 'name email role')
    .populate('transactionItem' , 'title image price seller');

    const pages = Math.ceil(docCount/pageSize);
    return sendSuccessResponse(res , 200 , {
        transactions , currentPage : page , pages , docCount 
    });
});