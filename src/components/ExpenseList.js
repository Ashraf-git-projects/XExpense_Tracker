import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Pagination,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CategoryIcon from "@mui/icons-material/Category";

export default function ExpenseList({
  expenses = [],
  setExpenses = () => {},
  onEditExpense = () => {},
}) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentExpenses = expenses.slice().reverse().slice(startIdx, endIdx);

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "food":
        return <FastfoodIcon />;
      case "shopping":
        return <ShoppingBagIcon />;
      case "travel":
        return <FlightTakeoffIcon />;
      case "entertainment":
        return <LocalMoviesIcon />;
      default:
        return <DirectionsCarIcon />;
    }
  };

  function handleDelete(id) {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  }

  return (
    <div>
      <List dense>
        {currentExpenses.map((exp) => {
          const formattedDate = new Date(exp.date).toLocaleDateString("en-GB");

          return (
            <div key={exp.id} className="expense-item">
           <ListItem>
  <ListItemAvatar>
    <Avatar sx={{ bgcolor: "#ccc" }}>
      {getCategoryIcon(exp.category)}
    </Avatar>
  </ListItemAvatar>

  <div className="expense-details">
    <span className="expense-title">{exp.title}</span>
    <span className="expense-date">{formattedDate}</span>
  </div>

  <div className="expense-amount-actions">
    <span className="expense-amount">₹{exp.amount}</span>
    <IconButton onClick={() => handleDelete(exp.id)} className="icon-button delete">
      <DeleteIcon />
    </IconButton>
    <IconButton onClick={() => onEditExpense(exp)} className="icon-button edit">
      <EditIcon />
    </IconButton>
  </div>
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
          sx={{ mt: 2, display: "flex", justifyContent: "center" }}
        />
      )}
    </div>
  );
}
