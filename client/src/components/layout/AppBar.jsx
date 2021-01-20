import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Home from "@material-ui/icons/Home";
import VideoGameAsset from "@material-ui/icons/VideogameAsset";
import Mic from "@material-ui/icons/Mic";
import Collections from "@material-ui/icons/Collections";
import ImageSearch from "@material-ui/icons/ImageSearch";
import Refresh from "@material-ui/icons/Refresh";
import Toc from "@material-ui/icons/Toc";
import MenuIcon from "@material-ui/icons/Menu";
import FilterDrama from "@material-ui/icons/FilterDrama";
import Chat from "@material-ui/icons/Chat";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import MusicNote from "@material-ui/icons/MusicNote";
import Storefront from "@material-ui/icons/Storefront";
import Close from "@material-ui/icons/Close";
import SwapHoriz from "@material-ui/icons/SwapHoriz";
import SlideShow from "@material-ui/icons/Slideshow";
import Notes from "@material-ui/icons/Notes";
import PlayArrow from "@material-ui/icons/PlayArrow";
// import Palette from "@material-ui/icons/Palette";

// import Gif from "@material-ui/icons/Gif";

import TextField from "@material-ui/core/TextField";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { VERB_GROUP_NAMES } from "../../esl/verbs.js";

//import PieChart from "@material-ui/icons/PieChart";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import FormatListNumbered from "@material-ui/icons/FormatListNumbered";

import clsx from "clsx";

import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router";

import { AppContext } from "../../contexts/AppContext.jsx";
import { DeviceContext } from "../../contexts/DeviceContext.jsx";
import userState from "../../store/user.atom.js";

import {
  // atom,
  // selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import "./_Appbar.scss";

const APP_ROUTE = "/";
const SLIDES_ROUTE = "present-simple/";

const mainLinks = [
  { title: "Home", path: `${APP_ROUTE}animals/home`, Icon: Home },
  {
    title: "Classrooms",
    path: `rt`,
    Icon: Chat,
    adminOnly: false,
  },
];

const secondaryLinks = [
  {
    title: "Advice",
    path: `${APP_ROUTE}advice`,
    Icon: FilterDrama, //it's actually a cloud icon :)
    adminOnly: true,
  },
  {
    title: "Reload",
    callback: () => window.location.reload(true),
    Icon: Refresh,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // menuButton: {
  //   marginRight: theme.spacing(2)
  // },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.025),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.075),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  autoComplete: {
    // position: "relative",
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.primary.main, 0.15),
    // "&:hover": {
    //   backgroundColor: fade(theme.palette.primary.main, 0.25)
    // },
    // marginLeft: 0,
    // width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(1),
    //   width: "auto"
    // }
    // padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",

    [theme.breakpoints.up("sm")]: {
      width: 200,
      "&:focus": {
        width: 800,
      },
    },
  },
  searchIcon: {
    width: theme.spacing(7),

    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    // paddingLeft: theme.spacing(0, 0, 0, 2)
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },

  drawer: {
    width: theme.layout.drawerWidth,
    flexShrink: 0,
    // fontSize: "1.25rem"
  },
  drawerPaper: {
    width: theme.layout.drawerWidth,
  },
  appBar: ({ device }) => ({
    width: "100%",
    marginLeft: 0,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
  }),
  appBarText: {
    // width: "45%", //just so it doesn't get clippeed by the login button on the right
    // fontSize: "1rem",
    flexGrow: 1,
    color: "inherit",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    // textOverflow: "hidden"
  },
  iconButton: {
    marginRight: theme.spacing(2),
    display: "block",
  },
  toolbar: theme.mixins.toolbar,

  icon: {
    fill: theme.palette.secondary.main,
  },
  settings_bar: {
    width: "100%", //as much as available, so that it reaches all the way to the right end
    height: "var(--appbar-height)",
    position: "relative",
  },
  loginBtn: {
    fontSize: "0.75rem",
  },
  avatar: {
    marginRight: "calc(2 * var(--spacing))",
    backgroundColor: "var(--secondary)",
    width: "24px",
    height: "24px",
  },
}));

