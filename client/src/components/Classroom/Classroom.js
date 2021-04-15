import React, {
	useContext,
	useEffect,
	useState,
	useRef,
	Suspense,
	useCallback,
} from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
// import { DeviceContext } from "../../contexts/DeviceContext.jsx";
import Card from "../../components/Card/Card.js";
import WeissSpinner from "../../components/WeissSpinner/WeissSpinner.jsx";
//import PropTypes from "prop-types";
// import clsx from "clsx";
import View from "../../components/layout/View.jsx";
import useLogg from "../../hooks/useLogg.jsx";
import usePromiseKeeper from "../../hooks/usePromiseKeeper.jsx";
import {
	// RecoilRoot,
	// atom,
	// selector,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";
import roomsState from "../../store/rooms.atom.js";
import roomState from "../../store/room.atom.js";
import socketState from "../../store/socket.atom.js";
import userState from "../../store/user.atom.js";
import clientState from "../../store/client.atom.js";

import currentSlideState from "../../store/slide.selector.js";
import * as io from "socket.io-client";
import clientsTypes from "../../constants/clientsTypes.js";
// import Swiper from "../../../partials/Swiper.jsx";
import SpeedDial from "../SpeedDial/SpeedDial.js";
import Slider from "../Slider/Slider.js";
import { useHistory } from "react-router-dom";

import clsx from "clsx";
import "./_classroom.scss";

//use in debugging
import PRESENT_PROGRESSIVE_SLIDES from "../../mockData/lessons/Present Progressive/PresentProgressive.index.js";
import PRESENT_SIMPLE_SLIDES from "../../mockData/lessons/PresentSimple/PresentSimple.index.js";

const label = "Classroom";

const Classroom = (props) => {
	const [appUtils] = useContext(AppContext);
	const {
		PromiseKeeper,
		Logger,
		getUniqueString,
		CLIENT_ONLY,
		navigateTo,
		DEBUGGING,
	} = appUtils;

	const { logg, loggError } = useLogg({ label });
	const promiseKeeper = usePromiseKeeper({ label });

	const refs = useRef({ viewRef: {} });

	const user = useRecoilValue(userState);
	const currentSlide = useRecoilValue(currentSlideState);
	// const client = useRecoilValue(clientState);
	const room = useRecoilValue(roomState);

	const { slides, currentSlideIndex } = room;

	const _slides = DEBUGGING ? PRESENT_PROGRESSIVE_SLIDES : slides;

	return (
		<View className={"classroom gradient"}>
			<Slider slideIndex={2} slides={_slides}></Slider>
			<SpeedDial></SpeedDial>
		</View>
	);
};

export default Classroom;

//
