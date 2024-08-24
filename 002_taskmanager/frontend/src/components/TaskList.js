import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import './TaskList.css';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const splitTasksIntoRows = (tasks, columns = 1) => {
    const rows = [];
    for (let i = 0; i < tasks.length; i += columns) {
      rows.push(tasks.slice(i, i + columns));
    }
    return rows;
  };

  const taskRows = splitTasksIntoRows(tasks);

  return (
    <div className="task-list-container">
      <div className="task-form-container">
        <TaskForm handleAddTask={handleAddTask} fetchTasks={fetchTasks} />
      </div>
      <div className="task-items-container">
        {taskRows.map((row, index) => (
          <div className="task-items-row" key={index}>
            {row.map(task => (
              <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
            ))}
          </div>
        ))}



      </div>
    </div>
  );
};

export default TaskList;