const renderPrimaryListItemText = (title = "") => (
  <ListItemText
    primary={title}
    className={title.length > 7 ? "long-text" : "short-text"}
  />
);
const renderSecondaryListItemText = (title = "") => (
  <ListItemText
    secondary={title}
    className={title.length > 7 ? "long-text" : "short-text"}
  />
);

let logg;
let loggError;
let animationFrame;
let promiseKeeper;
const label = "AppBar";

const ResponsiveDrawer = (props) => {
  const { match } = props;

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const [appUtils, appState] = useContext(AppContext);
  const {
    Logger,
    PromiseKeeper,
    navigateTo,
    DURATIONS,
    request,
    getRandomUpTo,
    DEBUGGING,
    EMPTY_FUNC,
  } = appUtils;

  const [searchOptions, setSearchOptions] = useState([]);
  const [getOptionLabel, setGetOptionLabel] = useState(EMPTY_FUNC);

  const sharedRefs = useRef(props.sharedRefs?.current || {});

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const mediaContext = useContext(DeviceContext);
  const [visible, setVisible] = useState(true);
  const classes = useStyles(mediaContext);

  const [user, setUser] = useRecoilState(userState);

  const appBarSearchables = Object.assign({}, mainLinks, secondaryLinks);

  const handleDrawerToggle = () => {
    animationFrame = window.requestAnimationFrame(() => {
      setMobileOpen((prevState) => !prevState);
    });
  };

  const closeLink = {
    title: "",
    path: "",
    Icon: Close,
    callback: handleDrawerToggle,
  };

  const handleLinkClick = (path) => {
    setMobileOpen(false);
    if (!path || !props.history) return null;
    promiseKeeper.stall(DURATIONS.exit, "navigate to page").then(() => {
      animationFrame = window.requestAnimationFrame(() => {
        navigateTo(path, props.history);
      });
    });
  };

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuNav = (ev) => {
    const menuitem = ev.target.getAttribute("menuitem");
    handleUserMenuClose();
    promiseKeeper.stall(DURATIONS.exit || 300, "user menu nav").then(() => {
      animationFrame = window.requestAnimationFrame(() => {
        switch (menuitem) {
          case "logout":
            // handleLinkClick("/login");
            // appState.setUser(null);
            setUser(null);
            break;
        }
      });
    });
  };

  const keepServerAwake = async () => {
    try {
      const ajaxResult = await request("POST", "/api/ninjaCode", {
        ninjaCode: getRandomUpTo(100),
      });
      const { error, ninjaCode } = ajaxResult;
      if (error) throw new Error(error);
      if (!ninjaCode) throw new Error("No ninja code received from the server");
    } catch (err) {
      loggError(err.message);
    }
  };

  useEffect(() => {
    const logger = new Logger({ label });
    logg = logger.logg;
    loggError = logger.loggError;
    promiseKeeper = new PromiseKeeper({ label });
    if (!DEBUGGING) {
      promiseKeeper.every(60 * 1000, keepServerAwake);
    }
    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const { searchables } = appState;
    if (!searchables) {
      loggError("No searchables items in appState ?");
      return;
    }

    if (!appState.searchables.options.length) {
      const linkList = [];
      [mainLinks, secondaryLinks].forEach((linkGroup, i) => {
        for (let [linkName, link] of Object.entries(linkGroup)) {
          link.groupName = i === 0 ? "Main Links" : "Secondary Links";
          linkList.push(link);
        }
      });

      //if there are no searchable items, add the various screens (pages) as searchable items
      appState.setSearchables({
        options: linkList,
        selected: linkList[0],
        getOptionLabel: (option) => option.title,
        onChange: (option) => {
          if (!option) return;
          navigateTo(`${match.path}${option.path}`, props.history);
        },
      });
    }

    setSearchOptions(searchables.options?.flat() || []);
    setGetOptionLabel(searchables.getOptionLabel);
  }, [appState]);

  const renderMenuList = useCallback((menuItems, secondary = false) => {
    return menuItems.map(
      ({ title, path, Icon, adminOnly, callback }, index) => {
        if (adminOnly && !(user && user.role === "admin")) return null;
        return (
          <ListItem
            button
            key={title}
            className={`menu-item menu-item--${path ? path.slice(4) : "basic"}`}
            onClick={(ev) => {
              path
                ? handleLinkClick(`${match.path}${path}`)
                : callback
                ? callback(ev)
                : logg(
                    `No path or callback function were provided for menu item titled "${title}"`
                  );
            }}
          >
            <ListItemIcon>
              <Icon
                className={`${classes.icon} menu-item--icon ${
                  secondary ? "secondary" : "primary"
                }-menu-icon`}
              />
            </ListItemIcon>
            {secondary
              ? renderSecondaryListItemText(title)
              : renderPrimaryListItemText(title)}
          </ListItem>
        );
      }
    );
  });

  const drawer = (
    <div className={"appbar--drawer"}>
      <div
        className={`appbar--drawer--bar ${classes.drawer}`}
        onClick={(ev) => ev.stopPropagation()}
      >
        {renderMenuList([closeLink])}
      </div>

      <Divider />
      <List>{renderMenuList(mainLinks)}</List>
      <Divider />
      {renderMenuList(secondaryLinks, "secondary")}
    </div>
  );

  return (
    <div className={clsx("appbar-container unselectable")}>
      <AppBar className={`${classes.appBar} appbar`} elevation={1}>
        <Toolbar className={"appbar--toolbar"}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
            className={clsx(classes.iconButton, mobileOpen && "menu--open")}
          >
            <MenuIcon className={classes.menuButton} />
          </IconButton>

          <Typography
            className={clsx(
              `title nowrap ${classes.appBarText} readable`,
              classes.title
            )}
            color="inherit"
            noWrap
            onClick={() => handleLinkClick(`${match.path}${APP_ROUTE}`)}
          >
            Weiss English
          </Typography>

          <div className={clsx("search", classes.search)}>
            <Autocomplete
              className={clsx(classes.autoComplete, "auto-complete")}
              classes={{
                root: classes.inputRoot,
              }}
              options={searchOptions}
              groupBy={appState.searchables.groupBy}
              //defaultValue={appState.searchables.list[0]}
              getOptionsLabel={(option) => {
                return option.title || option.name || option.v1;
              }}
              //TODO: fix this.. it doesnt get the updated getOptionLabel after appState.setSearchables()
              autoComplete={true}
              placeholder={searchOptions.placeholder || "Search…"}
              autoHighlight={true}
              autoSelect={true}
              clearOnEscape={false}
              disableClearable={false}
              disableCloseOnSelect={false}
              disabled={false}
              loading={false}
              loadingText={"working.."}
              noOptionsText={"Nothing was found."}
              renderInput={(params) => (
                <React.Fragment>
                  <div className={clsx("search-icon", classes.searchIcon)}>
                    <SearchIcon />
                  </div>

                  <TextField
                    {...params}
                    // label="search-term"
                    variant="outlined"
                    fullWidth
                  />
                </React.Fragment>
              )}
              onChange={(ev, searchable) => {
                sharedRefs.current.selectedSearchable = searchable;
                logg("selected searchable: ", searchable);
                if (appState.searchables.onChange) {
                  appState.searchables.onChange(searchable);
                }
              }}
              aria-label="search"
            ></Autocomplete>
          </div>

          {user ? (
            <div>
              <IconButton
                aria-label="user account"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleUserMenuClick}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleUserMenuClose}
              >
                <MenuItem disabled onClick={handleUserMenuClose}>
                  Profile
                </MenuItem>
                <MenuItem disabled onClick={handleUserMenuClose}>
                  My account
                </MenuItem>
                <MenuItem menuitem="logout" onClick={handleUserMenuNav}>
                  Log out
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              className={clsx("login-btn", classes.loginBtn)}
              color="inherit"
              variant="outlined"
              size="small"
              onClick={() => handleLinkClick(`${match.path}${APP_ROUTE}login`)}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <nav className={clsx("appbar--nav", classes.drawer)}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* phone & tablet */}
        <Hidden xlUp implementation="css">
          <Drawer
            variant="temporary"
            container={props.container}
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={(ev) => setMobileOpen(false)}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

ResponsiveDrawer.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ResponsiveDrawer);

/*
 <div className={clsx("settings_bar", classes.settings_bar)}> </div>
 <Avatar
                alt={user.first_name}
                src={user.avatar}
                className={classes.avatar}
                onClick={() => handleLinkClick("/login")}
              />
*/

/*
<InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
*/
