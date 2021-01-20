import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../contexts/AppContext.jsx";
import { DeviceContext } from "../../contexts/DeviceContext.jsx";
import AppBar from "../layout/AppBar.jsx";

import clsx from "clsx";

let logg;
const label = "EntireView";

/*
--appbar-height-sm: 48px;
--appbar-height-md: 56px;
--appbar-height-lg: 64px;
--appbar-height: 48px;

*/

const APPBAR_HEIGHT = "48px";

const EntireView = (props) => {
	const [UTILS, appState] = useContext(AppContext);
	// const { isAppbarVisible } = appState;
	const responsiveData = useContext(DeviceContext);
	const { Logger, setDomProperty, synthVoice, climbFrom } = UTILS;
	logg = logg || new Logger({ label }).logg;
	const { className = "", children } = props;

	const {
		isMobile,
		orientation,
		screenSize,
		isAppbarVisible,
	} = responsiveData;
	let { device } = responsiveData;
	device =
		device === "largeScreen"
			? "large-screen"
			: device === "xlScreen"
			? "xl-screen"
			: device;

	return (
		<div
			className={clsx(
				"max-vh--portrait fullscreen",
				isMobile ? "mobile" : "desktop-or-laptop",
				device && device,
				orientation,
				screenSize && `screen-size--${screenSize}`,
				// isMenuDrawerPermanent && "menu-drawer--is-permanent",
				className && className,
				`appbar--${isAppbarVisible ? "visible" : "hidden"}`
			)}
			onContextMenu={async (ev) => {
				//right click handler
				ev.preventDefault();
				const { target } = ev;
				if (!target) {
					return;
				}
				const readableElem = climbFrom(target).upTo({
					className: "readable",
					maxIterations: 6,
				});
				if (!readableElem) {
					ev.stopPropagation();
					return;
				}

				const text = readableElem.textContent;
				if (!text) {
					ev.stopPropagation();
					return;
				}

				await synthVoice.say(text);
				return;
			}}
		>
			<AppBar />
			{children}
		</div>
	);
};

EntireView.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default EntireView;
