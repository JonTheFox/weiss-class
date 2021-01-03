import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";

import SplitText from "react-pose-text";
import { POSES } from "../../../constants/poses.js";
import DURATIONS from "../../../constants/durations.js";

import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIcon from "@material-ui/icons/ArrowForwardIos";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
// import RestoreIcon from "@material-ui/icons/Restore";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import LocationOnIcon from "@material-ui/icons/LocationOn";
import clsx from "clsx";
import View from "../../layout/View.jsx";
import WeissSpinner from "../../partials/WeissSpinner.jsx";
import { AppContext } from "../../../contexts/AppContext.jsx";
import { DeviceContext } from "../../../contexts/DeviceContext.jsx";
import ENDPOINTS from "../../../AJAX/ajax-endpoints.js";

//import Gallery from "react-photo-gallery";
//import Carousel, { Modal, ModalGateway } from "react-images";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

import Flicking from "@egjs/react-flicking";
import { Parallax, Fade } from "@egjs/flicking-plugins";
import "./parallax.css";

let animationFrame;

// const plugins = [new Fade()];
const plugins = [new Parallax("img", 10)];

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://weiss-english.herokuapp.com/">
//         Weiss English
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const MAX_PARALLAX_WIDTH = "360px";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto !important",
  },
  main: {
    minHeight: "calc(100% - 8 * var(--spacing))",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 2),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  itemsGridContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    overflow: "auto !important",

    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // margin: 2,
    // width: 500,
    // height: 450,
    cursor: "pointer",
  },
  gridListTileBar: {
    transition: "all 0.25s",
    "&:hover": {
      backgroundColor: "var(--transparent-primary)",
    },
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  bottomNavigation: {
    position: "sticky",
    width: "100%",
    height: "calc(var(--spacing) * 8)",
    bottom: 0,
    left: 0,
  },
  bottomNavigationAction: {
    paddingBottom: 0,
  },
  letter: {
    fontSize: "2rem",
  },
  heading: {
    textAlign: "center",
    userSelect: "none",
  },
  letter_heading2: {
    fontSize: "1.5rem",
    color: "black",
    marginTop: theme.spacing(1),
  },
  heading2: {
    userSelect: "none",
    maxWidth: MAX_PARALLAX_WIDTH,
  },
  gridListContainer: {
    //padding: `${theme.spacing(2)}px ${theme.spacing(0.5)}px`,
    margin: "auto",
    maxWidth: MAX_PARALLAX_WIDTH,
    // paddingTop: `${theme.spacing(0.5)}px`,
    paddingTop: 0,
  },
  mainGridContainer: {
    flexFlow: "column",
  },
  show: {
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
  flicking: {},
}));

// const createSrcSet = (images) => {
//   if (!images) return "";
//   const str = `${images.urls.full} 3x, ${images.urls.regular} 2x, ${images.urls.small} 1x`;
//   return str;
// };

const CHAR_POSES = {
  exit: {
    opacity: 0,
    x: ({ charInWordIndex, numCharsInWord }) => {
      if (charInWordIndex < numCharsInWord / 2) {
        return "-100%";
      }
      return "100%";
    },

    y: ({ charInWordIndex }) => {
      if (charInWordIndex % 2 === 0) {
        return "-100%";
      }
      return "100%";
    },
    // color: ({ exitColor = COLORS.black }) => exitColor,
    transition: ({
      wordIndex,
      numWords,
      charIndex,
      numChars,
      charInWordIndex,
      numCharsInWord,
    }) => ({
      duration: DURATIONS.exit * 1,
    }),
  },

  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    delay: ({
      wordIndex,
      numWords,
      charIndex,
      speechRate,
      delayPerWord = DURATIONS.enter * 0.1,
    }) => wordIndex * delayPerWord,
    transition: ({
      wordIndex,
      numWords,
      charIndex,
      numChars,
      charInWordIndex,
      numCharsInWord,
      appearDuration = DURATIONS.enter,
    }) => ({
      duration: appearDuration * 3,
      type: "spring",
      mass: 0.5,
    }),
  },
  drag: {
    y: 0,
    transition: ({ charInWordIndex }) => ({
      type: "spring",
      velocity: 150 * Math.sin(1 + charInWordIndex),
      damping: 0,
    }),
    // background: "rgba(257, 20, 0, 0)"
  },
  dragEnd: {
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 750,
    },
  },
};

