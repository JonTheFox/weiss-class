import React, { useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

import TextField from "@material-ui/core/TextField";
// import InputAdornment from "@material-ui/core/InputAdornment";
import ImageSearch from "@material-ui/icons/ImageSearch";
import Button from "@material-ui/core/Button";

import { AppContext } from "../../contexts/AppContext.jsx";

const useStyles = makeStyles(theme => ({
  container: {
    background: "hsla(0, 0%, 100%, .9)",
    top: 0,
    left: 0,
    zIndex: 100,
    width: "100%",
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    padding: 0,
    margin: "auto",
    fontSize: "100%"
  },
  searchBtn: {
    // display: "inline",
    margin: theme.spacing(1),
    fontSize: "100%",
    width: "30%",
    height: "auto",
    padding: `${theme.spacing(0.5)}px`
    // padding: `${theme.spacing(1)}px`
  },

  textField: {
    margin: `0 ${theme.spacing(1)}px ${theme.spacing(0.5)}px ${theme.spacing(
      1
    )}px`,
    height: "auto",
    fontSize: "1.5rem"
  },
  dense: {
    marginTop: 16
  }
}));

let logg;
// let promiseKeeper;

const SearchInput = props => {
  const {
    placeholder = "",
    label = "Search",
    onSubmit,
    onFocus,
    //handleChange = null,
    autoFocus = true,
    className = ""
  } = props;
  const [appState] = useContext(AppContext);
  const { Logger } = appState;
  logg = logg || new Logger({ label: "SearchInput" }).logg;
  // promiseKeeper = new issy.PromiseKeeper("SearchInput");

  const [searchQuery, setSearchQuery] = useState("");
  const formDomElem = useRef(null);
  const inputDomElem = useRef(null);
  // const valueBeforeSubmit = useRef("");

  const classes = useStyles();

  const search = ev => {
    //inputDomElem.current.value = "NINJA";
    ev.preventDefault();
    ev.stopPropagation();
    formDomElem.current.focus();
    const q = searchQuery.trim();
    if (!q) {
      logg("Search was called without a query string.");
      return null;
    }
    logg("Searching for images of: ", q);
    if (onSubmit) onSubmit(ev, q);
  };

  const _handleChange = ev => {
    // ev.preventDefault();
    ev.preventDefault();
    const query = ev.target.value.trim();
    setSearchQuery(query);
    //onChange && onChange(query);
  };

  return (
    <form
      className={clsx("search-form", classes.container, className && className)}
      ref={ref => (formDomElem.current = ref)}
      noValidate
      autoComplete="off"
      onSubmit={search}
    >
      <TextField
        className={clsx("search-input", classes.textField)}
        label={label}
        placeholder={placeholder}
        onChange={_handleChange}
        margin="normal"
        fullWidth
        autoFocus={autoFocus}
        defaultValue={searchQuery}
        inputRef={node => {
          if (!node) return;
          inputDomElem.current = node;
          if (onFocus) node.onfocus = onFocus;
        }}
        name={"query"}
        variant="standard" //or: "outlined", "filled"
      />

      <Button
        className={clsx("search-btn", classes.searchBtn)}
        variant="contained"
        color="primary"
        onClick={search}
        startIcon={<ImageSearch />}
      >
        Search
      </Button>
    </form>
  );
};

SearchInput.propTypes = {
  //handleChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  autoFocus: PropTypes.bool
};

export default SearchInput;
