import React, { useState, useContext, useEffect } from "react";

import { AppContext } from "../../contexts/AppContext.jsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

//add component-scoped styles (using MUI's CSS-in-JS solution)
const useStyles = makeStyles(theme => ({
	imageLoader: {
		opacity: 0,
		visibility: "hidden",
		height: 0,
		width: 0,
		padding: 0,
		margin: 0,
		position: "static"
	}
}));

let animationFrame;
let logg;
let promiseKeeper;

const createImage = (url = "", onDecoded = () => {}) => {
	if (!url) return null;
	return new Promise((resolve, reject) => {
		const image = new Image(0, 0); //invisible (still forces to load the image)
		image.style.opacity = 0.75; //just to be extra sure
		//image.classList.add("hidden");
		image.onload = ev => {
			image.decode().then(() => {
				logg(
					`loadImage(): image ${url} is loaded & decoded, ready to be inserted to the DOM.`
				);
				if (onDecoded) onDecoded(url);

				logg("image: ", image);
				// promiseKeeper.stall(100).then(() => {
				// 	image.parentNode.removeChild(image);
				// });
				return url;
			});
		};
		image.src = url;
		return resolve(image);
	});
};

const label = { label: "Imageloader" };

const Game = props => {
	const { imageUrl, onReady } = props;
	const [appState] = useContext(AppContext);
	const { issy, Logger } = appState;
	logg = logg || new Logger({ label }).logg;
	promiseKeeper = new issy.PromiseKeeper({ label });

	const [image, setImage] = useState({});
	const [insertImage, setInsertImage] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);
	const classes = useStyles();

	const onDecoded = res => {
		logg(res);
		setInsertImage(false);
		setImageLoaded(true);
		if (onReady) onReady(imageUrl);
	};

	useEffect(() => {
		// works sync-ly, so don't wait for promises here!
		createImage(imageUrl, onDecoded).then(url => {
			setInsertImage(true);
		});
		return () => {
			cancelAnimationFrame(animationFrame);
		};
	}, [imageUrl]); //on image change

	return (
		<div className={classes.imageLoader}>
			{insertImage ? <image /> : null}
		</div>
	);
};

Game.propTypes = {
	onReady: PropTypes.func,
	imageUrl: PropTypes.string
};

export default Game;
