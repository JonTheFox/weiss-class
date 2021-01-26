import React, {
	useContext,
	useEffect,
	useState,
	useRef,
	Suspense,
	useCallback,
} from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import { DeviceContext } from "../../contexts/DeviceContext.jsx";
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
import "./_classroom.scss";

const label = "Classroom";

const Classroom = (props) => {
	const [appUtils] = useContext(AppContext);
	const { PromiseKeeper, Logger, getUniqueString, CLIENT_ONLY } = appUtils;

	const { logg, loggError } = useLogg({ label });
	const promiseKeeper = usePromiseKeeper({ label });

	const refs = useRef({ viewRef: {} });

	const user = useRecoilValue(userState);
	const currentSlide = useRecoilValue(currentSlideState);
	// const client = useRecoilValue(clientState);
	const room = useRecoilValue(roomState);

	const { slides, currentSlideIndex } = room;

	const bgImage =
		room?.img?.url || room?.teachers?.clients?.[0]?.img?.url || "";

	// const mapSlide = useCallback((refs, goToStep, slide) => {
	// 	return <Slide slide={slide}></Slide>;
	// }, []);

	// const handleChangeSlideIndex = useCallback((slideIndex) => {
	// 	logg("handleChangeSlideIndex ", slideIndex);
	// }, []);
	return (
		<View className={"classroom"}>
			<Slider slideIndex={2} slides={slides}></Slider>
			<SpeedDial></SpeedDial>
		</View>
	);
};

export default Classroom;

/*

<Swiper
				sharedRefs={refs}
				index={1}
				items={slides || []}
				mapItem={mapSlide.bind(
					null,
					refs,
					refs.current.swiper_goToStep
				)}
				onItemsLoaded={(a, b) => {
					logg("onItemsLoaded: ", a, b);
				}}
				noFullscreen={true}
				size={DeviceContext.screenSize}
				justifyContent="space-between"
				//onChange={handleViewedItemChange}
				onChangeIndex={handleChangeSlideIndex}
				onSwitching={(index, type) => {}}
			></Swiper>

*/
