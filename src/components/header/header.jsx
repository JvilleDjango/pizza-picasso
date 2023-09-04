import React from "react";
import "./header.styles.scss";

import { Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <section className="mast-head">
      <div className="logo">
        <FontAwesomeIcon icon={faPizzaSlice} aria-label="Pizza Icon" role="img"/>
        <Typography variant="h1">Pizza Picasso</Typography>
      </div>
    </section>
  );
};

export default Header;
