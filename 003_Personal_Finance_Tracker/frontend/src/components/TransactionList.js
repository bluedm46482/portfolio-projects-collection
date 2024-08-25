import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from './TransactionForm';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(res.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <li key={transaction._id}>
              {transaction.type}: ${transaction.amount} - {transaction.category}
            </li>
          ))
        ) : (
          <li>No transactions available</li>
        )}
      </ul>
    </div>
  );
}

export default TransactionList;

/*

  const handleAddTransactions = () => {
    fetchTransactions(); // Refresh list after adding a new transaction
  };

<TransactionForm handleAddTransactions={handleAddTransactions} fetchTransactions={fetchTransactions} />
*/