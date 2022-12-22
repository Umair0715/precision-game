const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Wallet = require('../models/walletModel');
const { sendSuccessResponse } = require('../utils/helpers');

exports.getMyWallet = catchAsync( async ( req , res ) => {
    const wallet = await Wallet.findOne({ user : req.user._id }).populate('user', 'name email role');
    return sendSuccessResponse(res , 200 , { wallet })
});