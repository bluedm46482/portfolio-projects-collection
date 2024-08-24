import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      console.log("Tasks fetched:", response.data); // Log to confirm data is fetched
      setTasks(response.data); // Update state with fetched tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch tasks on initial render
  useEffect(() => {
    fetchTasks(); // Fetch tasks on initial load
  }, []);

  return (
    <div>
      <div className='task-main'>
        <h1>Task Manager</h1>
      </div>
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
};

export default App;