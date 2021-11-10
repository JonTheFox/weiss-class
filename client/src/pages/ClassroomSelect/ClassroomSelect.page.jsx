import React, {
  useReducer,
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";
import useLogg from "../../hooks/useLogg.jsx";
import usePromiseKeeper from "../../hooks/usePromiseKeeper.jsx";
import View from "../../components/layout/View.jsx";
import AppBar from "@material-ui/core/AppBar";
import Card from "../../components/Card/Card.jsx";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import posed, { PoseGroup } from "react-pose";
import Heading from "../../components/Heading/Heading.js";
import Carousel from "../../components/Carousel/Carousel.js";
import GlowingLoader from "../../components/GlowingLoader/GlowingLoader.jsx";
import videoState from "../../store/video.atom.js";
// Import Swiper styles
// import "swiper/swiper.scss";
// import "swiper/components/navigation/navigation.scss";
// import "swiper/components/pagination/pagination.scss";
// import "swiper/components/scrollbar/scrollbar.scss";

import {
  // RecoilRoot,
  // atom,
  // selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import roomsState from "../../store/rooms.atom.js";
import socketState from "../../store/socket.atom.js";
import clientState from "../../store/client.atom.js";
import roomState from "../../store/room.atom.js";
import isSoundOnState from "../../store/isSoundOn.selector.js";
import refsState from "../../store/refs.atom.js";
import { flyingThroughCloudsOriginal } from "../../mockData/lessons/Present Progressive/presentProgressiveVideos.js";
import * as io from "socket.io-client";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { mainClickSound } from "../../constants/sounds.js";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "./CLassroomSelect.scss";

const scaleInPoses = {
  enter: {
    opacity: 1,
    transition: { duration: 200 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 200 },
  },
  navigating: {
    opacity: 0.75,
    // scale: 0.9,
    // transition: { duration: 20, type: "spring" },
    // borderRadius: "8px",
    // border: "4px solid var(--primary)",
  },
};
const ScaleIn = posed.div(scaleInPoses);

let animationFrame;
const label = "ClassroomSelect";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    //backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    paddingBottom: 0,
    fontSize: "1.5rem",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9s
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const SWIPER_PARAMS = {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
};

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function ClassroomSelect(props) {
  const [appUtils, appState, setAppState] = useContext(AppContext);
  const [video, setVideo] = useRecoilState(videoState);
  const { capitalizeFirstLetter, pickRandomFrom, is, navigateTo } = appUtils;
  const { logg, loggError } = useLogg({ label });
  const promiseKeeper = usePromiseKeeper({ label });
  const classes = useStyles();
  const refs = useRecoilValue(refsState);
  const [rooms, setRooms] = useRecoilState(roomsState);
  const room = useRecoilValue(roomState);
  const setRoom = useSetRecoilState(roomState);
  const socket = useRecoilValue(socketState);
  const client = useRecoilValue(clientState);
  const history = useHistory();
  const isSoundOn = useRecoilValue(isSoundOnState);
  const [showCarousel, setShowCarousel] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const roomsInfo = rooms.map((room) => {
    return {
      ...room,
      subtitle: room.subject || room.subtitle || "",
      image: room?.image?.url ?? room?.teachers?.clients?.[0]?.img?.url ?? "",
    };
  });

  const onRoomSelect = (room) => {
    try {
      if (is(socket).aString) {
        loggError("socket is inactive");
        debugger;
        return null;
      }
      isSoundOn && mainClickSound.play();

      const { id, type } = client;
      const roomKey = room.roomKey;

      socket.emit("client__selectsRoom", {
        roomKey,
        clientId: client.id,
        clientType: client.type,
      });

      setRoom({ roomKey });
      setShowCarousel(false);
      setIsNavigating(true);

      promiseKeeper.stall(10, "nav to classroom").then(() => {
        navigateTo(`/classroom`, history);
      });
    } catch (err) {
      //try again
      onRoomSelect(room);
    }
  };
  useEffect(() => {
    promiseKeeper.stall(0.25 * 1000, "show carousel").then(() => {
      setShowCarousel(true);
    });
    if (video?.id !== "flyingThroughCloudsOriginal")
      setVideo(flyingThroughCloudsOriginal);
  }, []);

  useEffect(() => {
    const ans = rooms;
    debugger;
  }, [rooms]);

  return (
    <View className={clsx("classroom-select", classes.root)}>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <ScaleIn initialPose="exit" pose={isNavigating ? "exit" : "enter"}>
              <Heading h="2" className="title">
                Join a class
              </Heading>
            </ScaleIn>
          </Container>
        </div>

        {!rooms ||
          (!rooms.length ? (
            <GlowingLoader className="centered" />
          ) : (
            <Container
              className={clsx("centered", classes.cardGrid)}
              maxWidth="md"
            >
              <ScaleIn
                initialPose="exit"
                pose={
                  isNavigating ? "navigating" : showCarousel ? "enter" : "exit"
                }
              >
                <Carousel
                  className={clsx("carousel glass", isNavigating && "selected")}
                  onItemSelect={onRoomSelect}
                  items={roomsInfo}
                />
              </ScaleIn>
            </Container>
          ))}
      </main>
    </View>
  );
}

ClassroomSelect.propTypes = {
  rounds: PropTypes.object,
  onCorrect: PropTypes.func,
};
