import React from "react";
import "./card.styles.scss";

import {
  Card,
  CardHeader,
  Avatar,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material/";

const Cards = ({ topping }) => {
  return (
    <Card className="card">
      <CardActionArea>
        {/* <CardHeader
          avatar={<Avatar  aria-label="recipe">
          R
        </Avatar>}
          title={topping}
          // subheader={expense.description}
        /> */}

        <CardMedia
          sx={{ height: 75 }}
          image="https://picsum.photos/75"
          title="green iguana"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {topping}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Cards;
