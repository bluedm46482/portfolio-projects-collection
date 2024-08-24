import React, { useState } from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskForm = ({ handleAddTask, fetchTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/tasks', { title, description });
      setTitle('');
      setDescription('');
      if (typeof handleAddTask === 'function') {
        handleAddTask(response.data); // Call the passed function to update task list
      } else {
        console.error("handleAddTask is not a function");
      }
      if (typeof fetchTasks === 'function') {
        fetchTasks(); // Optionally re-fetch tasks
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      ></textarea>
      <button type="btnsubmit">Add Task</button>
    </form>
  );
};

export default TaskForm;


/*
import React, { useState } from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskForm = ({ handleAddTask, fetchTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log the values to ensure they are being captured correctly
    console.log("Title:", title);
    console.log("Description:", description);
  
    try {
      const response = await axios.post('http://localhost:5000/tasks', { title, description });
      fetchTasks(); // Refresh the task list after submission
      setTitle(''); // Clear the form fields
      setDescription('');
      if (typeof handleAddTask === 'function') {
        handleAddTask(response.data); // Update task list with new task
      } else {
        console.error("handleAddTask is not a function");
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      ></textarea>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
*/