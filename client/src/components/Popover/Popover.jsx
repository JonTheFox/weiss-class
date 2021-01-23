import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import PropTypes from "prop-types";
import clsx from "clsx";
// import DURATIONS from "../../constants/durations.js";

import { AppContext } from "../../contexts/AppContext.jsx";
// import View from "../layout/View.jsx";
// import ENDPOINTS from "../../AJAX/ajax-endpoints.js";

const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const label = "Popover";
let logg;
let loggError;
let animationFrame;

function Popover() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const [appUtils, appState] = useContext(AppContext);
  const { scrollTo, PromiseKeeper, Logger, request } = appUtils;

  const handleChange = event => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const logger = new Logger({ label });
    logg = logger.logg;
    loggError = logger.loggError;

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        Open the select
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Images"}>Images</MenuItem>
          <MenuItem value={"Animals"}>Animals</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

Popover.propTypes = {
  onImagesLoad: PropTypes.func
};

export default Popover;
