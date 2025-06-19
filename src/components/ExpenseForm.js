import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Grid
} from '@mui/material';
import './ExpenseForm.css'; // We'll add custom styles here

export default function ExpenseForm({ expenses = [], setExpenses = () => {}, setBalance = () => {} }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [lastExpenseAmount, setLastExpenseAmount] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  const handleAddExpense = () => {
    const amt = parseFloat(amount);
    if (!title || !category || isNaN(amt) || amt <= 0 || !date) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: amt,
      category,
      date
    };

    setExpenses(prev => [...prev, newExpense]);
    setBalance(prev => prev - amt);
     setLastExpenseAmount(amt);
    handleClose();
  };

  return (
    <div className='ex-form'>
      <h2>Expenses : ₹{lastExpenseAmount}</h2>
      <button className='expense-btn' type="button" onClick={handleOpen}>+ Add Expense</button>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Add Expenses</DialogTitle>
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
                label="Select Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                variant="outlined"
                size="small"
              >
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Transport">Transport</MenuItem>
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
          <Button onClick={handleAddExpense} type="submit" className="add-btn">Add Expense</Button>
          <Button onClick={handleClose} className="cancel-btn">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
