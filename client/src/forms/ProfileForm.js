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
  { id: "email", name: "email", label: "Email", required: true },
  {
    id: "password",
    name: "password",
    label: "Password",
    required: false,
  },
];

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const REQUIRED_FIELDS = [
  {
    label: "email",
    validateValue: (val) => {
      return !!val;
    },
  },
  {
    label: "password",
    validateValue: (val) => {
      return !!val;
    },
  },
];

const validateFormData = (formData = {}) => {
  const { email } = formData;

  let result = true; //a missing or invalid required field will change this to false
  Object.values(REQUIRED_FIELDS).map((formField) => {
    const { label } = formField;
    const inputValue = formData[label];
    debugger;
    if (!inputValue) {
      result = false;
    }
    const { validateValue } = formField;

    if (validateValue) {
      return validateValue(inputValue);
    }

    //no validation rules... so anything passes
    return true;
  });

  return result;
};

export default function PersonalInfoForm(props) {
  const classes = useStyles();
  const { refs = { current: {} }, handleNext } = props;

  // const setUser = useSetRecoilState(userState);

  const handleSubmit = useCallback((ev) => {
    if (ev) ev.preventDefault();
    const form = refs.current.form;

    const formData = new FormData(form);

    const emailInput = formData.get("email");
    const [passwordInput] = formData.get("password");
    const profileInfo = {
      email: emailInput?.toLowerCase(),
      password: passwordInput?.toLowerCase(),
    };
    if (!refs?.current?.forms) {
      refs.current.forms = {};
    }
    refs.current.forms.profile = {};
    Object.assign(refs.current.forms.profile, profileInfo);

    const isFormValid = validateFormData(profileInfo);

    if (isFormValid) {
      handleNext();
    } else {
      //todo: show toast
      return;
    }
  }, []); //pass an array of dependencies (you can pass an empty array)

  return (
    <form
      onSubmit={handleSubmit}
      ref={(ref) => {
        if (ref) refs.current.form = ref;
      }}
    >
      <Typography variant="h6" gutterBottom>
        Profile
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
          onClick={handleSubmit}
          className={classes.button}
        />
      </Grid>
    </form>
  );
}
