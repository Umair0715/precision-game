const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Product = require('../../models/productModel');
const { sendSuccessResponse } = require('../../utils/helpers');

const getQuery = (req) => {
    return req.query.keyword && req.query.type ? {
        title : {
            $regex : req.query.keyword ,
            $options : 'i'
        } , 
        type : Number(req.query.type) 
    } 
    : req.query.keyword ? {
        title : {
            $regex : req.query.keyword ,
            $options : 'i'
        }
    } : Number(req.query.type) ? {
        type : Number(req.query.type) 
    } : {};
}

exports.getAllProducts = catchAsync( async ( req , res , next ) => {
    const pageSize = 9;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = getQuery(req);
 
    const docCount = await Product.countDocuments({ ...keyword , isActive : true });
    const products = await Product.find({ ...keyword , isActive : true })
    .limit(pageSize)
    .sort({ createdAt : '-1'})
    .skip(pageSize * ( page - 1 ))
    .populate('seller' , 'name email role'); 
    const pages = Math.ceil( docCount / pageSize); //e.g:42/5=4.2=Math.ceil(4.2)=5

    return sendSuccessResponse(res , 200 , {
        products , pages , currentPage : page , productsCount : docCount 
    })
});