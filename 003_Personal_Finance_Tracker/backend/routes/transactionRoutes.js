const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get all transactions
router.get('/', async (req, res) => {
  const { type, category, startDate, endDate } = req.query;
  let filter = {};

  if (type) filter.type = type;

  // Apply regex filtering for the category
  if (category) {
    filter.category = { $regex: category, $options: 'i' }; // 'i' makes the regex case-insensitive
  }

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  try {
    const transactions = await Transaction.find(filter);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching transactions' });
  }
});

// Create a new transaction
router.post('/', async (req, res) => {
  const { type, amount, category, date, time } = req.body;

  // Convert date and time to correct format
  const formattedDate = new Date(date);
  const formattedTime = new Date(`1970-01-01T${time}:00.000Z`).toTimeString().slice(0, 5);

  const transaction = new Transaction({
    type,
    amount,
    category,
    date: formattedDate,
    time: formattedTime
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Edit transaction
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { type, amount, category, date, time } = req.body;

  // Convert date and time to correct format
  const formattedDate = new Date(date);
  const formattedTime = new Date(`1970-01-01T${time}:00.000Z`).toTimeString().slice(0, 5);

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { type, amount, category, date: formattedDate, time: formattedTime },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction', error });
  }
});


// Delete transaction
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting transaction' });
  }
});

module.exports = router;


// OLD Edit transaction
/*
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Error updating transaction' });
  }
});
*/