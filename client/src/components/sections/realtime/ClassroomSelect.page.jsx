import React, {
  useReducer,
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { AppContext } from "../../../contexts/AppContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";
import useLogg from "../../hooks/useLogg.jsx";
import usePromiseKeeper from "../../hooks/usePromiseKeeper.jsx";
import View from "../../layout/View.jsx";

import AppBar from "@material-ui/core/AppBar";
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

import {
  // RecoilRoot,
  // atom,
  // selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import roomsState from "../../../store/rooms.atom.js";
import socketState from "../../../store/socket.atom.js";
import clientState from "../../../store/client.atom.js";
import classroomState from "../../../store/classroom.atom.js";

import * as io from "socket.io-client";

import Card from "../../Card/Card.js";

import { useQuery } from "@apollo/client";
import { GetRooms } from "../../../gql/queries/GetRooms";

import { useHistory } from "react-router-dom";

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

const mockRoom = { title: "Jonny's" };

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto !important",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
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

export default function ClassroomSelect(props) {
  //todo: take items from context
  const [items, setItems] = useState([]);

  const [appUtils, appState, setAppState] = useContext(AppContext);

  const { capitalizeFirstLetter, pickRandomFrom, is, navigateTo } = appUtils;
  const { logg, loggError } = useLogg({ label });
  const promiseKeeper = usePromiseKeeper({ label });

  const classes = useStyles();
  const refs = useRef({ client: { id: 0 } });

  const [rooms, setRooms] = useRecoilState(roomsState);
  const setClassroom = useSetRecoilState(classroomState);
  const socket = useRecoilValue(socketState);
  const client = useRecoilValue(clientState);

  const history = useHistory();

  useEffect(() => {
    const { classrooms } = appState.realtime;
    setItems(classrooms || []);
    logg("classrooms updated: ", classrooms);
  }, [appState]);

  useEffect(() => {
    refs.current.client = client;
  }, [client]);

  return (
    <View className={classes.root}>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <ScaleIn initialPose="exit" pose="enter">
              <Typography
                component="h1"
                variant="h5"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Join a class
              </Typography>
            </ScaleIn>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
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

                const numTeachers = teachers.length;
                const firstTeacher = teachers[0] || {};
                const firstName = firstTeacher.first_name || "";
                const lastName = firstTeacher.last_name || "";
                const firstTeacherFullname = capitalizeFirstLetter(
                  `${firstName} ${lastName}`
                );

                const bgImage = img?.url || firstTeacher?.img?.url || "";

                return (
                  <Grid item key={roomKey} xs={12} sm={6} md={4}>
                    <Card
                      className={clsx(classes.card, "dynamic-shadow")}
                      style={{
                        background: `url(${bgImage})`,
                      }}
                      onClick={(ev) => {
                        if (is(socket).aString) {
                          loggError("socket is inactive");
                          return null;
                        }

                        const _clientId = refs.current?.client?.id ?? 0;
                        socket.emit("client__selectsRoom", {
                          clientId: _clientId,
                          roomKey,
                        });
                        setClassroom({ roomKey });

                        promiseKeeper
                          .stall(1500, "navigate to classroom")
                          .then(() => {
                            //navigateTo(`/rt/classroom`, history);
                            props.route.history.push("/rt/classroom");
                          });
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
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      </main>
    </View>
  );
}

ClassroomSelect.propTypes = {
  rounds: PropTypes.object,
  onCorrect: PropTypes.func,
};
