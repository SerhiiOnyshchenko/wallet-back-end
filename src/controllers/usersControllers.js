const { getUsers, addUser } = require("../services/usersService");

const getUsersController = async (req, res) => {
  const users = await getUsers();
  res.json({ users, status: "success" });
};

const addUsersController = async (req, res) => {
  const { firstName, lastName } = req.body;
  const user = await addUser({ firstName, lastName });
  res.json({ user, status: "success" });
};

module.exports = {
  getUsersController,
  addUsersController,
};
