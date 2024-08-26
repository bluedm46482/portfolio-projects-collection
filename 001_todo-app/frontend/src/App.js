import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.API_URL || (
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'http://jn-space.ddns.net'
);

console.log('API_URL:', API_URL);

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/api/todos`)
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error.response?.data || error.message));
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      axios.post(`${API_URL}/api/todos`, { text: newTodo })
        .then(response => {
          setTodos([...todos, response.data]);
          setNewTodo('');
        })
        .catch(error => console.error('Error adding todo:', error.response?.data || error.message));
    }
  };

  const handleToggleComplete = (id, completed) => {
    axios.put(`${API_URL}/api/todos/${id}`, { completed: !completed })
      .then(response => {
        setTodos(todos.map(todo => todo._id === id ? response.data : todo));
      })
      .catch(error => console.error('Error updating todo:', error.response?.data || error.message));
  };

  const handleDeleteTodo = (id) => {
    axios.delete(`${API_URL}/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(error => console.error('Error deleting todo:', error.response?.data || error.message));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="New To-Do"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo._id, todo.completed)}
            />
            {todo.text}
            <button className="delete" onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
