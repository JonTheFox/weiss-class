import React, {
	useState,
	useContext,
	useRef,
	useEffect,
	useCallback
} from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";
import View from "../layout/View.jsx";

import Tenor from "react-tenor";
import "react-tenor/dist/styles.css";

import GifPlayer from "react-gif-player";
import "./_GifPlayer.scss";

let animationFrame;
let logg;
let loggError;
let promiseKeeper;
const label = "GifPlayer";

const TENOR_TOKEN = "KR119R5A4ZW5";

const GifPage = React.forwardRef((props, ref) => {
	const { rounds, onCorrect } = props;
	const [appUtils] = useContext(AppContext);
	const { Logger, PromiseKeeper } = appUtils;
	const [selectedGif, setSelectedGif] = useState();
	const sharedRefs = useRef({});

	useEffect(() => {
		promiseKeeper = new PromiseKeeper({ label });
		const logger = new Logger({ label });
		logg = logger.logg;
		loggError = logger.loggError;
		return () => {
			window.cancelAnimationFrame(animationFrame);
		};
	}, []);

	useEffect(() => {
		logg("selectedGif: ", selectedGif);
	}, [selectedGif]);

	return (
		<View
			className={clsx(
				"gif-player-wrapper gradient--2-colors",
				selectedGif && "gif--loaded"
			)}
			ref={ref}
		>
			<div className="react-tenor--wrapper position--relative">
				{" "}
				<Tenor
					token={TENOR_TOKEN}
					onSelect={result => setSelectedGif(result)}
					autoFocus
					searchPlaceholder={"search GIFs"}
				/>
			</div>

			<div className="gif_player--wrapper position--relative">
				<GifPlayer
					gif={selectedGif?.media?.[0]?.gif?.url}
					still={selectedGif?.media?.[0]?.gif?.preview}
					pauseRef={pause => (sharedRefs.current.pauseGif = pause)}
				/>
			</div>
		</View>
	);
});

GifPage.propTypes = {
	rounds: PropTypes.object,
	onCorrect: PropTypes.func
};

export default GifPage;
