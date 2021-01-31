import React, { useCallback } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const FORM_INPUTS = [
  { id: "first_name", name: "first_name", label: "First name", required: true },
  {
    id: "middle_name",
    name: "middle_name",
    label: "Middle name",
    required: false,
  },
  { id: "last_name", name: "last_name", label: "Last name", required: true },
  { id: "gender", name: "gender", label: "Gender", required: true },
  { id: "bDay", name: "bDay", label: "Date of birth", required: true },
];

export default function AddressForm() {
  const handleSubmit = useCallback((ev) => {
    ev.preventDefault();
    debugger;
    const formData = new FormData(ev.target);
    const firstNameInput = formData.get("firstName");
  }, []); //pass an array of dependencies (you can pass an empty array)
  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit">suibmit</Button>
      <Typography variant="h6" gutterBottom>
        About you
      </Typography>
      <Grid container spacing={3}>
        {FORM_INPUTS.map(({ name, label, required }, inputIndex) => {
          return (
            <Grid item xs={12} sm={12}>
              <TextField
                required={Boolean(required)}
                id={name}
                name={name}
                label={label}
                fullWidth
                autoComplete={name}
              />
            </Grid>
          );
        })}
      </Grid>
    </form>
  );
}
