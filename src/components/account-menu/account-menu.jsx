import React, { useState } from "react";
import "./account-menu.styles.scss";
import { NavLink } from "react-router-dom";

import { Settings, Logout, ArrowDropDown } from "@mui/icons-material";

import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Button,
  Typography,
  Tooltip,
} from "@mui/material";

import missingImage from "../../assets/pizza_placeholder.png";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {};
  return (
    <>
      <div className="user-account">
        <Tooltip title="Account settings">
          <Button
            onClick={handleClick}
            size="small"
            endIcon={<ArrowDropDown />}
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar src={missingImage} sx={{ width: 32, height: 32 }} />
            <Typography>Pablo Picasso</Typography>
          </Button>
        </Tooltip>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}

        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={NavLink} to="/my-account">
          <Avatar  src={missingImage} /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
