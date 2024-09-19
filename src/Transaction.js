const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true, enum: ['credit', 'debit'] },
  amount: { type: Number, required: true },
  description: { type: String, required: true }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
