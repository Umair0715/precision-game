const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Product = require('../models/productModel');
const { sendSuccessResponse , uploadImage } = require('../utils/helpers');


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

exports.createProduct = catchAsync(async( req , res , next ) => {
    const { title , price , image , type , game } = req.body;
    const user = req.user;
    if(!title || !price || !image || !type || !game){
        return next(new AppError('Missing required credentials.' , 400))
    }
    if(user.role !== 2){
        return next(new AppError('Only seller can create product.' , 400))
    }
    const { fileName } = uploadImage(image , 'products');
    const newProduct = await Product.create({ 
        ...req.body , seller : user._id , image : fileName 
    });
    return sendSuccessResponse(res , 201 , {
        message : 'Product created successfully.' ,
        product : newProduct
    })
});

exports.updateProduct = catchAsync( async ( req , res , next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
       return next(new AppError('Product not fount.' , 404))
    }
    if(req.user.role !== 2 || product?.seller.toString() !== req.user._id.toString()){
        return next(new AppError('Only product owner can perform this action.' , 400))
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id , req.body ,{ 
       new : true , runValidators : true 
    }).populate('seller' , 'name email role');
 
    res.status(201).json({
       status : 'success' ,
       product : updatedProduct  
    })
 });
 
 
exports.getAllProducts = catchAsync( async ( req , res , next ) => {
    const pageSize = 9;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = getQuery(req);
 
    const docCount = await Product.countDocuments({ ...keyword , isActive : true });
    const products = await Product.find({ ...keyword , isActive : true })
    .limit(pageSize)
    .skip(pageSize * ( page - 1 ))
    .sort({ createdAt : '-1'})
    .populate('seller' , 'name email role'); 
    const pages = Math.ceil( docCount / pageSize); //e.g:42/5=4.2=Math.ceil(4.2)=5

    return sendSuccessResponse(res , 200 , {
        products , pages , currentPage : page , productsCount : docCount 
    })
});

exports.getSellerProducts = catchAsync( async ( req , res , next) => {
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = getQuery(req)
    const docCount = await Product.countDocuments(
        { ...keyword , isActive : true , seller : req.user._id }
    );
    const products = await Product.find({ ...keyword , isActive : true , seller : req.user._id })
    .limit(pageSize)
    .skip(pageSize * ( page - 1 ))
    .sort({ createdAt : '-1'})
    .populate('seller' , 'name email role');

    const pages = Math.ceil( docCount / pageSize); //e.g:42/5=4.2=Math.ceil(4.2)=5

    return sendSuccessResponse(res , 200 , {
        products , pages , currentPage : page , productsCount : docCount
    })
})
 

exports.getSingleProduct = catchAsync( async (req ,res , next) => {
    const product = await Product.findById(req.params.id)
    .populate('seller' , 'name email role');
    if(!product){
       return next(new AppError('Product not found' , 404))
    }
    return sendSuccessResponse(res , 200 , {
        product 
    })
})
 
exports.deleteProduct = catchAsync( async (req ,res , next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
       return next(new AppError('Product not found' , 404))
    }
    if(req.user.role !== 2 || product?.seller.toString() !== req.user._id.toString()){
        return next(new AppError('Only product owner can perform this action.' , 400))
    }
    await Product.findByIdAndUpdate(product._id , { isActive : false } )
    return sendSuccessResponse(res , 200 , {
        message : 'Product deleted successfully.'
    })
});
 
exports.getTopProducts = catchAsync( async ( req , res , next) => {
    const products = await Product.find().sort({ rating : -1 }).limit(4)
    res.status(200).json({
       status : 'success' ,
       products 
    })
});

function getRandomArbitrary(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}


exports.getRandomServices = catchAsync( async ( req , res , next ) => {
    let services = await Product.aggregate([
        { $match: { isActive : true , type : 2 } } , 
        { 
            $sample: { size : 4 } 
        } 
    ]);
    return sendSuccessResponse(res , 200 , {
        services 
    })
});