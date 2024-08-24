
import React from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskItem = ({ task, fetchTasks }) => {
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
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
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

/*
  return (
    <div style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={handleToggleComplete}>
        {task.completed ? 'Undo' : 'Complete'}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
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
  );
};
*/

/*
import React from 'react';

const TaskItem = ({ task, fetchTasks }) => {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => alert(`Task ID: ${task._id}`)}>Check ID</button>
    </div>
  );
};

export default TaskItem;
*/