import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Grid
} from '@mui/material';
import './ExpenseForm.css';

export default function ExpenseForm({
  expenses = [],
  setExpenses = () => {},
  setBalance = () => {},
  editingExpense = null,
  onFinishEdit = () => {},
  totalExpenses = 0,
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [lastExpenseAmount, setLastExpenseAmount] = useState('');

  const isEdit = !!editingExpense;

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setOpen(true);
    }
  }, [editingExpense]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
    if (isEdit) onFinishEdit();
  };

  const handleSubmit = () => {
    const amt = parseFloat(amount);
    if (!title || !category || isNaN(amt) || amt <= 0 || !date) return;

    if (isEdit) {
      // Editing mode
      const updatedExpenses = expenses.map(exp =>
        exp.id === editingExpense.id
          ? { ...exp, title, amount: amt, category, date }
          : exp
      );

      const balanceDiff = amt - editingExpense.amount;
      setExpenses(updatedExpenses);
      setBalance(prev => prev - balanceDiff);
    } else {
      // Add mode
      const newExpense = {
        id: Date.now(),
        title,
        amount: amt,
        category,
        date,
      };
      setExpenses(prev => [...prev, newExpense]);
      setBalance(prev => prev - amt);
      setLastExpenseAmount(amt);
    }

    handleClose();
  };

  return (
    <div className="ex-form">
      <h2>Expenses : ₹ {totalExpenses}</h2>
      <button className="expense-btn" type="button" onClick={handleOpen}>
        + Add Expense
      </button>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>{isEdit ? 'Edit Expense' : 'Add Expenses'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="title"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="price"
                fullWidth
                label="Price"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="category"
                fullWidth
                select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                variant="outlined"
                size="small"
              >
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Travel">Travel</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Shopping">Shopping</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="date"
                label="dd/mm/yyyy"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className="dialog-buttons">
          <Button onClick={handleSubmit} type="submit" className="add-btn">
            {isEdit ? 'Update Expense' : 'Add Expense'}
          </Button>
          <Button onClick={handleClose} className="cancel-btn">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
