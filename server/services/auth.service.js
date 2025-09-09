const { APP_SECRET, RESET_SECRET } = require('../config');
const { UserModel } = require('../database/models');
const { GenerateJWT, GenerateSalt, HashPassword, ValidateHashedPassword, ValidateJWT } = require('../utils');
const { sendEmail } = require('./email.service');

const register = async ({ name, email, password }) => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  const salt = await GenerateSalt();
  const hashedPassword = await HashPassword(password, salt);

  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  };
};

const login = async ({ email, password }) => {
  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    throw new Error('User with this email does not exist');
  }

  const validPass = await ValidateHashedPassword(password, existingUser.password);
  if (!validPass) {
    throw new Error('Invalid password');
  }

  const token = await GenerateJWT({
    id: existingUser.id,
    subscriptionPlanName: existingUser.subscriptionPlanName,
  }, APP_SECRET, "30d");

  return { user: existingUser, token };
};

const emailExist = async (email) => {
  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    throw new Error('User with this email does not exist');
  }
  return existingUser;
}

const sendResetLink = async (email) => {
  const token = await GenerateJWT({ email }, RESET_SECRET, "15m");
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;
  const response = await sendEmail(
    "OutreachIQ Password Reset Instruction",
    `Hello,\nFollow this link below to reset your password ${resetLink}.\nIf you did not request for password request, you can ignore this email.\nRegards,\nTeam OutreachIQ`,
    email
  );
  if (!response) throw new Error("Could not send reset link");
  return response;
}

const resetUserPassword = async (newPassword, token) => {
  const { valid, payload } = await ValidateJWT(token, RESET_SECRET);
  if (!valid) throw new Error("Invalid credentials");

  const email = payload.email;
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  // prevent reuse 
  if (user.passwordChangedAt && payload.iat * 1000 < user.passwordChangedAt.getTime()) {
    throw new Error("Token already used or expired");
  }
  const salt = await GenerateSalt();
  const hashedPassword = await HashPassword(newPassword, salt);
  user.password = hashedPassword;
  user.passwordChangedAt = new Date();
  await user.save();
  return user;
}

module.exports = {
  register,
  login,
  emailExist,
  sendResetLink,
  resetUserPassword
};
