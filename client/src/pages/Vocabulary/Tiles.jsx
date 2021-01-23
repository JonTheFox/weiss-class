import React, {
	useState,
	useContext,
	useRef,
	useEffect,
	useCallback,
} from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";
import useLogg from "../../hooks/useLogg.jsx";
import usePromiseKeeper from "../../hooks/usePromiseKeeper.jsx";
import View from "../../layout/View.jsx";

let animationFrame;
const label = "Game";

const Game = React.forwardRef((props, ref) => {
	const { rounds, onCorrect } = props;
	const [appUtils] = useContext(AppContext);
	const { our, request } = appUtils;
	const { logg, loggError } = useLogg({ label });
	const promiseKeeper = usePromiseKeeper({ label });

	useEffect(() => {
		return () => {
			window.cancelAnimationFrame(animationFrame);
		};
	}, []);

	return (
		<View className={clsx("label")} ref={ref}>
			{"New component, here.. :)"}
		</View>
	);
});

Game.propTypes = {
	rounds: PropTypes.object,
	onCorrect: PropTypes.func,
};

export default Game;
