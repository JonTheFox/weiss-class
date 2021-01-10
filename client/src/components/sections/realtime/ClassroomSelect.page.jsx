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
} from "recoil";
import roomsState from "../../../store/rooms.atom.js";
import socketState from "../../../store/socket.atom.js";

import * as io from "socket.io-client";

import Card from "../../Card/Card.js";

import { useQuery } from "@apollo/client";
import { GetRooms } from "../../../gql/queries/GetRooms";

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

  const { capitalizeFirstLetter, pickRandomFrom } = appUtils;
  const { logg, loggError } = useLogg({ label });
  const promiseKeeper = usePromiseKeeper({ label });

  const classes = useStyles();

  const [collections, setCollections] = useState([]);

  const { loading, error, data } = useQuery(GetRooms);
  const [rooms, setRooms] = useRecoilState(roomsState);
  const socket = useRecoilValue(socketState);

  useEffect(() => {
    const { classrooms } = appState.realtime;
    setItems(classrooms || []);
    logg("classrooms updated: ", classrooms);
  }, [appState]);

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
                Select a classroom
              </Typography>
            </ScaleIn>

            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(ev) => {
                      //TODO: open create-a-room modal
                      // const { realtime } = appState;
                      // if (!realtime) throw new Error(`No realtime state?...`);
                      // const { socket } = realtime;

                      // initSocket(socket);

                      if (!socket)
                        throw new Error(`No socket in app context?...`);
                      const { clientID } = appState.realtime;

                      // if (!clientID) {
                      //   throw new Error(`No clientID...?`);
                      // }
                      socket.emit("client__createRoom", {
                        user: appState.user,
                        // clientID,
                        intent: {
                          ...mockRoom,
                          //userTypes: realtime.userTypes,
                        },
                      });

                      socket.on("server_clientEnteredClassroom", function(msg) {
                        debugger;
                        setItems((items) => [...items, msg.classroom]);
                        logg("server_clientEnteredClassroom: ", msg);
                      });
                      socket.on("server__classroomAlreadyExists", function(
                        msg
                      ) {
                        const { classroom } = msg;
                        debugger;
                        logg("server__classroomAlreadyExists: ", msg);
                      });
                    }}
                  >
                    Create a Room
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Do nothing
                  </Button>
                </Grid>
              </Grid>
            </div>
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
                  title,
                  name,
                  roomKey,
                } = classroom;

                const numTeachers = teachers.length;
                // const headerText =
                //   numTeachers <= 1 ? "Teacher" : `${numTeachers} Teachers`;

                const firstTeacher = teachers[0] || {};
                const firstName = firstTeacher.first_name || "";
                const lastName = firstTeacher.last_name || "";
                const firstTeacherFullname = capitalizeFirstLetter(
                  `${firstName} ${lastName}`
                );

                return (
                  <Grid item key={roomKey} xs={12} sm={6} md={4}>
                    <Card className={clsx(classes.card, "dynamic-shadow")}>
                      <CardActions>
                        <CardContent className={classes.cardContent}>
                          <Typography
                            gutterBottom
                            className="readable"
                            variant="h5"
                            component="span"
                          >
                            {firstTeacherFullname}
                          </Typography>
                          <Typography
                            gutterBottom
                            className="readable"
                            variant="span"
                            component="span"
                          >
                            's Room
                          </Typography>
                        </CardContent>
                      </CardActions>
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
