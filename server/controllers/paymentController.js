const paypal = require('paypal-rest-sdk');


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret':process.env.PAYPAL_CLIENT_SECRET
});


exports.createPayment = ( req , res , next ) => {
    const { amount , products } = req.body;
    // console.log(JSON.stringify(req.body.products))
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/payment-success",
            "cancel_url": "http://localhost:5000/payment-cancel"
        },
        "transactions": [{
            "item_list": {
                "items": products 
            },
            "amount": {
                "currency": "USD",
                "total": amount , 
            },
            "description": "This is the payment description."
        }]
    };
    console.log(create_payment_json);
    paypal.payment.create(create_payment_json,  (error, payment) => {
        if (error) {
            console.log(error);
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            for(let i=0 ;i<payment.links.length;i++){
                if(payment.links[i].rel=='approval_url')
                {
                    // res.redirect(payment.links[i].href);
                    return res.json({ link : payment.links[i].href , payment });
                }
            }
        }
    })
};

exports.paymentSuccess = ( req , res ) => {
    const { amount } = req.body;

    var execute_payment_json = {
        "payer_id": req.query.PayerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total" : amount //original order amount 
            }
        }]
    };
    var paymentId = req.query.paymentId;
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        }
        console.log('payment' ,payment);
        return res.status(200).json({
            payment 
        });
    });
};