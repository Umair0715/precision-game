const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const WithdrawRequest = require('../models/withdrawRequestModel');
const { sendSuccessResponse, uploadImage } = require('../utils/helpers');
const Wallet = require('../models/walletModel');


exports.createWithdrawRequest = catchAsync( async( req , res , next) => {
    if(req.user.role !== 2){
        return next(new AppError('You cannot perform this action' , 400))
    }
    const { amount , paymentMethod } = req.body;
    if(!amount || !paymentMethod){
        return next(new AppError('Missing required credentials' , 400))
    }
    const userWallet = await Wallet.findOne({ user : req.user._id , isActive : true });
    if(userWallet.totalBalance < amount){
        return next(new AppError('Insufficient Balance to withdraw this amount.' , 400 ))
    }
    let newRequest = await WithdrawRequest.create({ ...req.body , user : req.user._id });
    
    userWallet.totalBalance -= amount;
    userWallet.withdrawal += amount;
    await userWallet.save();

    newRequest = await WithdrawRequest.findById(newRequest._id)
    .populate('user' , 'name email role');

    return sendSuccessResponse(res , 200 , {
        request : newRequest
    })
});

exports.getAllWithdrawRequests = catchAsync( async ( req , res ) => {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 6;
    const docCount = await WithdrawRequest.countDocuments({ isActive : true });
    const requests = await WithdrawRequest.find({ isActive : true })
    .populate('user'  , 'name email role')
    .limit(pageSize)
    .skip(pageSize * ( page - 1 ))
    .sort({ createdAt : '-1'});
    const pages = Math.ceil(docCount/pageSize)

    return sendSuccessResponse(res , 200 , {
        requests , currentPage : page , pages , docCount
    })
});

exports.getMyWithdrawRequests = catchAsync( async ( req , res ) => {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 6;
    const docCount = await WithdrawRequest.countDocuments({ user : req.user._id , isActive : true });
    const requests = await WithdrawRequest.find({ user : req.user._id , isActive : true })
    .populate('user'  , 'name email role')
    .limit(pageSize)
    .skip(pageSize * ( page - 1 ))
    .sort({ createdAt : '-1'});
    const pages = Math.ceil(docCount/pageSize);

    return sendSuccessResponse(res , 200 , {
        requests , currentPage : page , pages , docCount
    })
});


exports.updateWithdrawRequest = catchAsync( async ( req , res , next ) => {
    const { id } = req.params;
    const { image , status } = req.body;
    if(!id){
        return next(new AppError('Please provide payment request id in params.' , 400));
    }
    if(!image || !status){
        return next(new AppError('Missing required credentials.' , 400))
    }
    const { fileName } = uploadImage(image , 'paymentProofs');
    const updateRequest = await WithdrawRequest.findByIdAndUpdate(id , {
        attachement : fileName , status
    } , { new : true , runValidators : true });

    return sendSuccessResponse(res , 200 , {
        request : updateRequest
    })

});