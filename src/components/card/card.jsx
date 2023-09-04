import React, { useState } from "react";
import "./card.styles.scss";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material/";

import missingImage from "../../assets/pizza_placeholder.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Cards = ({ data, onClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = (e) => {};

  const handleDelete = (e) => {};

  return (
    <>
      <Card className={`card ${data === "Add" ? "add" : ""}`} onClick={onClick}>
        <CardActionArea>
          {data !== "Add" ? (
            <>
              <IconButton
                onClick={handleClick}
                className="card-menu"
                size="small"
                sx={{ ml: 2 }}
                aria-controls={openMenu ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
              >
                <MoreVertIcon />
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

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon /> Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon /> Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default Cards;
