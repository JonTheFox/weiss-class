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
import Card from "../../components/Card/Card.js";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

// import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import posed, { PoseGroup } from "react-pose";

// import Text from "../../partials/Text/Text.js";
import Heading from "../../components/Heading/Heading.js";

import Carousel from "../../components/Carousel/Carousel.js";

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
import classroomState from "../../store/classroom.atom.js";
import isSoundOnState from "../../store/isSoundOn.selector.js";
import refsState from "../../store/refs.atom.js";
import * as io from "socket.io-client";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import FancyCard from "../../components/FancyCard/FancyCard.jsx";

import { mainClickSound } from "../../constants/sounds.js";

const scaleInPoses = {
  enter: {
    scale: 1,
    rotateZ: "0deg",
    opacity: 1,
    transition: { duration: 400 },
  },
  exit: {
    scale: 0,
    rotateZ: "12deg",
    opacity: 0,
    transition: { duration: 400 },
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
    padding: theme.spacing(8, 0, 6),
    fontSize: "1.5rem",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
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

export default function ClassroomSelect(props) {
  const [appUtils, appState, setAppState] = useContext(AppContext);

  const { capitalizeFirstLetter, pickRandomFrom, is, navigateTo } = appUtils;
  const { logg, loggError } = useLogg({ label });
  const promiseKeeper = usePromiseKeeper({ label });

  const classes = useStyles();
  const refs = useRecoilValue(refsState);

  const [rooms, setRooms] = useRecoilState(roomsState);
  const setClassroom = useSetRecoilState(classroomState);
  const socket = useRecoilValue(socketState);
  const client = useRecoilValue(clientState);

  const history = useHistory();

  const isSoundOn = useRecoilValue(isSoundOnState);

  const roomsInfo = rooms.map((room) => {
    return {
      ...room,
      subtitle: room.subject || room.subtitle || "",
      image: room?.image?.url,
    };
  });

  const onRoomSelect = (room) => {
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

    setClassroom({ roomKey });

    navigateTo(`/rt/classroom`, history);
  };

  const renderCarousel = () => {
    return <Carousel onItemSelect={onRoomSelect} items={roomsInfo} />;
  };

  return (
    <View className={classes.root}>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <ScaleIn initialPose="exit" pose="enter">
              <Heading h="2"> Join a class</Heading>
            </ScaleIn>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          {renderCarousel()}
        </Container>
      </main>
    </View>
  );
}

ClassroomSelect.propTypes = {
  rounds: PropTypes.object,
  onCorrect: PropTypes.func,
};

/*


<Grid container spacing={4}>
            {rooms &&
              rooms.map &&
              rooms.map((classroom, i, _items) => {
                const {
                  teachers,
                  students,
                  platforms,
                  title = "",
                  name = "",
                  roomKey,
                  img = {},
                } = classroom;

                const getTeacherFullName = (teacher = {}) => {
                  if (!teacher) return null;
                  const { first_name = "", last_name = "" } = teacher;
                  if (!first_name && !last_name) return null;
                  //capitalize first letters
                  const _first_name =
                    first_name[0].toUpperCase() + first_name.slice(1);
                  const _last_name =
                    last_name &&
                    last_name[0] &&
                    last_name[0].toUpperCase() + last_name.slice(1);
                  return `${_first_name} ${_last_name}`;
                };

                const numTeachers = teachers.length;
                const firstTeacher = teachers?.clients?.[0] || {};
                // const firstName = firstTeacher.first_name || "";
                // const lastName = firstTeacher.last_name || "";
                // const firstTeacherFullname = capitalizeFirstLetter(
                //   `${firstName} ${lastName}`
                // );
                const firstTeacherFullname = getTeacherFullName(firstTeacher);

                const bgImage = img?.url || firstTeacher?.img?.url || "";

                // return (
                //   <Swiper>
                //     <div
                //       class="swiper-slide"
                //       style={{ backgroundImage: bgImage }}
                //     ></div>
                //   </Swiper>
                // );

                return <FancyCard />;

                return (
                  <Card
                    className={clsx(classes.card, "dynamic-shadow")}
                    style={{
                      background: `url(${bgImage})`,
                    }}
                    onClick={(ev) => {
                      if (is(socket).aString) {
                        loggError("socket is inactive");
                        debugger;
                        return null;
                      }

                      isSoundOn && mainClickSound.play();

                      const { id, type } = client;

                      socket.emit("client__selectsRoom", {
                        roomKey,
                        clientId: client.id,
                        clientType: client.type,
                      });

                      setClassroom({ roomKey });

                      navigateTo(`/rt/classroom`, history);
                    }}
                  >
                    <CardContent className={classes.cardContent}>
                      <CardActions>
                        <Typography
                          gutterBottom
                          className="readable"
                          variant="h5"
                          component="h5"
                        >
                          {firstTeacherFullname}
                        </Typography>
                        <Typography
                          gutterBottom
                          className="readable"
                          variant="p"
                          component="p"
                        >
                          {title || name}
                        </Typography>
                      </CardActions>
                    </CardContent>
                  </Card>
                );
              })}
          </Grid>
*/
