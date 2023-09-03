import React, { useEffect, useState } from "react";
import "./pizza-admin.styles.scss";

import Cards from "../../components/card";

import toppingData from "../../api/toppings/toppings";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PizzaAdmin = () => {
  const [toppings, setToppings] = useState({});

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    toppingData && setToppings(toppingData);
  }, [toppingData]);

  return (
    <section className="pizza-admin">
      <div className="pizza-admin-navigation">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Meats" {...a11yProps(0)} />
            <Tab label="Veggies" {...a11yProps(1)} />
            <Tab label="Extras" {...a11yProps(2)} />
          </Tabs>
        </Box>

        {Object.keys(toppings).map((category, i) => (
          <CustomTabPanel
            className="toppings-list"
            key={i}
            value={value}
            index={i}
          >
            <header>{category}</header>
            <div className="toppings-grid">
              {toppings[category].map((topping, j) => (
                <Cards topping={topping} key={j} />
              ))}
            </div>
          </CustomTabPanel>
        ))}
  
      </div>
    </section>
  );
};

export default PizzaAdmin;
