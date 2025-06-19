import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'];

export default function ExpenseSummary({ expenses = [] }) {
  if (!expenses.length) {
    return <p>No expenses to display.</p>;
  }

  const dataMap = {};
  expenses.forEach(exp => {
    dataMap[exp.category] = (dataMap[exp.category] || 0) + exp.amount;
  });

  const data = Object.entries(dataMap).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <PieChart width={260} height={260}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
