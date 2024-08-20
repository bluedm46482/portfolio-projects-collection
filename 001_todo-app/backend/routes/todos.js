const express = require('express');
const router = express.Router();
const Todo = require('../models/todo'); // Adjust the path if needed

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ deleted: false }); // Fetch only non-deleted todos
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Toggle todo completion
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Soft delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todo.deleted = true;
    await todo.save();
    res.json({ message: 'Todo marked as deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;