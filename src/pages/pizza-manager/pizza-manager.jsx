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
        <Box sx={{ paddingTop: 2 }}>
          <Typography component="div">{children}</Typography>
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
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dialogType, setDialogType] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAdd = () => {
    setOpenFormDialog(true);
    setDialogType("add pizza");
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCardAction = (action) => {
    if (action === "edit") {
      setOpenFormDialog(true);
      setDialogType("edit pizza");
    } else if (action === "delete") {
      setOpenModal(true);
    }
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
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            allowScrollButtonsMobile
          >
            {["Cheese", "Meat", "Veggie", "Specialty"].map(
              (category, index) => (
                <Tab
                  key={index}
                  label={`${category} Pizzas`}
                  {...a11yProps(index)}
                />
              )
            )}
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
            <div className="actions-container">
              <div className="actions-left">
                <header>{`${category} Pizzas`}</header>
              </div>
              <div className="actions-right">
                <IconButton aria-label="view list">
                  <ViewListIcon />
                </IconButton>
                <IconButton aria-label="view grid">
                  <GridViewIcon />
                </IconButton>
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  disableElevation
                  onClick={handleAdd}
                >
                  Add
                </Button>
              </div>
            </div>

            <div className="pizza-grid">
              {pizzas[category].map((pizza, j) => (
                <Cards
                  data={pizza}
                  key={j}
                  onClick={() => handleCardAction("edit", pizza)}
                  onDelete={() => handleCardAction("delete", pizza)}
                />
              ))}
              <Cards data={"Add"} onClick={handleAdd} />
            </div>
          </CustomTabPanel>
        ))}
      </div>
      <FormDialog
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        type={dialogType}
      />
      <Modal open={openModal} onClose={handleCloseModal} />
    </section>
  );
};

export default PizzaManager;
