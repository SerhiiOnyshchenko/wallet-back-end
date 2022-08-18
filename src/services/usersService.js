const User = require("../db/userModel");

const getUsers = async () => {
  const users = await User.find({}, { firstName: 1, lastName: 1 });
  return users;
};

const addUser = async ({ firstName, lastName }) => {
  const user = new User({ firstName, lastName });
  await user.save();
  return user;
};

module.exports = {
  getUsers,
  addUser,
};
