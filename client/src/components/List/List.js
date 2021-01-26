import React, {
	useState,
	useContext,
	useRef,
	useEffect,
	useCallback,
} from "react";

import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import DURATIONS from "../../constants/durations.js";
import SplitText from "react-pose-text";
import { POSES } from "../../constants/poses.js";
import useLogg from "../../hooks/useLogg.jsx";
import StyledList from "./_List.scss";
import clsx from "clsx";
import Text from "../Text/Text.js";

let animationFrame;
const label = "ListContainer";

const HEADER_VARIANTS = ["h1", "h2", "marquee", "sub-marquee"];

const SHADOW_VARIANTS = ["none", "dark"];
const TEXT_LOOKS = ["cloudy", "flat"];

const ListContainer = React.forwardRef(
	(
		{
			h = "1",
			centered = false,
			variant = HEADER_VARIANTS[0],
			shadow = SHADOW_VARIANTS[0],
			textLook = TEXT_LOOKS[0],
			listItems,
			children,
		},
		ref
	) => {
		// const [appUtils] = useContext(AppContext);
		// const { Logger, PromiseKeeper } = appUtils;

		const { logg, loggError } = useLogg({ label });

		if (!listItems || !listItems) return null;

		const renderList = () => {
			return listItems.map((listItem) => {
				return (
					<li key={listItem} className="list-item">
						<Text>{listItem}</Text>
					</li>
				);
			});
		};

		return (
			<ul className={`list shadow--${shadow} textLook--${textLook}`}>
				{renderList()}
			</ul>
		);
	}
);

ListContainer.propTypes = {
	listItems: PropTypes.array,
	listItems: PropTypes.array,
};

export default ListContainer;
