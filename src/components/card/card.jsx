import React, { useRef } from "react";
import "./card.styles.scss";

import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CardHeader,
} from "@mui/material/";

import missingImage from "../../assets/pizza_placeholder.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Cards = ({ data, onClick, onDelete }) => {
  const cardRef = useRef(null);

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Perform an action when Enter is pressed
      console.log("Enter key pressed");
    }
  };

  return (
    <Card
      className={`card ${data === "Add" ? "add" : ""}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <CardHeader
        action={
          data !== "Add" ? (
            <IconButton
              onClick={handleDelete}
              onKeyDown={handleKeyDown}
              className="card-menu"
              size="small"
              sx={{ ml: 2 }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          ) : (
            ""
          )
        }
      />
      <CardActionArea>
        {data !== "Add" ? (
          <CardMedia
            sx={{ height: 120 }}
            image={missingImage}
            title="toppings"
            component="img"
          />
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
