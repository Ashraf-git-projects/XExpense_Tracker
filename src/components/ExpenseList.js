import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Pagination,
  Stack,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CategoryIcon from '@mui/icons-material/Category';

export default function ExpenseList({ expenses = [], setExpenses = () => {} }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentExpenses = expenses
    .slice()
    .reverse()
    .slice(startIdx, endIdx);

  // Helper to get icon per category
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'food':
        return <FastfoodIcon />;
      case 'shopping':
        return <ShoppingBagIcon />;
      case 'transport':
        return <DirectionsCarIcon />;
      default:
        return <CategoryIcon />;
    }
  };

  return (
    <div>
      <List dense>
  {currentExpenses.map((exp) => {
    const formattedDate = new Date(exp.date).toLocaleDateString('en-GB');

    return (
      <div key={exp.id} className="expense-item">
        <ListItem
          secondaryAction={
            <IconButton edge="end" onClick={() => handleDelete(exp.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: '#555' }}>{getCategoryIcon(exp.category)}</Avatar>
          </ListItemAvatar>

          <ListItemText
  primary={
    <div className="expense-title-amount">
      <span className="expense-title">{exp.title}</span>
      <span className="expense-amount">₹{exp.amount}</span>
    </div>
  }
  secondary={
    <div className="expense-meta">
      <span>{exp.category}</span>
      <span>{formattedDate}</span>
    </div>
  }
/>

        </ListItem>
      </div>
    );
  })}
</List>


      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
        />
      )}
    </div>
  );

  function handleDelete(id) {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  }
}
