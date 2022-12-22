const catchAsync = require('../utils/catchAsync');
const express = require('express');
const AppError = require('../utils/appError');
const stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET);
const { sendSuccessResponse } = require('../utils/helpers');
const Order= require('../models/orderModel');
const Wallet = require('../models/walletModel');
const User = require('../models/userModel');
const AdminProfit = require('../models/adminProfitModel');
const Transaction = require('../models/transactionModel');
const Subscription = require('../models/subscriptionModel');
const moment = require('moment');

exports.createCheckoutSession = catchAsync(async (req, res) => {
    const { orderItem , userId } = req.body;
    const customer = await stripe.customers.create({
        metadata : { 
            userId  ,
            cart : JSON.stringify(orderItem)
        }
    })
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: orderItem.title,
                        metadata : {
                            id : orderItem._id 
                        }
                    },
                    unit_amount: orderItem.price * 100,
                },
                quantity: 1,
            },
        ],
        customer : customer.id,
        mode: 'payment',
        success_url: 'https://game.shopziaa.com/checkout-success',
        cancel_url: 'https://game.shopziaa.com/checkout-cancel',
    });
 
    return sendSuccessResponse(res , 200 , { url : session.url });
});
  

exports.createSubscriptionCheckoutSession = catchAsync( async( req , res , next) => {
    const { package , userId } = req.body;
    const customer = await stripe.customers.create({
        metadata : { 
            isSubscription : true ,
            userId  ,
            packageData : JSON.stringify(package)
        }
    })
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: package.name,
                        metadata : {
                            id : package._id 
                        }
                    },
                    unit_amount: package.price * 100,
                },
                quantity: 1,
            },
        ],
        customer : customer.id,
        mode: 'payment',
        success_url: 'https://game.shopziaa.com/checkout-success',
        cancel_url: 'https://game.shopziaa.com/checkout-cancel',
    });
 
    return sendSuccessResponse(res , 200 , { url : session.url });
})


const createOrder = async (customer , data) => {
    const orderItem = JSON.parse(customer.metadata.cart);

    try {
        let productPrice = Number(orderItem.price);
        const buyerSubscription = await Subscription.findOne({ user : customer.metadata.userId , isActive : true , endDate : { $gt : Date.now() }})
        .populate('package');
        if(buyerSubscription){
            let packageDiscount = ( productPrice / 100 ) * buyerSubscription.package.packageDiscount;
            productPrice -= packageDiscount ;
        }

        const newOrder = await Order.create({
            user : customer.metadata.userId ,
            orderItem : orderItem._id ,
            amount : productPrice ,
            productType : orderItem.type , 
            seller : orderItem.seller._id ,
            isPaid : true 
        });
        //Adding payment to wallets 
        const sellerWallet = await Wallet.findOne({ user : orderItem.seller._id , isActive : true });
        const admin = await User.findOne({ role : 3 });
        const adminWallet = await Wallet.findOne({ user : admin._id });
        let adminProfit = await AdminProfit.find();
        adminProfit = adminProfit[0];

        
        let adminEarning = (productPrice / 100 ) * adminProfit.profit;
        let sellerEarning  = productPrice - adminEarning;
        
        adminWallet.totalBalance += adminEarning;
        adminWallet.earning += adminEarning;
        await adminWallet.save();
        sellerWallet.totalBalance += sellerEarning;
        sellerWallet.earning += sellerEarning;
        await sellerWallet.save();

        //buyer transaction
        await Transaction.create({
            user : customer.metadata.userId ,
            amount : productPrice.toFixed(2) ,
            transactionItem : orderItem._id ,
            transactionType : 1 , 
            description : 'Pay by card' , 
            transactionBy : customer.metadata.userId
        });
        //seller transaction
        await Transaction.create({
            user : orderItem.seller._id ,
            amount : sellerEarning.toFixed(2) ,
            transactionItem : orderItem._id ,
            transactionType : 2 , 
            description : 'Added To Wallet', 
            transactionBy : customer.metadata.userId
        });
        // admin transaction
        await Transaction.create({
            user : admin._id ,
            amount : adminEarning.toFixed(2) ,
            transactionItem : orderItem._id ,
            transactionType : 2 , 
            description : 'Added To Wallet',
            transactionBy : customer.metadata.userId
        });


    } catch (error) {
        console.log('new Order error' , error);
    }
}

const endDate = (value , name) => {
    return moment().add(value , name).toDate();
}

const createSubscription = async ( customer , data ) => {
    const package = JSON.parse(customer.metadata.packageData);
    const userId = customer.metadata.userId;
    const subscriptionExist = await Subscription.findOne({ user : userId , endDate : { $gt : Date.now() }});
    if(subscriptionExist){
        if(subscriptionExist.package.toString() === package._id.toString()){
            //subscriptoin already exist
            return;
        }else {
            //plan updated
            await Subscription.findByIdAndUpdate(subscriptionExist._id , {
                package ,
                endDate : package.duration === 1 ? endDate(7 , 'weeks') : package.duration === 2 ? endDate(1, 'month') : package.duration === 3 ? endDate(6 , 'month') : package.duration === 4 ? endDate(1 , 'year')
                : endDate(1 , 'month') ,
            })
        }
        return ;
    }
    return await Subscription.create({
        user : userId , 
        endDate : package.duration === 1 ? endDate(7 , 'weeks') : package.duration === 2 ? endDate(1, 'month') : package.duration === 3 ? endDate(6 , 'month') : package.duration === 4 ? endDate(1 , 'year')
        : endDate(1 , 'month') ,
        package : package._id 
    }) 
};

//WEBHOOK
let endpointSecret;

endpointSecret= "whsec_a9e20b658eca72f3fc7cf0594f4825024f12a462466651acb176d971e4ad1235";

exports.webhook = async(req, res) => {
    const sig = req.headers['stripe-signature'];
    let data;
    let eventType;
    if(endpointSecret){
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            console.log('Webhook verified');
        } catch (err) {
            console.log('Webhook error' , err.message);
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        data = event.data.object;
        eventType = event.type;
    }else {
        data = req.body.data.object;
        eventType = req.body.type;

    }
    // Handle the event
    if(eventType === "checkout.session.completed"){
        stripe.customers.retrieve(data.customer).then(customer => {
            console.log('customer' , customer)
            console.log('data' ,data);
            if(customer.metadata.isSubscription){
                createSubscription(customer, data)
            }else{
                createOrder(customer , data);
            }
        }).catch(err => console.log(err))
    }
    res.send().end();
};


