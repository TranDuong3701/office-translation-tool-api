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

module.exports = {
  register,
  login,
};
