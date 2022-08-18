const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    typeTransaction: Boolean,
    sum: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      default: function () {
        if (this.typeTransaction) {
          return "Поповнення";
        }
        return "Списання";
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const Wallet = mongoose.model("transactions", TransactionSchema);

module.exports = Wallet;
