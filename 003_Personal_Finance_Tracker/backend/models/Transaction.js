const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  date: {
    type: Date,
    default: Date.now,
  },
  time: { 
    type: String,
    default: Date.now,
    required: true }
});

module.exports = mongoose.model('Transaction', transactionSchema);
