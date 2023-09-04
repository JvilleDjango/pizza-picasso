import React, { useEffect, useState } from "react";
import "./pizza-admin.styles.scss";

import Cards from "../../components/card";

import toppingData from "../../api/toppings/toppings";
import FormDialog from "../../components/modal/form.dialog";
import Modal from "../../components/modal";

import { Box, Tab, Tabs, Typography, Button, IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";

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
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    toppingData && setToppings(toppingData);
  }, [toppingData]);

  return (
    <section className="pizza-admin">
      <div className="pizza-admin-navigation">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            className="tabs"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Meats" {...a11yProps(0)} />
            <Tab label="Veggies" {...a11yProps(1)} />
            <Tab label="Extras" {...a11yProps(2)} />
            <Tab
              icon={<AddIcon />}
              iconPosition="start"
              label="New"
              className="new"
            />
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
            <div className="actions-container">
              <div className="actions-left">
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  disableElevation
                  onClick={handleAdd}
                >
                  Add
                </Button>
              </div>
              <div className="actions-right">
                <IconButton aria-label="view list">
                  <ViewListIcon />
                </IconButton>
                <IconButton aria-label="view grid">
                  <GridViewIcon />
                </IconButton>
              </div>
            </div>
            <div className="toppings-grid">
              {toppings[category].map((topping, j) => (
                <Cards data={topping} key={j} />
              ))}
              <Cards data={"Add"} onClick={handleAdd} />
            </div>
          </CustomTabPanel>
        ))}
      </div>
      <FormDialog open={open} onClose={handleClose} type="add topping" />
      <Modal open={openModal} onClose={handleCloseModal} />
    </section>
  );
};

export default PizzaAdmin;
