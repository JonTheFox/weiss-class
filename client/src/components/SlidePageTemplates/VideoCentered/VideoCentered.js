import React, {
	useContext,
	useState,
	useEffect,
	useRef,
	Suspense,
	useCallback,
	Fragment,
} from "react";
import CenteredContainer from "../../CenteredContainer/CenteredContainer.js";
import Grid from "@material-ui/core/Grid";
import Heading from "../../Heading/Heading.js";
import View from "../../layout/View.jsx";
import Page from "../Page.js";
import Text from "../../Text/Text.js";
//import VideoPlayer from "../../VideoPlayer/VideoPlayer.jsx";
//import PropTypes from "prop-types";
// import clsx from "clsx";

// import useLogg from "../../../hooks/useLogg.jsx";
// import usePromiseKeeper from "../../../hooks/usePromiseKeeper.jsx";

// import { localStorage } from "../../../../lib/issy/index.js";
import StyledPage from "../Page.styles.js";
import Subtitle from "../../Subtitle/Subtitle.js";
import IsSoundOnState from "../../../store/isSoundOn.selector.js";
import { useRecoilValue } from "recoil";

const label = "VideoCentered";

const VideographerCredit = ({ name = "", url = "" }) => {
	const creditText = name
		? `Video by ${name} from Pexels`
		: "Video by Pexels";
	const _url = name ? url : "www.pexels.com";
	return (
		<Text
			variant="small"
			className="photographer-credit"
			style={{
				position: "absolute",
				bottom: 0,
				left: 0,

				fontSize: "0.5rem",
			}}
		>
			<a href={_url} style={{ color: "inherit", textDecoration: "none" }}>
				{creditText}
			</a>
		</Text>
	);
};

const PexelsLogo = () => {
	return (
		<Grid item style={{ position: "absolute", bottom: 0, right: 0 }}>
			<a href="https://www.pexels.com">
				<img
					src="https://images.pexels.com/lib/api/pexels.png"
					style={{ width: "100px", padding: "var(--spacing)" }}
				/>
			</a>
		</Grid>
	);
};

const VideoCentered = (props) => {
	// const [appUtils] = useContext(AppContext);
	// const { PromiseKeeper, Logger } = appUtils;
	const {
		heading = "",
		subheading = "",
		paragraphs = [""],
		bgImage = "",
		videoSet = {},
		caption = "",
	} = props;

	const isSoundOn = useRecoilValue(IsSoundOnState);

	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });

	//todo: use MediaContext to determine the size to display
	const links = videoSet.links || {};
	const videoSize = links?.fullHd
		? "fullHd"
		: links.hdReady
		? "hdReady"
		: links.tablet
		? "tablet"
		: links.phone
		? "phone"
		: "phone";

	const video = videoSet &&
		videoSet.links && { url: videoSet.links[videoSize] };
	const videoUser = videoSet.user || {};

	return (
		<StyledPage className={"Page Page--video-centered"}>
			<div className="Headings-Container">
				<Heading variant="marquee" shadow="dark" textLook="flat">
					{heading}
				</Heading>
				<Heading
					h="2"
					variant="sub-marquee"
					textLook="flat"
					shadow="dark"
				>
					{subheading}
				</Heading>
			</div>

			<Subtitle paragraphs={paragraphs} variant="footer" size="regular" />
			{video && (
				<VideographerCredit
					name={videoUser.name || ""}
					url={videoUser.url || ""}
				/>
			)}
		</StyledPage>
	);
};

export default VideoCentered;
