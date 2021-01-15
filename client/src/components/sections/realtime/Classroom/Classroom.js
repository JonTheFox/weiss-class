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
import socketConnectionState from "../../../../store/socketConnection.atom.js";
import { CONNECTION_STATES } from "../../../../store/CONNECTION_STATES.js";
import * as io from "socket.io-client";
import { localStorage } from "../../../../lib/issy/index.js";

const label = "Classroom";
//const SECTION_ROUTE = `rt/classroom`;
const LOCAL_STORAGE_KEY = "weissClass";

const clientsTypes = ["teachers", "students", "platforms"];

const ClientsContainer = ({ clientsType, room, bgImage }) => {
	if (clientsType === "teachers") {
		return (
			<div
				className={`clients__container ${clientsType}`}
				style={{
					background: `url(${bgImage})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}
			>
				<h2 className={`classroom__header`}>{`${clientsType}`}</h2>
			</div>
		);
	}

	return (
		<div className={`clients__container ${clientsType} `}>
			<h2 className={`classroom__header`}>{`${clientsType}`}</h2>
		</div>
	);
};

const Classroom = (props) => {
	const [appUtils] = useContext(AppContext);
	const { PromiseKeeper, Logger, getUniqueString, CLIENT_ONLY } = appUtils;

	const { logg, loggError } = useLogg({ label });
	const promiseKeeper = usePromiseKeeper({ label });

	const refs = useRef({ viewRef: {} });

	const { loading, error, data } = useQuery(GetRooms);

	const user = useRecoilValue(userState);
	// const client = useRecoilValue(clientState);
	const room = useRecoilValue(roomState);

	const { location, match } = props.route;

	const bgImage =
		room?.img?.url || room?.teachers?.clients?.[0]?.img?.url || "";

	return (
		<View className={"classroom"}>
			{clientsTypes.map((clientsType, i, clientsTypes) => {
				return (
					<ClientsContainer
						clientsType={clientsType}
						room={room}
						bgImage={bgImage}
					></ClientsContainer>
				);
			})}
		</View>
	);
};

export default Classroom;
