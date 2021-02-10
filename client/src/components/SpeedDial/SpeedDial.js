import React, {
	useContext,
	useEffect,
	useState,
	useRef,
	Suspense,
	useCallback,
} from "react";

import useLogg from "../../hooks/useLogg.jsx";
import usePromiseKeeper from "../../hooks/usePromiseKeeper.jsx";
import SpeedDial from "@material-ui/lab/SpeedDial";
import Backdrop from "@material-ui/core/Backdrop";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import {
	// atom,
	// selector,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";
import socketState from "../../store/socket.atom.js";
import clientState from "../../store/client.atom.js";
import roomState from "../../store/room.atom.js";
import isSoundOnState from "../../store/isSoundOn.selector.js";
import {
	studentActions,
	teacherActions,
	platformActions,
} from "./clientActions.js";
import clsx from "clsx";
import { Howl, Howler } from "howler";
import "./SpeedDial.scss";

import { attentionSound } from "../../constants/sounds.js";

const label = "Text";
const Text = ({ children = "" }) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;

	const { logg, loggError } = useLogg({ label });
	const [clientActions, setClientActions] = useState(studentActions);
	const promiseKeeper = usePromiseKeeper({ label });

	const [isBackdropVisible, setIsBackgroundVisible] = useState(false);
	const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
	const refs = useRef({ selectedAction: {} });

	const socket = useRecoilValue(socketState);
	const client = useRecoilValue(clientState);
	const room = useRecoilValue(roomState);
	const isSoundOn = useRecoilValue(isSoundOnState);

	const [selectedAction, setSelectedAction] = useState(null);

	const handleVisibility = () => {
		setIsBackgroundVisible((prevHidden) => !prevHidden);
	};

	const handleSpeedDialOpen = () => {
		setIsSpeedDialOpen(true);
	};

	const handleSpeedDialClose = () => {
		setIsSpeedDialOpen(false);
	};

	useEffect(() => {
		if (!isSpeedDialOpen) {
			setSelectedAction(null);
		}
	}, [isSpeedDialOpen]);

	useEffect(() => {
		refs.current.selectedAction = selectedAction;
	}, [selectedAction]);

	useEffect(() => {
		refs.current.client = client;

		let clientActions;
		switch (client.type) {
			case "student":
				clientActions = studentActions;
				break;
			case "teacher":
				clientActions = teacherActions;
				break;
			case "platform":
				clientActions = platformActions;
			default:
				clientActions = studentActions;
				break;
		}
		refs.current.clientActions = clientActions;
		setClientActions(clientActions);
	}, [client]);

	const handleActionClick = ({ action, clientId, clientType, type } = {}) => {
		if (!action) {
			loggError(
				"handleActionClick was called without an action. Returning."
			);
			return null;
		}

		if (refs.current.selectedAction) return;

		const payload = {
			clientId: client.id,
			roomKey: room.roomKey,
			actionName: action.name,
			toAllStudents: true,
			teacherClientId: client.id,
		};

		let eventName;
		switch (clientType) {
			case "student":
				eventName = "client__studentSendsAction";
				break;
			case "teacher":
				eventName = "client__teacherSendsAction";
				payload.teacherClientId = client.id;
				break;
			case "platform":
				eventName = "client__platformSendsAction";
			default:
				debugger;
				loggError("unrecognized client type");
				eventName = studentActions;
				break;
		}

		socket.emit(eventName, payload);
		setSelectedAction(action);
		refs.current.selectedAction = action;

		if (isSoundOn) {
			attentionSound.play();
		}
		const minimizeIcon = promiseKeeper
			.stall(2.25 * 1000)
			.andThen((promise) => {
				setSelectedAction(null);
				refs.current.selectedAction = null;
			});
		minimizeIcon.catch((err) => {
			setSelectedAction(null);
			refs.current.selectedAction = null;
		});

		// handleSpeedDialClose();
	};

	return (
		<React.Fragment>
			<SpeedDial
				ariaLabel="SpeedDial tooltip"
				className="SpeedDial"
				hidden={false}
				icon={<SpeedDialIcon />}
				onClose={handleSpeedDialClose}
				onOpen={handleSpeedDialOpen}
				open={isSpeedDialOpen}
				style={{
					position: "absolute",
					bottom: "calc( 2 * var(--spacing))",
					right: "calc( 2 * var(--spacing))",
				}}
			>
				{clientActions.map((action, actionIndex) => {
					const isSelected = selectedAction === action;

					const { name, icon, label } = action;

					return (
						<SpeedDialAction
							className={clsx(
								"SpeedDialAction",
								`SpeedDialAction--${name}`,
								`SpeedDialAction--${actionIndex}`,
								isSelected && "selected"
							)}
							key={label}
							icon={icon}
							tooltipTitle={label}
							tooltipOpen
							onClick={() =>
								handleActionClick({
									action,
									clientId: client.id,
									clientType: client.type,
								})
							}
						/>
					);
				})}
			</SpeedDial>
			<Backdrop
				open={isSpeedDialOpen}
				style={{
					zIndex: 1000,
				}}
			/>
		</React.Fragment>
	);
};

export default Text;
