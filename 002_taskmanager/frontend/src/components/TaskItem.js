
import React from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskItem = ({ task, fetchTasks }) => {
  const { completed } = task;

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/tasks/${task._id}`);
    fetchTasks(); // Refresh the task list after deletion
  };

  const handleToggleComplete = async () => {
    await axios.put(`http://localhost:5000/tasks/${task._id}`, {
      completed: !task.completed
    });
    fetchTasks(); // Refresh the task list after updating the task
  };

  return (
    <div className={`task-item ${completed ? 'task-completed' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-item-actions">
        <button 
          className="complete-btn"
          onClick={handleToggleComplete}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button 
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;