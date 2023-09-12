const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const signToken = (id, role, name) => {
  return jwt.sign({ id, role, name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  //console.log("Hit the signup API");
  const newUser = await User.create({
    name: req.body.name.toLowerCase(),
    password: req.body.password,
    passwordConfirm: req.body.reenter_password,
    role: "user",
  });

  const token = jwt.sign(
    { id: newUser._id, role: newUser.role, name: newUser.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  //console.log("signing up..");
  res.status(201).json({
    stauts: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  //console.log("Login API hit at the Auth server");
  const { name, password } = req.body;

  // 1) check if email and passwd exist
  if (!name || !password) {
    return next(new AppError("Please provide name and password!", 400));
  }

  //check if user exists and pswd is correct

  const user = await User.findOne({ name: name }).select("+password");

  //console.log(password, user.password, user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect name or password", 401));
  }

  //if everything is ok, send token to client

  const token = signToken(user._id, user.role, user.name);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) Get token and chk if it is there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //console.log("token is ", token);

  if (!token) {
    return next(new AppError("Login toget access", 401));
  }

  //2) Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //console.log(decoded.name,decoded.role);
  if (!decoded) {
    return next(new AppError("Invalid User", 401));
  }
  //3) Check if user still exists
  const user = await User.findOne({ name: decoded.name });

  if (!user) {
    return next(new AppError("User not found ", 401));
  }

  next();
});
