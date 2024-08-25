const mongoose = require('mongoose');
const Transaction = require('./models/Transaction'); // Update with the correct path to your model

mongoose.connect('mongodb://localhost:27017/Personal-Finance-Tracker', { useNewUrlParser: true, useUnifiedTopology: true });

const migrateData = async () => {
  try {
    const transactions = await Transaction.find({ date: { $exists: false } });

    for (const transaction of transactions) {
      transaction.date = '1970-01-01'; // Set default date
      transaction.time = '00:00'; // Set default time
      await transaction.save();
    }

    console.log('Data migration completed.');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error during migration:', err);
    mongoose.disconnect();
  }
};

migrateData();
