import React, { useEffect, useState } from "react";
import "./App.css";
import WalletBalance from "./components/WalletBalance";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseList from "./components/ExpenseList";
import ExpenseTrend from "./components/ExpenseTrend";

function App() {
  const [balance, setBalance] = useState(() => {
    return Number(localStorage.getItem("walletBalance")) || 5000;
  });
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });

  useEffect(() => {
    localStorage.setItem("walletBalance", balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>

      <div className="balance-comp">
        <WalletBalance balance={balance} setBalance={setBalance} />
        <ExpenseForm
          expenses={expenses}
          setExpenses={setExpenses}
          setBalance={setBalance}
        />
        <ExpenseSummary expenses={expenses} />
      </div>

      <div className="second-comp">
        <div className="list-comp">
          <h2>Recent Transactions</h2>
          <ExpenseList expenses={expenses} setExpenses={setExpenses} />
        </div>
        <div className="top-expense">
          <h2>Top Expenses</h2>
          <ExpenseTrend expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default App;
