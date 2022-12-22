const path = require('path');
var base64ToImage = require('base64-to-image');
const fs = require('fs');
const jwt = require('jsonwebtoken');


exports.sendSuccessResponse = ( res , statusCode = 200 , data ) => {
    res.status(statusCode).json({
        status : 'success' ,
        success : true ,
        data 
    })
}

exports.sendErrorResponse = ( res , statusCode = 400 , data ) => {
    res.status(statusCode).json({
        status : 'error' ,
        success : false ,
        data 
    })
}

exports.uploadImage = ( string , directory ) => {
    var base64Str = string ;
    var uploadPath = directory ? path.join(__dirname , `../uploads/${directory}/`) : path.join(__dirname  , '../uploads/');
    const imageName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    var optionalObj = {'fileName': imageName , 'type':'jpg'};
    return base64ToImage(base64Str , uploadPath , optionalObj); 
}


exports.generateToken = (name , email) => {
    const token = customId({
        name , 
        email , 
    }).slice(0,6);
    return token;
}


exports.signToken = (payload) => {
    return jwt.sign( payload , process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRES
    })
};

exports.sendCookie = (res , token) => {
    let cookieOptions =  {
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly : true
    }
    if(process.env.NODE_ENV === "production") cookieOptions.secure = true ;
    return res.cookie('token' , token  , cookieOptions  );
}

