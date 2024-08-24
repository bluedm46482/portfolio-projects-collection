const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Create a task
router.post('/', async (req, res) => {
    try {
      const newTask = new Task(req.body);
      const savedTask = await newTask.save();
      res.json(savedTask); // Ensure this response is sent back
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  });

// Update a task
router.put('/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

// Delete a task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
