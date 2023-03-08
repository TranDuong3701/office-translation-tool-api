const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const AppError = require("./../utils/AppError");
const catchAsync = require("./../utils/catchAsync");

const register = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.create({
    email,
    password,
  });
  const token = user.signToken();

  res.status(201).json({ token });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Invalid email or password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
    return next(new AppError("Password not match!", 400));
  }

  const token = user.signToken();
  res.status(200).json({ token });
});

const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

const getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json(user);
});

module.exports = {
  getMe,
  protect,
  register,
  login,
};
