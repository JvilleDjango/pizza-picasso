import React from "react";
import MenuItem from "./components";
import { List } from "@mui/material";
import "./navigation.styles.scss";

const Navigation = ({ menu }) => {
  return (
    <nav className="helm">
      <List>
        {menu?.map((item, i) => (
          <MenuItem item={item} key={i} />
        ))}
      </List>
    </nav>
  );
};

export default Navigation;
