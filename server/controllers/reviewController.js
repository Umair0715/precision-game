const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Review = require('../models/reviewModel');
const { sendSuccessResponse } = require('../utils/helpers');


exports.createReview = catchAsync( async( req , res , next) => {
    const { comment , rating , seller } = req.body;
    if(!comment || !rating || !seller){
        return next(new AppError('Missing required credentials.' ,400))
    }
});