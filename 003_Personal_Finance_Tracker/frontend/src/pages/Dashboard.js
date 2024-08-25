import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Charts from '../components/charts';
import { formatDateAndTime, toUTCDateTime } from '../utils/dateUtils';
import './Dashboard.css';

function Dashboard() {
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today’s date
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5)); // Default to the current time in HH:MM format
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false); // Track if we're in edit mode
  const [editTransactionId, setEditTransactionId] = useState(null); // Track the ID of the transaction being edited

  // Filter states
  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  // Refs for focusing input fields
  const amountInputRef = useRef(null);

  const resetForm = () => {
    setDate(new Date().toISOString().split('T')[0]); // Reset to today’s date
    setTime(new Date().toTimeString().slice(0, 5)); // Reset to the current time
    setType('income');
    setAmount('');
    setCategory('');
    setEditMode(false);
    setEditTransactionId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log form data to check submission
    console.log('Form submission:', {
      date,
      time,
      type,
      amount,
      category,
      editMode,
      editTransactionId,
    });

    const combinedDateTime = toUTCDateTime(date, time);

    if (editMode) {
      // Update the transaction if in edit mode
      try {
        await axios.put(`http://localhost:5000/api/transactions/${editTransactionId}`, {
          date: combinedDateTime,
          time,
          type, 
          amount, 
          category
        });

        resetForm(); // Reset after updating
        fetchTransactions(); // Refresh transaction list
        fetchSummary(); // Refresh summary

        console.log('Transaction updated successfully');
      } catch (error) {
        console.error('Error updating transaction:', error);
      }
    } else {
      // Add a new transaction
      try {
        const res = await axios.post('http://localhost:5000/api/transactions', { 
          date: combinedDateTime,
          time,
          type, 
          amount, 
          category
        });

        // Reset after adding
        resetForm(); // Reset after updating

        handleAddTransactions(res.data);
        
        console.log('Transaction added successfully');
      } catch (error) {
        console.error('Error adding transaction:', error);
      }
    }
  };

  const fetchTransactions = useCallback ( async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/transactions', {
        params: {
          type: filterType,
          category: filterCategory,
          startDate: filterStartDate,
          endDate: filterEndDate
        }
      });

    // Debugging logs
    console.log('Fetched transactions:', res.data);

      setTransactions(res.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, [filterType, filterCategory, filterStartDate, filterEndDate]); // Dependencies for fetchTransactions; // Re-fetch when filters change

  const fetchSummary = useCallback ( async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/Summary');
      setSummary(res.data);
      setLoading(false);
    } catch (error) {
        setError('Error fetching financial summary');
        setLoading(false);
      console.error('Error fetching Summary', error);
    }
  },[]);

  useEffect(() => {
    // Define an async function to use within useEffect
    const fetchData = async () => {
      await fetchTransactions();
      await fetchSummary();
    };

    fetchData();
  }, [fetchTransactions, fetchSummary]); // Include fetchTransactions and fetchSummary

  // Debugging logs inside the component to ensure state update
  useEffect(() => {
    console.log('Transactions state:', transactions);
  }, [transactions]);
  
  if (loading) return <p>Loading summary...</p>;
  if (error) return <p>{error}</p>;
  
   const handleAddTransactions = () => {
     fetchTransactions(); // Refresh list after adding a new transaction
     fetchSummary();
   };

  const handleEdit = (transaction) => {
    // Extract date and time for the form fields
    const { localDate, localTime } = formatDateAndTime(transaction.date);


    setDate(localDate);
    setTime(localTime);
    setType(transaction.type);
    setAmount(transaction.amount);
    setCategory(transaction.category);
    setEditTransactionId(transaction._id); // Set the transaction to be edited
    setEditMode(true); // Enable edit mode
    amountInputRef.current.focus(); // Focus the amount input when the edit mode is activated
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      fetchTransactions(); // Refresh list after deletion
      fetchSummary(); // Update financial summary
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="summary-section">
        <h2>Financial Summary</h2>
        <p>Total Income: ${summary.totalIncome.toFixed(2)}</p>
        <p>Total Expense: ${summary.totalExpense.toFixed(2)}</p>
        <p>Balance: ${summary.balance.toFixed(2)}</p>
      </div>

      <div className="filter-section">
        <h3>Filters</h3>
          <div className="filter-form">
           <label>
             Type:
             <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
               <option value="">All</option>
               <option value="income">Income</option>
               <option value="expense">Expense</option>
             </select>
           </label>
           <label htmlFor="filter">
             Category:
             <input
               type="text"
               value={filterCategory}
               onChange={(e) => setFilterCategory(e.target.value)}
               placeholder="Search by category"
             />
           </label>
           <label htmlFor="filter">
             Start Date:
             <input
               type="date"
               value={filterStartDate}
               onChange={(e) => setFilterStartDate(e.target.value)}
             />
           </label>
           <label htmlFor="filter">
             End Date:
             <input
               type="date"
               value={filterEndDate}
               onChange={(e) => setFilterEndDate(e.target.value)}
             />
           </label>
           <button onClick={fetchTransactions}>Apply Filters</button>
         </div>
      </div>

        <form className="form" onSubmit={handleSubmit}>
          <label>
             Date:
             <input
               type="date"
               value={date}
               onChange={(e) => setDate(e.target.value)}
               required
             />
          </label>
          <label>
            Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </label>          
            <label>
              Type:
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </label>
            <label>
              Amount:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                ref={amountInputRef} // Attach the ref here
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </label>
          <button type="submit">
          {editMode ? 'Confirm Edit Transaction' : 'Add Transaction'} {/* Change button text based on mode */}
          </button>
        </form>

      <div className="transactions-section">
        <h2>Transactions</h2>
        <ul>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <li key={transaction._id}>
          <div className="transaction-details">
            <span className="transaction-date-time">
              {new Date(transaction.date).toLocaleDateString()} {new Date(transaction.date).toLocaleTimeString()}
            </span>
            <span>{transaction.type}: ${transaction.amount} - {transaction.category}</span>
          </div>
          <div className="button-group">
            <button className="edit-button" onClick={() => handleEdit(transaction)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(transaction._id)}>Delete</button>
          </div>
          </li>
            ))
          ) : (
            <li>No transactions available</li>
          )}
        </ul>
      </div>
            {/* Render the Charts component */}
            <Charts transactions={transactions} />
    </div>
  );
}

export default Dashboard;