import React, {
	useContext,
	useEffect,
	useState,
	useRef,
	Suspense,
	useCallback,
} from "react";

import useLogg from "../../hooks/useLogg.jsx";
// import usePromiseKeeper from "../../../hooks/usePromiseKeeper.jsx";
import SpeedDial from "@material-ui/lab/SpeedDial";
import Backdrop from "@material-ui/core/Backdrop";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PanToolIcon from "@material-ui/icons/PanTool";

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

const CLIENT_ACTIONS = [
	//{ icon: <FileCopyIcon />, name: "Copy" },
	{
		icon: <PanToolIcon />,
		name: "Raise Hand",
	},
	//{ icon: <SaveIcon />, name: "Save" },
	//{ icon: <PrintIcon />, name: "Print" },
	//{ icon: <ShareIcon />, name: "Share" },
	{ icon: <FavoriteIcon />, name: "Like" },
];

const label = "Text";
const Text = ({ children = "" }) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;

	const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });

	const [isBackdropVisible, setIsBackgroundVisible] = useState(false);
	const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);

	const socket = useRecoilValue(socketState);
	const client = useRecoilValue(clientState);
	const classroom = useRecoilValue(classroomState);

	const handleVisibility = () => {
		setIsBackgroundVisible((prevHidden) => !prevHidden);
	};

	const handleSpeedDialOpen = () => {
		setIsSpeedDialOpen(true);
	};

	const handleSpeedDialClose = () => {
		setIsSpeedDialOpen(false);
	};

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

		handleSpeedDialClose();
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
				{CLIENT_ACTIONS.map((action, actionIndex) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						tooltipOpen
						onClick={() => handleActionSelect(action)}
					/>
				))}
			</SpeedDial>
			<Backdrop
				open={isSpeedDialOpen}
				style={{
					zIndex: 1,
				}}
			/>
		</React.Fragment>
	);
};

export default Text;
