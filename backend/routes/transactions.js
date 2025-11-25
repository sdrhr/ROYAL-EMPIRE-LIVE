const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transactions');
const jwt = require('jsonwebtoken');

// 🔐 Middleware to verify login token
function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

// ⭐ GET: Fetch transaction history
router.get('/history', verifyToken, async (req, res) => {
    try {
        const transactions = await Transactions.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

// ⭐ POST: Record new transaction
router.post('/add', verifyToken, async (req, res) => {
    try {
        const { type, amount, status } = req.body;

        const tx = new Transaction({
            userId: req.user.id,
            type,
            amount,
            status
        });

        await tx.save();
        res.json({ message: "Transaction saved", tx });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
