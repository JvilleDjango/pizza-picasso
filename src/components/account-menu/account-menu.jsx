import React, { useState } from "react";
import "./account-menu.styles.scss";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "@redux/user/user.reducer";

import { Settings, Logout, ArrowDropDown } from "@mui/icons-material";

import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Button,
  Typography,
  Tooltip
} from "@mui/material";

const AccountMenu = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  console.log(currentUser);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };
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
            aria-expanded={open ? "true" : undefined}>
            <Avatar src={currentUser.photo} sx={{ width: 32, height: 32 }} />
            <Typography> {currentUser.displayName}</Typography>
          </Button>
        </Tooltip>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem component={NavLink} to="/my-account">
          <Avatar src={currentUser.photo} /> My account
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
