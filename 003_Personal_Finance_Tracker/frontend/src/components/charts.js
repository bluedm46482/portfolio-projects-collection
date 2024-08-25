import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


function Charts({ transactions }) {
  const incomeData = transactions.filter((t) => t.type === 'income');
  const expenseData = transactions.filter((t) => t.type === 'expense');

  // Aggregate income by category
  const incomeCategories = incomeData.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  // Aggregate expenses by category
  const expenseCategories = expenseData.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  // Data for Doughnut chart (expense breakdown)
  const expenseChartData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        label: 'Expenses',
        data: Object.values(expenseCategories),
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#cc65fe',
          '#ffce56',
          '#32a852',
        ],
      },
    ],
  };

  // Data for Bar chart (income vs expense)
  const barChartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount',
        data: [
          incomeData.reduce((acc, curr) => acc + curr.amount, 0),
          expenseData.reduce((acc, curr) => acc + curr.amount, 0),
        ],
        backgroundColor: ['#36a2eb', '#ff6384'],
      },
    ],
  };

  return (
    <div>
      <h3>Income vs Expenses</h3>
      <Bar data={barChartData} />
      <h3>Expense Breakdown</h3>
      <Doughnut data={expenseChartData} />
    </div>
  );
}

export default Charts;
