import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FinancialSummary() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchSummary = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/Summary');
      setSummary(res.data);
      setLoading(false);
    } catch (error) {
        setError('Error fetching financial summary');
        setLoading(false);
      console.error('Error fetching Summary', error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) return <p>Loading summary...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Financial Summary</h2>
      <p>Total Income: ${summary.totalIncome.toFixed(2)}</p>
      <p>Total Expense: ${summary.totalExpense.toFixed(2)}</p>
      <p>Balance: ${summary.balance.toFixed(2)}</p>
    </div>
  );
}

export default FinancialSummary;