const VIEW_TYPES = {
  masonary: "masonary",
  cards: "cards",
  tiles: "tiles",
};

const getCarouselItemFromImage = (imageItem, isSoleItem = false) => {
  const src = imageItem?.urls?.small;

  const sizes = [
    { width: 4, height: 3 },
    { height: 1, width: 1 },
    { width: 3, height: 4 },
  ];

  let size = sizes[0];
  if (imageItem.width > imageItem.height) {
    size = sizes[0];
  }
  if (imageItem.width === imageItem.height) {
    size = sizes[1];
  }
  if (imageItem.width < imageItem.height) {
    size = sizes[2];
  }

  if (isSoleItem) {
    size = {}; //auto size (which isn't very pretty, actually :/ )
  }

  return { ...size, src };
};

export default function Album(props) {
  const {
    items = [],
    subItems = [],
    title = "",
    onClick,
    onNavClick,
    onLiClick,
    onSelect,
    onActionAreaClick,
    onLabelClick,
    onTitleClick,
    onSubtitleClick,
    actionBtns = [],
    getTitle,
    itemType = "",
    displayType = "tiles",
    selected = {},
  } = props;

  const refs = useRef({ mainProgress: 0 });

  const classes = useStyles();

  const [appUtils, appState, setAppState] = useContext(AppContext);
  const responsiveData = useContext(DeviceContext);
  const { size } = responsiveData;

  const [collections, setCollections] = useState([]);
  const [bottomNavIndex, setBottomNavIndex] = useState(0);

  const {
    issy,
    Logger,
    request,
    capitalizeFirstLetter,
    capitalizeTitle,
    pickRandomFrom,
    getRandomUpTo,
  } = appUtils;

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const createClickHandler = useCallback(
    (item = {}, clickedEntity, info) => {
      // const { image, label } = info;

      onClick(item, clickedEntity);
    },
    [onClick]
  );

  const createNavClickHandler = useCallback(
    (ev, navBtnName = "") => {
      onNavClick(ev, navBtnName);
    },
    [onNavClick]
  );

  const createLiClickHandler = useCallback(
    (ev, config = {}) => {
      if (!onLiClick) return;
      onLiClick(ev, config);
    },
    [onLiClick]
  );

  const createLabelClickHandler = useCallback(
    (ev, config = {}) => {
      if (!onLabelClick) return;
      onLabelClick(ev, config);
    },
    [onLabelClick]
  );

  const createActionAreaClickHandler = useCallback(
    (ev, item = {}, actionType = "", info = {}) => {
      if (!onActionAreaClick) return;
      onActionAreaClick(ev, item, actionType, info);
    },
    [onActionAreaClick]
  );

  const renderCards = () => {
    return items.map((item, i, _items) => {
      if (!item.length) {
        debugger;
        return;
      }

      const [groupLabel, imageGroup] = item;
      // const imageGroup = pickRandomFrom(imageGroups);
      if (!imageGroup) return null;

      const image = pickRandomFrom(imageGroup.images);
      if (!image) return null;

      // const label = image.title || imageGroup.label;

      const label = getTitle
        ? getTitle(item, i, _items)
        : image.title || imageGroup.label;

      return (
        <Grid item key={image?.id} xs={12} sm={6} md={4}>
          <Card className={clsx(classes.card, "dynamic-shadow")}>
            <CardMedia
              className={clsx(classes.cardMedia, "cursor--pointer")}
              image={image?.urls?.small}
              title={label}
              onClick={(ev) =>
                createClickHandler(item, "goIn", {
                  image,
                  label,
                })
              }
            />

            <CardActionArea
              onClick={(ev) =>
                createActionAreaClickHandler(ev, item, "goIn", {
                  image,
                  label,
                })
              }
            >
              <CardContent className={classes.cardContent}>
                <Typography
                  gutterBottom
                  className="readable"
                  variant="h5"
                  component="h2"
                >
                  {capitalizeTitle(
                    capitalizeFirstLetter(label)?.replace(/_/gi, " ")
                  )}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      );
    });
  };

  const renderTiles = (tiles, config = {}) => {
    const { areSubItems } = config;
    return (
      <div className={classes.gridListContainer}>
        <GridList
          cellHeight={180}
          className={classes.gridList}
          style={{ margin: 2 }}
        >
          {tiles &&
            tiles.length &&
            tiles.map((item, i, _items) => {
              //don't show the first item, because it's already displayed in the slider
              if (areSubItems && i === 0) return null;

              const j = i;
              const [groupLabel, imageGroup] = item;
              // const imageGroup = pickRandomFrom(imageGroups);

              if (!imageGroup) return null;

              const image = imageGroup.images[0];
              if (!image) return null;

              // const label = image.title || imageGroup.label;

              const label = getTitle
                ? getTitle(item, i, _items)
                : image.title || imageGroup.label;

              // const isSelected = item._id === selected._id;
              // debugger;

              const isFeatured =
                //only one item
                _items.length === 2 ||
                // every 5th item
                j % 5 === 0 ||
                //last item with 2 preceding items that are in a single row
                (j === _items.length && j % 5 === 1) ||
                //3rd and last item
                (_items.length === 4 && j == 3);
              //

              return (
                <GridListTile
                  key={image?.urls?.small}
                  cols={isFeatured ? 2 : 1}
                  rows={
                    isFeatured && ["large", "xl-large"].includes(size) ? 2 : 1
                  }
                >
                  <img
                    src={image?.urls?.small}
                    alt={label}
                    onClick={(ev) => {
                      createLiClickHandler(ev, {
                        selected: item,
                        label,
                        image,
                        imageGroup,
                        groupLabel,
                      });
                    }}
                  />
                  {!areSubItems && (
                    <GridListTileBar
                      title={label}
                      className={clsx(
                        "readable cursor--pointer",
                        classes.gridListTileBar
                      )}
                      //subtitle={<span>by: {item.author}</span>}
                      onClick={(ev) => {
                        createLabelClickHandler(ev, {
                          selected: item,
                          label,
                          image,
                          imageGroup,
                          groupLabel,
                        });
                      }}
                      actionIcon={
                        <>
                          {itemType !== "item" && (
                            <IconButton
                              aria-label={`info about ${label}`}
                              className={classes.icon}
                              onClick={(ev) =>
                                createClickHandler(item, "goIn", label)
                              }
                            >
                              <InfoIcon />
                            </IconButton>
                          )}
                        </>
                      }
                    />
                  )}
                </GridListTile>
              );
            })}
        </GridList>
      </div>
    );
  };

  let progressBar = {};

  const renderFlickings = () => {
    const subtitle = selected[1].label;

    return (
      <>
        <div id="parallax" className="plugins container">
          <Flicking
            className="flicking"
            gap={8}
            circular={false}
            plugins={plugins}
            renderOnlyVisible={true}
            moveType={{ type: "snap", count: 8 }}
            collectStatistics={false}
            onSelect={onSelect}
            //onChange={onSelect}
            onMoveEnd={onSelect}
            onMoveEnd={(e) => {
              progressBar.style.width = e.progress * 100 + "%";
              //refs.current.mainProgress = e.progress * 100;
              onSelect(e);
            }}
          >
            {items.map((item, i) => {
              const _item = item[1];
              const { label, images } = _item;
              const image = images[0];

              return (
                <div className="panel">
                  <img src={image.urls.small} />
                </div>
              );
            })}
          </Flicking>
        </div>

        {renderTiles(
          subItems?.images?.map((image, i, _images) => {
            return [
              subItems.parentLabel,
              {
                label: subItems.label,
                images: [image],
                _id: subItems._id,
              },
            ];
          }),
          { areSubItems: true }
        )}
      </>
    );
  };

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  // const _title = capitalizeTitle(
  //   capitalizeFirstLetter(
  //     selected?.[1]?.label || subItems.parentLabel || title
  //   ) || "Vocabulary"
  // );

  const _title = capitalizeTitle(title);
  const _subtitle = selected[1]?.label ?? "";

  return (
    <>
      <View className={clsx("Vocabulary", classes.root)}>
        <main className={classes.main}>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container
              maxWidth="sm"
              className={clsx(classes.heading, "stroke readable")}
              onClick={onTitleClick}
            >
              <SplitText
                charPoses={CHAR_POSES}
                wordPoses={POSES.word__draggable}
                className={("letter stroke cursor--grab", classes.letter)}
              >
                {_title}
              </SplitText>
              <div
                className={clsx(
                  "progress",
                  displayType !== "flickings" && classes.hide
                )}
              >
                <div
                  className={"progress-bar gradient"}
                  ref={(e) => {
                    progressBar = e;
                  }}
                />
              </div>
            </Container>
            <Container
              maxWidth="sm"
              className={clsx(classes.heading2, "stroke readable")}
              onClick={onSubtitleClick}
            >
              <SplitText
                charPoses={CHAR_POSES}
                wordPoses={POSES.word__draggable}
                className={
                  ("letter stroke cursor--grab", classes.letter_heading2)
                }
              >
                {capitalizeTitle(_subtitle)}
              </SplitText>
            </Container>
          </div>
          {/* End hero unit */}

          {!items.length ? (
            <WeissSpinner></WeissSpinner>
          ) : (
            <Container className={classes.itemsGridContainer} maxWidth="md">
              <Grid container className={classes.mainGridContainer} spacing={4}>
                {displayType === "cards"
                  ? renderCards()
                  : displayType === "tiles"
                  ? renderTiles(items)
                  : displayType === "flickings" && renderFlickings()}
              </Grid>
            </Container>
          )}
        </main>

        {items.length > 0 && (
          <BottomNavigation
            value={bottomNavIndex}
            className={classes.bottomNavigation}
            onChange={(event, newValue) => {
              setBottomNavIndex(newValue);
            }}
          >
            <BottomNavigationAction
              value="back"
              label="Back"
              aria-label={`Go back`}
              className={classes.bottomNavigationAction}
              disabled={itemType === "category"}
              icon={<ArrowBackIcon />}
              onClick={(ev) => createNavClickHandler(ev, "back")}
            />
            <BottomNavigationAction
              value="forward"
              label="Forward"
              aria-label={`Go forward`}
              disabled={itemType === "item"}
              icon={<ArrowForwardIcon />}
              className={classes.bottomNavigationAction}
            />
          </BottomNavigation>
        )}
      </View>
    </>
  );
}

