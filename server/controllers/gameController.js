const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Game = require('../models/gamesModel');
const { sendSuccessResponse , uploadImage } = require('../utils/helpers');


exports.createGame = catchAsync( async( req , res , next) => {
    const { name , image , description } = req.body;
    if(!name || !image || !description){
        return next(new AppError('Missing required credentials.' , 400))
    }
    const { fileName } = uploadImage(image , 'games');
    const newGame = await Game.create({ name , description , image : fileName });
    return sendSuccessResponse(res , 200 , {
        message : 'Game created successfully.', 
        game : newGame 
    })
});

exports.getAllGames = catchAsync( async( req , res , next) => {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 9 ;
    const docCount = await Game.countDocuments({ isActive : true });
    const games = await Game.find({ isActive : true })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt  : '-1'})
    const pages = Math.ceil(docCount / pageSize);

    return sendSuccessResponse(res , 200 , {
        games , pages , page , docCount
    })
});


exports.getBuyerGames = catchAsync( async( req , res , next) => {
    const games = await Game.aggregate([
        { $match : { isActive : true } },
        {
            $sample : { size : 6 }
        }
    ]);
    return sendSuccessResponse(res , 200 , {
        games 
    })
})


exports.deleteGame = catchAsync( async( req , res , next) => {
    const { id } = req.params;
    if(!id){
        return next(new AppError('Game id is required.' , 400))
    }
    await Game.findByIdAndUpdate(id , { isActive : false });
    return sendSuccessResponse(res , 200 , {
        message : 'Game deleted successfully.'
    })
});