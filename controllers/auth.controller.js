const User = require("../models/user.model");
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

module.exports = {
  register,
};
