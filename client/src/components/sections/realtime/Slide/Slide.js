import React, {
	useContext,
	useEffect,
	useRef,
	Suspense,
	useCallback,
} from "react";
import { AppContext } from "../../../../contexts/AppContext.jsx";
import Card from "../../../partials/Card.jsx";
import WeissSpinner from "../../../partials/WeissSpinner.jsx";
//import PropTypes from "prop-types";
// import clsx from "clsx";
import View from "../../../layout/View.jsx";

import useLogg from "../../../hooks/useLogg.jsx";
import usePromiseKeeper from "../../../hooks/usePromiseKeeper.jsx";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import roomsState from "../../../../store/rooms.atom.js";
import roomState from "../../../../store/room.atom.js";
import socketState from "../../../../store/socket.atom.js";
import userState from "../../../../store/user.atom.js";
import clientState from "../../../../store/client.atom.js";
import slidesState from "../../../../store/slides.atom.js";

import { CONNECTION_STATES } from "../../../../store/CONNECTION_STATES.js";
import * as io from "socket.io-client";
import { localStorage } from "../../../../lib/issy/index.js";

const label = "Slide";

const Slide = (props) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;

	const { logg, loggError } = useLogg({ label });
	const promiseKeeper = usePromiseKeeper({ label });

	const refs = useRef({ viewRef: {} });

	const user = useRecoilValue(userState);
	const room = useRecoilValue(roomState);

	return <View className={"Slide"}>This is a slide</View>;
};

export default Slide;
