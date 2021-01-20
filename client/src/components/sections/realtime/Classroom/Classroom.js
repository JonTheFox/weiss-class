import React, {
	useContext,
	useEffect,
	useState,
	useRef,
	Suspense,
	useCallback,
} from "react";
import { AppContext } from "../../../../contexts/AppContext.jsx";
import { DeviceContext } from "../../../../contexts/DeviceContext.jsx";
import Card from "../../../partials/Card.jsx";
import WeissSpinner from "../../../partials/WeissSpinner.jsx";
//import PropTypes from "prop-types";
// import clsx from "clsx";
import View from "../../../layout/View.jsx";

import "./_classroom.scss";

import useLogg from "../../../hooks/useLogg.jsx";
import usePromiseKeeper from "../../../hooks/usePromiseKeeper.jsx";
import { useQuery, gql } from "@apollo/client";
import { GetSlides } from "../../../../gql/queries/GetSlides";
import { GetRooms } from "../../../../gql/queries/GetRooms";

import {
	// RecoilRoot,
	// atom,
	// selector,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";
import roomsState from "../../../../store/rooms.atom.js";
import roomState from "../../../../store/room.atom.js";
import socketState from "../../../../store/socket.atom.js";
import userState from "../../../../store/user.atom.js";
import clientState from "../../../../store/client.atom.js";
import currentSlideState from "../../../../store/slide.selector.js";

import socketConnectionState from "../../../../store/socketConnection.atom.js";
import { CONNECTION_STATES } from "../../../../store/CONNECTION_STATES.js";
import * as io from "socket.io-client";
import { localStorage } from "../../../../lib/issy/index.js";
import Slide from "../Slide/Slide.js";
import LOCAL_STORAGE_KEY from "../localStorageKey.js";
import clientsTypes from "../clientsTypes.js";

import Swiper from "../../../partials/Swiper.jsx";

import SpeedDial from "../../../partials/SpeedDial/SpeedDial.js";

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

	const mapSlide = useCallback((refs, goToStep, slide) => {
		return <Slide slide={slide}></Slide>;
	}, []);

	const handleChangeSlideIndex = useCallback((slideIndex) => {
		logg("handleChangeSlideIndex ", slideIndex);
	}, []);

	return (
		<View className={"classroom"}>
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

			<SpeedDial></SpeedDial>
		</View>
	);
};

export default Classroom;
