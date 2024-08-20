// models/todo.js

const mongoose = require('mongoose');

// Define the schema for a To-Do item
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
});

// Create the model using the schema
module.exports = mongoose.model('Todo', todoSchema);
