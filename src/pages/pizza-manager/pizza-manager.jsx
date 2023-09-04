import React, { useEffect, useState } from "react";

import "./pizza-manager.styles.scss";

import Cards from "../../components/card";

import pizzaData from "../../api/pizzas/pizzas";
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

const PizzaManager = () => {
  const [pizzas, setPizzas] = useState({});
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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    pizzaData && setPizzas(pizzaData);
  }, [pizzaData]);

  return (
    <section className="pizza-manager">
      <div className="pizza-manager-navigation">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            className="tabs"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Cheese Pizzas" {...a11yProps(0)} />
            <Tab label="Meat Pizzas" {...a11yProps(1)} />
            <Tab label="Veggie Pizzas" {...a11yProps(2)} />
            <Tab label="Specialty Pizzas" {...a11yProps(3)} />
            <Tab
              icon={<AddIcon />}
              iconPosition="start"
              label="New"
              className="new"
            />
          </Tabs>
        </Box>

        {Object.keys(pizzas).map((category, i) => (
          <CustomTabPanel
            className="pizza-list"
            key={i}
            value={value}
            index={i}
          >
            <header>{`${category} Pizzas`}</header>
            
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

            <div className="pizza-grid">
              {pizzas[category].map((pizza, j) => (
                <Cards data={pizza} key={j} />
              ))}
              <Cards data={"Add"} onClick={handleAdd} />
            </div>
          </CustomTabPanel>
        ))}
      </div>
      <FormDialog open={open} onClose={handleClose} type="add pizza" />
      <Modal open={openModal} onClose={handleCloseModal} />
    </section>
  );
};

export default PizzaManager;
