import React , {useState} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function({balance , setBalance}) {
  const[open , setOpen] = useState(false);
  const[amount , setAmount] = useState('');
  const handleOpen = ()=>{
    setOpen(true);
  }
  const handleClose = ()=>{
    setOpen(false);
    setAmount('');
  };
  const handleAddIncome = ()=>{
    const value = parseFloat(amount);
    if(!isNaN(value) && value > 0){
      setBalance(prev=>prev + value);
    }
    handleClose();
  };

  return (
    <div className='w-balance'>
        <h2>Wallet Balance : ₹{balance}</h2>
        <button type="button" className='income-btn'onClick={handleOpen}>+Add Income</button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Income</DialogTitle>
          <DialogContent>
            <TextField
  name="income"
  autoFocus
  margin="dense"
  label="Amount"
  placeholder="Income Amount"
  type="number"
  fullWidth
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
/>

          </DialogContent>
 <DialogActions>
  <Button onClick={handleAddIncome} variant="contained" type="submit" color="primary">Add Balance</Button>
  <Button onClick={handleClose}>Cancel</Button>
 </DialogActions>
        </Dialog>
    </div>
  )
}
