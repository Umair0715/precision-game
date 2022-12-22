const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const User = require('../../models/userModel');
const { sendSuccessResponse } = require('../../utils/helpers');


exports.getAllBuyers = catchAsync(async(req ,res , next) => {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 6 ;
    
    const docCount = await User.countDocuments({ role : 1 , isActive : true });
    const buyers = await User.find({ role : 1 , isActive : true })
    .limit(pageSize).skip(page * (page -1 ))
    .sort({ 'createdAt' : '-1'})
    
    const pages = Math.ceil(docCount / pageSize);
    sendSuccessResponse(res , 200 , { 
        buyers , pages , currentPage : page ,
    })
});

exports.getAllSellers = catchAsync( async ( req , res ) => {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 6 ;
    
    const docCount = await User.countDocuments({ role : 2 , isActive : true });
    const sellers = await User.find({ role : 2 , isActive : true })
    .limit(pageSize).skip(page * (page -1 ))
    .sort({ 'createdAt' : '-1'})
    const pages = Math.ceil(docCount / pageSize);

    sendSuccessResponse(res , 200 , { 
        sellers , pages , currentPage : page ,
    })
});


exports.deleteUser = catchAsync( async ( req , res) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id , { isActive : false });
    return sendSuccessResponse(res , 200 , {
        message : 'User deleted successfully.'
    })
})