import React, { useState } from "react";
import MenuItem from "./components";
import { IconButton, Drawer, List } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./navigation.styles.scss"

const MobileMenu = ({ menu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="helm mobile">
      <IconButton onClick={toggleMenu} className="menu-button">
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={toggleMenu} className="mobile-drawer">
        <List>
          {menu?.map((item, i) => (
            <MenuItem item={item} key={i} />
          ))}
        </List>
      </Drawer>
    </nav>
  );
};

export default MobileMenu;
