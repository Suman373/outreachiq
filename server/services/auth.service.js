const { UserModel } = require('../database/models');
const { GenerateJWT, GenerateSalt, HashPassword, ValidateHashedPassword } = require('../utils');

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
  });

  return { user: existingUser, token };
};

module.exports = { register, login };
