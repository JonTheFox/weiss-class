import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import View from "../layout/View.jsx";
import "./_Tiles.scss";

const placeholderSrc = "../../assets/cloud_queue-24px.svg";

//let animationFrame;
let logg;
let promiseKeeper;
const label = "Tiles";

const Tiles = React.forwardRef((props, ref) => {
	const { on, getImage } = props;
	const { itemSelect, primaryAction } = on;
	const sharedRefs = props.sharedRefs || { current: { tiles: [] } };

	const [tiles, setTiles] = useState([]);

	const [appUtils] = useContext(AppContext);
	const { PromiseKeeper, Logger, emptyFunc } = appUtils;
	promiseKeeper = promiseKeeper || new PromiseKeeper({ label });
	logg = logg || new Logger({ label }).logg;

	useEffect(() => {
		if (sharedRefs && sharedRefs.current) {
			sharedRefs.current.setTiles = setTiles;
		}
	}, [sharedRefs]);

	useEffect(() => {
		//after a call to setTiles(), update the shared "tiles" property within sharedRefs, so that all components consuming it are in sync
		if (sharedRefs && sharedRefs.current) {
			sharedRefs.current.tiles = tiles;
		}
	}, [tiles, sharedRefs]);

	return (
		<View className={clsx("tiles")} ref={ref}>
			{tiles &&
				tiles.map((item, i) => {
					const { name, description, imageUrl } = item;
					// const  = images[0];

					const src =
						(getImage ? getImage(item) : imageUrl) ||
						placeholderSrc;
					return (
						<div
							className={clsx(
								"item has-after show-after",
								i % 2 === 0 ? "even" : "odd"
							)}
							key={"item" + i}
							id={item._id}
							onClick={itemSelect || emptyFunc}
						>
							<img src={src} alt={name} />
							<Button
								variant="outlined"
								className={"primary-action-btn centered"}
								onClick={primaryAction || emptyFunc}
							>
								{description || name || "   "}
							</Button>
						</div>
					);
				})}
		</View>
	);
});

Tiles.propTypes = {
	sharedRefs: PropTypes.objectOf(PropTypes.object), //a "setTiles" method will be added to sharedRefs, which will look like this : {current: {tiles: [], setTiles}}
	//setTiles will be used to re-render this component with new tiles, and this component will update the tiles field within sharedRefs.current
	on: PropTypes.objectOf(PropTypes.func),
	getImage: PropTypes.func
};

export default Tiles;