/*


      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Weiss English
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Feel free to contact us.
        </Typography>
        <Copyright />
      </footer>
  
*/

/*

 <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Review your vocabulary here. Enjoy the beautiful images :)
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Main call to action
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Secondary action
                    </Button>
                  </Grid>
                </Grid>
              </div>
*/

/*

//card actions

<CardActions>
                          {actionBtns.map((actionBtn) => {
                            if (!actionBtn) {
                              debugger;
                              return null;
                            }
                            const { label, name, disabled } = actionBtn;

                            return (
                              <Button
                                size="small"
                                color="primary"
                                onClick={(ev) =>
                                  createClickHandler(item, name, label)
                                }
                                disabled={disabled()}
                              >
                                {label}
                              </Button>
                            );
                          })}
                        </CardActions>

*/

/* //<ProgressBar
         //   percent={refs.current.mainProgress}
          //  filledBackground="linear-gradient(to right, var(--secondary), var(--white))"
         // ></ProgressBar>*/

/*


const renderMasonary = () => {
    return (
      <div>
        <Gallery
          photos={subItems.map((image, i, _subItems) => {
            // const image = pickRandomFrom(item?.[1]?.images);
            // const { width, height } = size;

            const isSoleItem = _subItems.length === 1;
            const carouselItem = getCarouselItemFromImage(image, isSoleItem);
            carouselItem.width = 1;
            carouselItem.height = 1;
            return carouselItem;

            // debugger;

            // return { src, width, height, label:image.label };
          })}
          onClick={openLightbox}
          onClick={(ev, info, b) => {
            // synthVoice.say();

            const { index } = info;
            const clickedItem = items[index];

            // dispatch({
            //   type: "setSelected",
            //   payload: { selected: clickedItem },
            // });
          }}
          onClick={createLiClickHandler}
        />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal className="carousel readable" onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={items.map((x, i) => {
                  const image = pickRandomFrom(x?.[1]?.images);
                  const carouselItem = getCarouselItemFromImage(image);

                  const { label } = x[1];

                  // if (i === 0) {
                  //   debugger;
                  // }

                  const _x = carouselItem;

                  return {
                    ..._x,
                    srcset: image.urls,
                    caption: label,
                  };
                })}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  };

*/
