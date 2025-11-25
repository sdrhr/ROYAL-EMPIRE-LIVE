const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, required: true },   // deposit, withdraw, package-buy
    amount: { type: Number, required: true },
    status: { type: String, default: "success" },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transactions", transactionSchema);
