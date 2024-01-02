const model = require("../../models/auth/user");
const dal = require("../../dal/dal");
const bcrypt = require("bcryptjs");
const { getAccessToken, generateUsername } = require("../../helpers/helper");
require("dotenv").config();

exports.findOne = async (filter) => {
  return await dal.findOne(model, filter, {});
};

exports.addUser = async (value) => {
  let token;
  value.password = await bcrypt.hash(value.password, 10);
  let count;
  if (value.email) {
    count = await dal.find(
      model,
      { email: value.email },
      { limit: 1 },
      { email: 1 }
    );
    if (count.length > 0) {
      return {
        userData: null,
        token: null,
        message: "User Already exist with this email",
      };
    }
  }
  if (value.userName) {
    count = await dal.find(
      model,
      { userName: value.userName },
      { limit: 1 },
      { userName: 1 }
    );
    if (count.length > 0) {
      return {
        userData: null,
        token: null,
        message: "User Already exist with this User Name",
      };
    }
  }

  const data = await dal.create(model, value);
  const body = {
    id: data._id,
    userName: data.userName,
    name: data.nama,
    email: data?.email || null,
  };
  token = getAccessToken(body);

  return {
    userData: body,
    token: token,
  };
};

exports.login = async (value) => {
  let token;
  const projections = {
    email: 1,
    name: 1,
    userName: 1,
    password: 1,
  };
  let user;

  if (value.email) {
    user = await dal.findOne(model, { email: value.email }, projections);
    if (!user) {
      user = await dal.findOne(model, { userName: value.email }, projections);
    }
  }

  if (!user) {
    return { userData: null, token: null };
  }
  if (value.password) {
    const result = await bcrypt.compare(value.password, user.password);
    if (!result)
      return {
        userData: null,
        token: null,
        message: "Please double check the credentials",
      };
  }
  const userData = {
    id: user._id,
    userName: user?.userName,
    email: user?.email,
    name: user?.name,
  };

  token = getAccessToken(userData);

  return {
    userData,
    token: token,
  };
};

exports.logout = async (filter) => {
  // const data = await dal.findOneAndDelete(refreshTokenModel, filter)
  // if (!data) return { message: "Already Logout", status: 400 }
  return { message: "Logout successful", status: 200 };
};
