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
import VideoPlayer from "../../VideoPlayer/VideoPlayer.jsx";
//import PropTypes from "prop-types";
// import clsx from "clsx";

// import useLogg from "../../../hooks/useLogg.jsx";
// import usePromiseKeeper from "../../../hooks/usePromiseKeeper.jsx";

// import { localStorage } from "../../../../lib/issy/index.js";
import StyledPage from "../Page.styles.js";
import Subtitle from "../../Subtitle/Subtitle.js";
import IsSoundOnState from "../../../store/isSoundOn.selector.js";
import { useRecoilValue } from "recoil";

const label = "VideoWithContent";

const VideographerCredit = ({ name = "", url = "" }) => {
	const creditText = name
		? `Video by ${name} from Pexels`
		: "Video from Pexels";
	const _url = name ? url : "www.pexels.com";

	return (
		<Text
			variant="small"
			className="photographer-credit"
			style={{
				position: "absolute",
				//bottom: 0,
				right: 0,

				fontSize: "0.5rem",
			}}
		>
			<a href={_url} style={{ color: "inherit", textDecoration: "none" }}>
				{creditText}
			</a>
		</Text>
	);
};

// const PexelsLogo = () => {
// 	return (
// 		<Grid item style={{ position: "absolute", bottom: 0, right: 0 }}>
// 			<a href="https://www.pexels.com">
// 				<img
// 					src="https://images.pexels.com/lib/api/pexels.png"
// 					style={{ width: "100px", padding: "var(--spacing)" }}
// 				/>
// 			</a>
// 		</Grid>
// 	);
// };

const VideoWithContent = (props) => {
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

	const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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
			<CenteredContainer>
				<Heading h="1">{heading}</Heading>
				<Heading h="2">{subheading}</Heading>
			</CenteredContainer>

			<CenteredContainer style={{ zIndex: -1 }}>
				<Subtitle
					paragraphs={paragraphs}
					variant="default"
					size="regular"
				/>
				<VideographerCredit
					name={videoUser.name || ""}
					url={videoUser.url || ""}
				/>
			</CenteredContainer>
		</StyledPage>
	);
};

export default VideoWithContent;
