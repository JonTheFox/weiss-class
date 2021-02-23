import React, {
	useContext,
	useState,
	useEffect,
	useRef,
	Suspense,
	useCallback,
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

const label = "VideoCentered";

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
		videoSet,
		caption = "",
	} = props;

	const isSoundOn = useRecoilValue(IsSoundOnState);

	const [isVideoPlaying, setIsVideoPlaying] = useState(false);

	// const { logg, loggError } = useLogg({ label });
	// const promiseKeeper = usePromiseKeeper({ label });

	// const renderTexts = () => {
	// 	if (!p || !p.length) return null;
	// 	return p.map((paragraph) => {
	// 		return <Text pClassName="">{paragraph}</Text>;
	// 	});
	// };

	//todo: use MediaContext to determine the size to diaply
	const videoSize = videoSet.fullHd
		? "fullHd"
		: videoSet.hdReady
		? "hdReady"
		: videoSet.tablet
		? "tablet"
		: videoSet.phone
		? "phone"
		: "small";

	const video = videoSet && { url: videoSet[videoSize] };

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
			{video && (
				<CenteredContainer style={{ zIndex: -1 }}>
					<VideoPlayer
						style={{
							position: "relative",
							zIndex: -1,
						}}
						video={video}
						controls={true}
						noInteraction={false}
						light={false}
						playing={true}
						loop={true}
						muted={!isSoundOn}
						volume={isSoundOn ? 0.25 : 0}
						scaleToFitViewport={false}
						startSecond={video.startSecond || 0}
						stopSecond={video.stopSecond}
						onPlay={() => {
							setIsVideoPlaying(true);
						}}
					></VideoPlayer>
					<PexelsLogo />
				</CenteredContainer>
			)}

			<Subtitle paragraphs={[caption]} />
			<Subtitle paragraphs={[caption]} />
		</StyledPage>
	);
};

export default VideoCentered;

/*{p && (
				<Page>
					{p.map((paragraph) => {
						return <Text>{paragraph}</Text>;
					})}
				</Page>
			)}*/
