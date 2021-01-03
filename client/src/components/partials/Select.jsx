import React, { useContext, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import MUISelect from "@material-ui/core/Select";
import "./_Select.scss";

import { AppContext } from "../../contexts/AppContext.jsx";

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

const compLabel = "Select";
let logg;
let animationFrame;

const languages = [
  { value: "english", label: "English", short: "en-US" },
  { value: "hebrew", label: "עברית", short: "he" }
];

const Select = props => {
  const classes = useStyles();
  // const { items } = props;
  const { label = "Language", refs = {} } = props;
  const [selected, setSelected] = React.useState(
    refs.current ? refs.current.selectedLang : languages[0].short
  );
  const [isOpened, setIsOpen] = React.useState(false);

  const [appState] = useContext(AppContext);
  const { Logger } = appState;
  logg = logg || new Logger({ label: compLabel }).logg;
  logg("selectedLang: ", refs.current.selectedLang);

  const handleChange = useCallback(
    ev => {
      const newValue = ev.target.value;
      // setSelected(evTargetComp.props.value);
      setSelected(newValue);
      if (refs && refs.current) refs.current.selectedLang = newValue;
      // if (props.setter) props.setter(newValue);
      // logg("selected: ", newValue);
    },
    [setSelected, refs]
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  // const handleChange = () => {
  //   debugger;
  // };

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <form autoComplete="off" className={"select--form"}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="controlled-open-select">{label}</InputLabel>
        <MUISelect
          open={isOpened}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selected}
          onChange={handleChange}
          inputProps={{
            name: label,
            id: "controlled-open-select"
          }}
        >
          {languages.map((item, i) => {
            const { value, label, short } = item;
            return (
              <MenuItem
                value={short}
                className={`select--item ${value}`}
                key={`select-item-${i}`}
              >
                {label}
              </MenuItem>
            );
          })}
        </MUISelect>
      </FormControl>
    </form>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  // items: PropTypes.arrayOf(PropTypes.object).isRequired,
  refs: PropTypes.object, //pass a ref object created by the useRef hook
  // onChange: PropTypes.func,
  setter: PropTypes.func
  // selectedIndex: PropTypes.number
};

export default Select;
