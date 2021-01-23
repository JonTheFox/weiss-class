import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { AppContext } from "../../contexts/AppContext.jsx";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
// import PersonIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import "./_ImageCard.scss";

let animationFrame;

const renderInfoList = (info, capitalizeFirstLetter) => {
  const table = [];
  let rowIndex = 0;
  for (let [key, value] of Object.entries(info)) {
    const Key = capitalizeFirstLetter(key, { lowerCaseRest: true });
    const Value = capitalizeFirstLetter(value);
    const row = (
      <Typography
        key={`content_${rowIndex}`}
        paragraph
        variant={
          Key === "Name" ? "h5" : Key === "Description" ? "caption" : "body2"
        }
      >
        {key.toLowerCase() === "name" ? Value : `${Key}: ${Value}`}
      </Typography>
    );
    table.push(row);
    rowIndex++;
  }
  return table;
};

const contextLabel = "ImageCard";
let logg;
let promiseKeeper;

const ImageCard = (props) => {
  const {
    imgURL = "",
    urls = [],
    label = "",
    //elevation = 4,
    item = {},
    selected = false,
    showHeader = false,
    headerBottom = false,
    renderHeader = null,
    showHeaderText = false,
    showActionBar = false,
    showOverlay = false,
    ripple = false,
    actions = [],
    regular = "",
    small = "",
    className = "",
    info = [],
    overlayActions = [],
    active = true,
    //iconActions = []
  } = props;

  const [appUtils] = useContext(AppContext);
  const { Logger, PromiseKeeper, loadImage, capitalizeFirstLetter } = appUtils;
  logg =
    logg || new Logger({ label: contextLabel, stylePreset: "success" }).logg;
  promiseKeeper = promiseKeeper || new PromiseKeeper({ label: contextLabel });

  const refs = useRef({});

  const [expanded, setExpanded] = useState(false);
  const [showExpandBtn, setShowExpandBtn] = useState(false);
  const handleExpand = (ev) => {
    ev.stopPropagation();
    ev.cancelBubble = true;
    setExpanded(!expanded);
  };

  const [highResLoaded, setHighResLoaded] = useState(false);

  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseOver = (ev) => {
    if (!refs.current.active) return;
    setIsMouseOver(true);
  };
  const handleMouseOut = (ev) => {
    if (!refs.current.active) return;
    setIsMouseOver(false);
  };

  //  useEffect(() => {
  //   logg("isMouseOver: ", isMouseOver);
  // }, [isMouseOver]);

  useEffect(() => {
    logg("active: ", active);
    refs.current.active = active;
  }, [active]);

  useEffect(() => {
    if (selected && !highResLoaded) {
      const imageSize = "regular";
      loadImage(urls[imageSize]).then(() => {
        animationFrame = window.requestAnimationFrame(() => {
          setHighResLoaded(true);
          logg(`Loaded ${imageSize}-size image of "${label}"`);
        });
      });
    }
    if (selected && actions && !showExpandBtn) {
      promiseKeeper.stall(700, "show expand button").then(() => {
        animationFrame = window.requestAnimationFrame(() => {
          setShowExpandBtn(true);
        });
      });
    }
    if (!selected) {
      animationFrame = window.requestAnimationFrame(() => {
        setShowExpandBtn(false);
      });
    }
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [item, selected]);

  const expandBtn =
    !showExpandBtn || !selected || !actions ? null : (
      <div className="card--floating-bar">
        <IconButton
          className={clsx("expand-btn gradient-secondary floating", {
            "expand-btn--open": expanded,
          })}
          disabled={info.length <= 0}
          onClick={(ev) => handleExpand(ev)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </div>
    );

  const cardContent = (
    <React.Fragment>
      <CardContent
        className={clsx(
          "overlay",
          showHeader && "card--content",
          showOverlay ? "card--overlay" : "unselectable",
          !showHeader && !showOverlay && "hidden",
          showHeaderText ? "header-text--visible" : "header-text--hidden"
        )}
      >
        {overlayActions &&
          overlayActions.length > 0 &&
          overlayActions.map((action, i) => (
            <div
              size="small"
              color="default"
              key={`overlay_btn_${i}`}
              onClick={() => (showOverlay ? action.callback(item) : false)}
            >
              {action.label}
            </div>
          ))}
        <Collapse className={"image-card--header"} in={showHeader}>
          {renderHeader ? renderHeader(label) : showHeaderText ? label : "???"}
        </Collapse>
      </CardContent>

      <CardMedia
        className="card--media"
        image={selected && highResLoaded ? regular : small || imgURL}
        //title={label}
      />
    </React.Fragment>
  );

  const actionBar = (
    <Collapse
      in={(showActionBar && actions.length > 0) || false}
      timeout="auto"
      unmountOnExit
    >
      <CardActions disableSpacing>
        {actions &&
          actions.length > 0 &&
          actions.map((action, i) => (
            <IconButton
              key={`card_action_${i}`}
              onClick={() => action.callback(item)}
              aria-label={action.label}
            >
              <action.icon />
            </IconButton>
          ))}
      </CardActions>
    </Collapse>
  );

  const collpasibleContent = (
    <Collapse in={expanded || false} timeout="auto" unmountOnExit>
      <CardContent className="card--info bg-paper">
        {renderInfoList(info, capitalizeFirstLetter)}
      </CardContent>
    </Collapse>
  );

  const cardClassNames = clsx(
    "image-card",
    className && className,
    active ? "active" : "disabled",
    headerBottom && "header--bottom",
    `image-card--${isMouseOver ? "mouse-over" : "mouse-out"}`
  );

  const elevation = (props.elevation || 2) * (isMouseOver && active ? 1 : 2);

  if (ripple) {
    return (
      <Card
        elevation={elevation}
        className={cardClassNames}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <CardActionArea className={"card--action-area"}>
          {cardContent}
        </CardActionArea>
        {expandBtn}
        {showActionBar && actionBar}
        {collpasibleContent}
      </Card>
    );
  } else {
    return (
      <Card
        elevation={elevation}
        className={cardClassNames}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {cardContent}
        {expandBtn}
        {showActionBar && actionBar}
        {collpasibleContent}
      </Card>
    );
  }
};

ImageCard.propTypes = {
  imgURL: PropTypes.string,
  regular: PropTypes.string,
  small: PropTypes.string,
  thumb: PropTypes.string,
  full: PropTypes.string,
  urls: PropTypes.object,
  label: PropTypes.string,
  delay: PropTypes.number,
  showHeader: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.object),
  active: PropTypes.bool,
};

export default ImageCard;
