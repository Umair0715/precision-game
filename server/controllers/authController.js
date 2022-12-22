const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const { sendErrorResponse , sendSuccessResponse , signToken , sendCookie } = require('../utils/helpers');
const { sendEmail } = require('../utils/email');
const jwt = require('jsonwebtoken');
const Wallet = require('../models/walletModel');


exports.register = catchAsync( async( req , res , next) => {
    const { name , email , password , role } = req.body;
    if(!name || !email || !password || role === null){
        return next(new AppError('Missing required credentials.', 400))
    } 
    const userExist = await User.findOne({ email , isActive : true });
    if(userExist){
        return next(new AppError('Email is already taken.' , 400))
    }
    const newUser = await User.create({ 
        name , email , password , role
    });
    if(newUser.role !== 1){
        await Wallet.create({ user : newUser?._id });
    }
    const token = signToken({ _id : newUser._id })
    sendCookie(res , token);
    return sendSuccessResponse(res , 201 , {
        user : newUser ,
        token 
    })
});


exports.login = catchAsync(async( req , res , next) => {
    const { email , password } = req.body;
    if(!email || !password){
        return next(new AppError('Please provide email and password.' , 400))
    }
    const user = await User.findOne({ email , isActive : true });
    if(!user || !await user.comparePassword(password)){
        return next(new AppError('Wrong email or password.' , 400))
    }
    const token = signToken({ _id : user._id });
    sendCookie(res , token);
    return sendSuccessResponse(res , 200 , {
        user , token 
    })
});

exports.forgotPassword = catchAsync( async( req , res , next) => {
    const { email } = req.body;
    if(!email){
        return next(new AppError('Please provide your email.' , 400))
    }
    const user = await User.findOne({ email });
    if(!user){
        return next(new AppError('This email is not registered.' , 400))
    }
    try {
        
        const token = signToken({ _id : user._id });
        user.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000;
        await user.save();
        const resetURL = `${req.protocol}://${req.get('host')}/home/${token}`;
        // const resetURL = `http://localhost:3000/home/${token}`
        await sendEmail(email , 'Forgot Password Request' , `
            <p>Click on the link below to reset your password.</p>
            <a href='${resetURL}'>RESET</a>
        `) 
        return sendSuccessResponse(res , 200 , {
            message : `Please check your email address to reset your password.`
        })
    } catch (error) {
        user.passwordResetTokenExpire = undefined ;
        await user.save();
        return sendErrorResponse(res , 500 , {
            message : 'Internal server error.'
        })
    }
});


exports.resetPassword = catchAsync(async( req , res , next ) => {
    const { token } = req.params;
    const { newPassword , confirmPassword } = req.body;
    if(!token){
        return next(new AppError('Invalid request.Token not found.', 400))
    }
    if(!newPassword || !confirmPassword){
        return next(new AppError('Please provide both password and confirm password.' , 400))
    }
    if(newPassword !== confirmPassword){
        return next(new AppError('Passwords are not matched.' , 400))
    }
    const { _id } = jwt.verify(token , process.env.JWT_SECRET);
    const user = await User.findOne({ 
        _id , passwordResetTokenExpire : { $gt : Date.now() }
    });
    if(!user){
        return next(new AppError('Password reset token has been expired.Please try again with new token.' , 400))
    }
    user.password = newPassword;
    user.passwordResetTokenExpire = undefined;
    user.passwordResetToken = undefined;
    await user.save();

    return sendSuccessResponse(res , 200 , { 
        message : 'Password changed successfully.'
    });
});


exports.logout = catchAsync( async( req , res , next) => {
    res.cookie('token' , 'loggedOut' , {
        expires : new Date(Date.now() + 10 * 1000), 
        httpOnly : true 
    });
    sendSuccessResponse(res , 200 , { 
        message : 'LoggedOut successfully.'
    })
});


exports.updatePassword = catchAsync(async(req ,res ,next) => {
    const { oldPassword , newPassword , confirmPassword } = req.body;
    if(newPassword !== confirmPassword){
        return next(new AppError('Passwords are not matched.' , 400))
    }
    const user = await User.findById(req.user._id);
    if(!(await user.comparePassword(oldPassword))){
        return next(new AppError('Incorrect old password.' , 400))
    }
    user.password = newPassword;
    await user.save();
    return sendSuccessResponse(res , 200 , {
        message : 'Password updated successfully.'
    })
})