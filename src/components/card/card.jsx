import React, { useState } from "react";
import "./card.styles.scss";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material/";

import missingImage from "../../assets/pizza_placeholder.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Cards = ({ data, onClick, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <Card className={`card ${data === "Add" ? "add" : ""}`} onClick={onClick}>
      <CardActionArea>
        {data !== "Add" ? (
          <>
            <IconButton
              onClick={handleDelete}
              className="card-menu"
              size="small"
              sx={{ ml: 2 }}
            >
              <DeleteOutlineIcon />
            </IconButton>

            <CardMedia
              sx={{ height: 120 }}
              image={missingImage}
              title="toppings"
              component="img"
            />
          </>
        ) : (
          <AddCircleIcon sx={{ fontSize: 60 }} color="primary" />
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Cards;
