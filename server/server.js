const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./utils/db');
const globalErrorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan');
const path = require('path');



connectDB();

app.use("/api/stripe/webhook", express.raw({ type: "*/*" }))
app.use(express.json({ limit : '5mb'}));
app.use(express.static(__dirname + '/uploads'))
// app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended : true }));
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));



app.use('/api/auth' , require('./routes/authRoutes'));
app.use('/api/product' , require('./routes/productRoutes'));
app.use('/api/payment' , require('./routes/paymentRoutes'));
app.use('/api/order' , require('./routes/orderRoutes'));
app.use('/api/chat' , require('./routes/chatRoutes'));
app.use('/api/user' , require('./routes/userRoutes'));
app.use('/api/message' , require('./routes/messageRoutes'));
app.use('/api/stripe' , require('./routes/stripeRoutes'));
app.use('/api/wallet' , require('./routes/walletRoutes'));
app.use('/api/transaction' , require('./routes/transactionRoutes'));
app.use('/api/subscription' , require('./routes/subscriptionRoutes'));
app.use('/api/withdraw' , require('./routes/withdrawRequestRoutes'));
app.use('/api' , require('./routes/productRoutes'))
app.use('/api/game' , require('./routes/gamesRoutes'))

//admin Routes 
app.use('/api/admin/dashboard' , require('./routes/admin/dashboardRoutes'));
app.use('/api/admin/product' , require('./routes/admin/productRoutes'));
app.use('/api/admin/order' , require('./routes/admin/orderRoutes'))
app.use('/api/admin' , require('./routes/admin/userRoutes'));
app.use('/api/adminProfit'  , require('./routes/admin/adminProfitRoutes'));
app.use('/api/admin/package' , require('./routes/admin/packageRoutes'));



app.use(express.static(path.join(__dirname , '../client/build')));

app.get('*' , (req ,res) => {
  res.sendFile(path.resolve(__dirname , '../client/build/index.html'));
})

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT , () => console.log(`Server is listening on port ${PORT}`));

const io = require('socket.io')(server , {
    cors : {
        origin : '*'
    }
});

io.on('connection' , (socket) => {

    socket.on('setup' , (userData) => {
        socket.join(userData?._id);
        socket.emit('connected');
    });

    socket.on('join chat' , (room) => {
        socket.join(room);
    });

    socket.on('typing' , (room) => socket.in(room).emit('typing'));
    socket.on('stop typing' , (room) => socket.in(room).emit('stop typing'));

    socket.on('new message' , (newMessage) => {
        const chat = newMessage.chat;
        if(!chat.users) return console.log('users not found in chat');

        chat.users.forEach(user => {
            if(user._id === newMessage.sender._id) return;
            socket.in(user._id).emit('message recieved' , newMessage);
        })
    })
});