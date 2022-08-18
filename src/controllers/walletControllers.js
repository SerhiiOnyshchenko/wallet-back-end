const {
  getUserBalans,
  getTransactions,
  postTransaction,
  postTransfer,
} = require("../services/walletService");

const getBalansController = async (req, res) => {
  const { userId } = req.body;
  let { currency } = req.query;
  if (!currency || currency === " ") {
    currency = "USD";
  }
  const balans = await getUserBalans(userId, currency);
  res.json({ balans: balans || 0, currency, status: "success" });
};

const getTransactionsController = async (req, res) => {
  const { owner } = req.body;
  let { page = 1, limit = 20, sort } = req.query;
  limit = limit > 20 ? 20 : Number(limit);
  const skip = (page - 1) * limit;
  const transactions = await getTransactions(owner, { skip, limit, sort });
  res.json({ transactions, page, status: "success" });
};

const transactionController = async (req, res) => {
  const transaction = await postTransaction(req.body);
  res.status(201).json({ transaction, status: "success" });
};

const transferController = async (req, res) => {
  const transfer = await postTransfer(req.body);
  res.status(201).json({ transfer, status: "success" });
};

module.exports = {
  getBalansController,
  transactionController,
  transferController,
  getTransactionsController,
};
