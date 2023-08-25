const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
    
    const users = await User.find();
        //Tour.findOne({_id:req.params.id});
    res.status(200).json({
        status: "success",
        results:users.length,
        data: {
                users
            }
        });
});

exports.getUser = catchAsync(async(req, res,next)=> {
    //console.log("Giving all tours "+ req.requestTime);
    const user = await User.findById(req.params.id);
    res.status(500).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.createUser = (req, res) => {
    //console.log("Giving all tours "+ req.requestTime);
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined!'
    });
};

exports.updateUser = (req, res) => {
    //console.log("Giving all tours "+ req.requestTime);
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined!'
    });
};
exports.deleteUser = (req, res) => {
    //console.log("Giving all tours "+ req.requestTime);
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defined!'
    });
};
