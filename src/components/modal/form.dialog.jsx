import React, { useEffect, useState } from "react";

import "./form.dialog.styles.scss";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  TextField,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import toppingData from "../../api/toppings/toppings";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialog = ({ type, open, onClose }) => {
  console.log(type);
  const [toppings, setToppings] = useState({});

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleClick = () => {
    console.log("clicked");
  };

  useEffect(() => {
    toppingData && setToppings(toppingData);
  }, [toppingData]);

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogTitle>{type}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* To subscribe to this website, please enter your email address here. We
          will send updates occasionally. */}
        </DialogContentText>
        <form onSubmit={formik.handleSubmit} className="form-dialog">
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            // value={formik.values.name}
            value={
              type === "add pizza" || type === "edit pizza"
                ? "Bantha pudu"
                : "Italian Sausage"
            }
            onChange={formik.handleChange}
            // error={formik.touched.name && Boolean(formik.errors.name)}
            error={true}
            // helperText={formik.touched.name && formik.errors.name}
            helperText={"Name already in use"}
          />

          <label htmlFor="image">Upload Image</label>
          <TextField
            fullWidth
            type="file"
            id="image"
            name="image"
            // label="Image"
            accept="image/*"
            // value={formik.values.image}
            onChange={formik.handleChange}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
          />
          {type === "add pizza" || type === "edit pizza" ? (
            <section className="topping-section">
              {Object.keys(toppings).map((category, i) => (
                <>
                  <header>{category}</header>
                  <div className="topping-section-grid">
                    {toppings[category].map((topping, j) => (
                      <Chip
                        label={topping}
                        variant="outlined"
                        key={i}
                        onClick={handleClick}
                      />
                    ))}
                  </div>
                </>
              ))}
            </section>
          ) : null}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          type="submit"
          disableElevation
          disabled
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
