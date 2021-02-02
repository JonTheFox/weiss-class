import React, { useCallback, useRef } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import userState from "../store/user.atom.js";

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
  { id: "bday", name: "bday", label: "Date of birth", required: true },
];

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function PersonalInfoForm(props) {
  const classes = useStyles();
  const { refs = { current: {} }, handleNext } = props;

  // const setUser = useSetRecoilState(userState);

  const handleSubmit = useCallback((ev) => {
    if (ev) ev.preventDefault();
    const form = refs.current.form;

    const formData = new FormData(form);

    const firstNameInput = formData.get("first_name");
    const lastNameInput = formData.get("last_name");
    const middleNameInput = formData.get("middle_name");
    const bDayInput = formData.get("bday");
    const personalInfo = {
      first_name: firstNameInput,
      last_name: lastNameInput,
      middle_name: middleNameInput,
      bday: bDayInput,
    };

    if (!refs?.current?.forms) {
      refs.current.forms = {};
    }
    refs.current.forms.personal = {};

    Object.assign(refs.current.forms.personal, personalInfo);

    handleNext();
  }, []); //pass an array of dependencies (you can pass an empty array)

  return (
    <form
      onSubmit={handleSubmit}
      ref={(ref) => {
        if (ref) refs.current.form = ref;
      }}
    >
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

      <Grid item xs={12} sm={12}>
        <input
          type="submit"
          color="primary"
          value={"Next"}
          onClick={handleNext}
          className={classes.button}
        />
      </Grid>
    </form>
  );
}
