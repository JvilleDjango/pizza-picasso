import React from "react";
import "./form.styles.scss";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Chip,
  Box,
  OutlinedInput,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

const ExpenseForm = () => {
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

  return (
    <section className="form">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
 

        <TextField
          fullWidth
          id="image"
          name="image"
          label="Image"
          value={formik.values.image}
          onChange={formik.handleChange}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
        />

        <div className="form-actions">
          <Button color="primary" fullWidth type="submit">
            cancel
          </Button>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Save
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ExpenseForm;
