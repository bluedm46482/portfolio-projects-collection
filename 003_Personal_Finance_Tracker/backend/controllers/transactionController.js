const Transaction = require('../models/Transaction');

// Get all transactions for a user
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new transaction
const addTransaction = async (req, res) => {
  const { type, amount, category } = req.body;
  try {
    const transaction = new Transaction({
      userId: req.user.id,
      type,
      amount,
      category,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

    await transaction.remove();
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getTransactions, addTransaction, deleteTransaction };
