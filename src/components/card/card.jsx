import React from "react";
import "./card.styles.scss";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material/";

import missingImage from "../../assets/pizza_placeholder.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Cards = ({ data }) => {
  return (
    <Card className={`card ${data === "Add" ? "add" : ""}`}>
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
