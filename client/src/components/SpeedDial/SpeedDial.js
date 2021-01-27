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
import classroomState from "../../store/classroom.atom.js";
import CLIENT_ACTIONS from "./clientActions.js";
import clsx from "clsx";
import "./SpeedDial.scss";

const label = "Text";
const Text = ({ children = "" }) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;

	const { logg, loggError } = useLogg({ label });
	const promiseKeeper = usePromiseKeeper({ label });

	const [isBackdropVisible, setIsBackgroundVisible] = useState(false);
	const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);

	const socket = useRecoilValue(socketState);
	const client = useRecoilValue(clientState);
	const classroom = useRecoilValue(classroomState);

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

	const handleActionSelect = (action = {}) => {
		if (!action) {
			loggError(
				"handleActionSelect was called without an action. Returning."
			);
			return null;
		}

		socket.emit(`client__sendsAction`, {
			clientId: client.id,
			roomKey: classroom.roomKey,
			actionName: action.name,
		});

		setSelectedAction(action);
		const prom = promiseKeeper.stall(2.25 * 1000).andThen((promise) => {
			setSelectedAction(null);
		});
		prom.catch((err) => {
			setSelectedAction(null);
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
				{CLIENT_ACTIONS.map((action, actionIndex) => {
					const isSelected = selectedAction === action;

					return (
						<SpeedDialAction
							className={clsx(
								"SpeedDialAction",
								`SpeedDialAction--${actionIndex}`,
								isSelected && "selected"
							)}
							key={action.name}
							icon={action.icon}
							tooltipTitle={action.name}
							tooltipOpen
							onClick={() => handleActionSelect(action)}
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
