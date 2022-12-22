const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const AdminProfit = require('../../models/adminProfitModel');
const { sendSuccessResponse } = require('../../utils/helpers');

exports.createAdminProfit = catchAsync( async ( req , res , next ) => {
    const { profit } = req.body;
    const profitExist = await AdminProfit.find();
    if(profitExist.length > 0){
        return next(new AppError('Profit already exist.You cannot create more tha one profit. but you can change it as you want.', 400))
    }
    const newProfit = await AdminProfit.create({  profit });
    return sendSuccessResponse(res , 201 , {
        profit : newProfit
    }) 
});

exports.getAdminProfit = catchAsync( async ( req , res ) => { 
    const profit = await AdminProfit.find();
    return sendSuccessResponse(res , 200 , { profit : profit[0] });
});

exports.updateAdminProfit = catchAsync( async ( req , res ) => { 
    let profit = await AdminProfit.find();
    profit = profit[0];
    if(!profit){
        const newProfit = await AdminProfit.create({  profit });
        return sendSuccessResponse(res , 201 , {
            profit : newProfit
        });
    }
    const updatedProfit = await AdminProfit.findByIdAndUpdate(profit?._id , { profit : req.body.profit } , { 
        new : true , runValidators : true 
    });
    return sendSuccessResponse(res , 200 , { profit : updatedProfit , message : 'Profit updated successfully.' })
});