import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import View from "../layout/View.jsx";
import { makeStyles } from "@material-ui/styles";
import "./_Spinner.scss";
import clsx from "clsx";

import posed from "react-pose";
import { POSES } from "../../constants/poses.js";

const DRAGGABLE_POSE = {
	draggable: true,
	dragEnd: {
		x: 0,
		y: 0, //spring back to original position
		transition: {
			type: "spring",
			mass: 2,
		},
	},
};

const PosedContainer = posed.div(DRAGGABLE_POSE);

const useStyles = makeStyles((theme) => ({
	spinner: (props) => ({
		backgroundImage:
			"linear-gradient(345deg, var(--white), var(--transparent-secondary))",
		backgroundOrigin: "border-box",
		borderRadius: "50%",
		padding: 0.8,
		margin: "auto",
		opacity: 1,
		color: "white",
		"& svg": {
			// color: "white",
			opacity: 0.5,
		},
	}),
}));

const WeissSpinner = (props) => {
	const { className, style } = props;
	const classes = useStyles();
	return (
		<View
			//animate={true}
			//transition={"fadeIn"}
			className={clsx(
				"spinner-view flex cloud-up centered fixed",
				className && className
			)}
			style={style || {}}
		>
			<PosedContainer>
				<div className="tight-container">
					<CircularProgress
						className={clsx("weiss-spinner", classes.spinner)}
						size={60}
					/>
				</div>
			</PosedContainer>
		</View>
	);
};

export default WeissSpinner;
