const { default: fetch, Headers } = require("node-fetch");
const User = require("../db/userModel");
const Wallet = require("../db/walletModel");
const { UserNotFoundError, DebitBalansError } = require("../helpers/errors");

const getUserBalans = async (id, currency) => {
  const users = await User.findById(id, { balans: 1, _id: 0 });
  if (!users) {
    throw new UserNotFoundError("Users not found");
  }
  let balans = users.balans;
  const myHeaders = new Headers();
  myHeaders.append("apikey", "K7Ypu07GJJCN6vbQ91ZFQJPytOWh3yG9");

  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  const response = await fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=USD&from=${currency}&amount=${users.balans}`,
    requestOptions
  );
  const data = await response.json();
  balans = data.result;
  return balans;
};

const getTransactions = async (owner, { skip, limit, sort }) => {
  let sortBy = { createdAt: -1 };
  if (sort === "sum") {
    sortBy = { sum: 1 };
  }
  if (sort === "sum-") {
    sortBy = { sum: -1 };
  }

  if (sort === "date") {
    sortBy = { createdAt: 1 };
  }
  if (sort === "date-") {
    sortBy = { createdAt: -1 };
  }

  const transactions = await Wallet.find(
    { owner },
    { sum: 1, description: 1, category: 1, recipient: 1, createdAt: 1, _id: 0 }
  )
    .sort(sortBy)
    .skip(skip)
    .limit(limit);
  return transactions;
};

const postTransaction = async (body) => {
  const { typeTransaction, sum, owner } = body;
  const user = await User.findById(owner);
  if (!user) {
    throw new UserNotFoundError("Users not found");
  }
  if (!user.balans) {
    user.balans = 0;
  }
  if (typeTransaction) {
    user.balans += sum;
  } else {
    if (user.balans - sum < 0) {
      throw new DebitBalansError("You do not have enough money on your balans");
    }
    user.balans -= sum;
  }
  await user.save();
  const newTransaction = await Wallet.create({ ...body });
  return newTransaction;
};

const postTransfer = async (body) => {
  const { sum, owner, recipient } = body;

  const sender = await User.findById(owner);
  if (!sender) {
    throw new UserNotFoundError("Sender not found");
  }

  const receiver = await User.findById(recipient);
  if (!receiver) {
    throw new UserNotFoundError("Recipient not found");
  }

  if (!sender.balans) {
    sender.balans = 0;
  }

  if (sender.balans - sum < 0) {
    throw new DebitBalansError("You do not have enough money on your balans");
  }
  sender.balans -= sum;
  await sender.save();

  if (!receiver.balans) {
    receiver.balans = 0;
  }
  receiver.balans += sum;
  await receiver.save();

  const newTransaction = await Wallet.create({
    ...body,
    category: "Переказ коштів",
  });
  return newTransaction;
};

module.exports = {
  getUserBalans,
  postTransaction,
  postTransfer,
  getTransactions,
};
