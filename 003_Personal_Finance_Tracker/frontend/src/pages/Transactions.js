import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await axios.get('/api/transactions');
      setTransactions(res.data);
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.type}: ${transaction.amount} - {transaction.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;
