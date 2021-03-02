import React, {
	useState,
	useContext,
	useRef,
	useEffect,
	useCallback,
} from "react";
import { AppContext } from "../../contexts/AppContext.jsx";
import { DeviceContext } from "../../contexts/DeviceContext.jsx";
import useLogg from "../../hooks/useLogg.jsx";
import usePromiseKeeper from "../../hooks/usePromiseKeeper.jsx";

import PropTypes from "prop-types";
import clsx from "clsx";

import ReactPlayer from "react-player";

import View from "../layout/View.jsx";
import "./_VideoPlayer.scss";

let animationFrame;
const label = "VideoPlayer";

const isValidVideo = (video) => {
	if (!video) return null;
	const { links } = video;
	if (!links) return false;
	return (
		links.phone ||
		links.tablet ||
		links.hdReady ||
		links.fullHd ||
		links.fourK
	);
};

const getVideoSize = ({
	device,
	phone,
	tablet,
	largeScreen,
	xlScreen,
	images = {},
}) => {
	if (!device || !images) return null;
	let videoSize;
	switch (device) {
		case "fourK":
			if (images.fourK) {
				videoSize = "fourK";
				break;
			}

		case "xlScreen":
			if (images.xlScreen) {
				videoSize = "fullHd";
				break;
			}
		case "largeScreen":
			if (images.largeScreen) {
				videoSize = "hdReady";
				break;
			}

		case "tablet":
			if (images.tablet) {
				videoSize = "tablet";
				break;
			}

		default:
			videoSize = "phone";
			break;
	}
	return videoSize;
};

const VideoPlayer = React.forwardRef((props, ref) => {
	// const { startSecond = 0, stopSecond } = props;
	const [appUtils] = useContext(AppContext);
	const { DURATIONS } = appUtils;
	const deviceState = useContext(DeviceContext);
	const { loggError } = useLogg({ label });
	const promiseKeeper = usePromiseKeeper({ label });

	const [video, setVideo] = useState(props.video || {});
	const [videoUrl, setVideoUrl] = useState("");
	const [videoSize, setVideoSize] = useState("phone");

	const refs = useRef({ videoPlayer: {} });
	const [isPlaying, setIsPlaying] = useState(false);

	const [playing] = useState(props.playing);
	const [controls] = useState(props.controls || props.controls === undefined);
	const [light] = useState(props.light);
	const [volume] = useState(props.volume || 0.8);
	const [muted] = useState(props.muted || false);
	//const [played, setPlayed] = useState(0);
	//const [loaded, setLoaded] = useState(0);
	//const [duration, setDuration] = useState(0);
	//const [playbackRate, setPlaybackRate] = useState(1.0);
	const [loop] = useState(props.loop);
	const [faded, setFaded] = useState(true);
	const [fadeFromEnd] = useState(props.fadeFromEnd);
	const [fadeInWhenReady] = useState(
		props.fadeInWhenReady || props.fadeInWhenReady === undefined
	);
	const [noInteraction] = useState(props.noInteraction);

	const setVideoOpacity = useCallback(() => {
		refs.current.videoPlayer.ref.wrapper.style.setProperty(
			"opacity",
			props.video?.opacity || 1
		);
	}, [refs, props.video]);

	useEffect(() => {
		promiseKeeper.stall(200, "setVideoOpacity").then(() => {
			setVideoOpacity();
		});
	}, [video]);

	const handleReady = (reactPlayerComponent) => {
		//put the current player in a closure
		const _player = reactPlayerComponent;
		//jump to start position, if one was specified
		if (!video.startSecond || video.startSecond === 0) {
			promiseKeeper.stall(DURATIONS.enter * 4, "seekStart").then(() => {
				setFaded(false);
			});

			return;
		}

		const _startSecond = video.startSecond;

		window.requestAnimationFrame(() => {
			// setFaded(true);
			promiseKeeper.stall(DURATIONS.enter * 2, "seekStart").then(() => {
				_player.seekTo(_startSecond, "seconds");
				animationFrame = window.requestAnimationFrame(() => {
					promiseKeeper
						.stall(DURATIONS.enter * 2, "fadeIn")
						.then(() => {
							//set the opacity of the current video opacity according to custom setting
							//and now finally show the video
							setFaded(false);

							// promiseKeeper
							// 	.stall(2500, "setVideoOpacity")
							// 	.then(() => {
							// 		setVideoOpacity();
							// 		debugger;
							// 	});

							if (props.onReady) props.onReady(_startSecond);
						})
						.catch((reason) => {
							// setFaded(false);
							loggError(reason);
						});
				});
			});
		});
	};

	const handleEnded = () => {
		const { startSecond } = video;
		if (startSecond) {
			if (fadeFromEnd) {
				window.requestAnimationFrame(() => {
					setFaded(true);
					promiseKeeper
						.stall(DURATIONS.enter * 10, "fadeFromEnd")
						.then(() => {
							refs.current.videoPlayer.ref.seekTo(
								startSecond,
								"seconds"
							);
							setFaded(false);
						})
						.catch((reason) => {
							setFaded(false);
							loggError(reason);
						});
				});

				return;
			}
			refs.current.videoPlayer.ref.seekTo(startSecond, "seconds");
		}
	};

	const handleProgress = ({
		playedSeconds,
		played,
		loadedSeconds,
		loaded,
	}) => {
		const { stopSecond, startSecond } = video;
		if (stopSecond && playedSeconds >= stopSecond) {
			if (!refs.current.videoPlayer) {
				loggError(
					"Can't seek back to provided startTime. Reason: videoPlayer is not stored inside refs."
				);
				return null;
			}
			if (fadeFromEnd) {
				setFaded(true);
				window.requestAnimationFrame((timestamp) => {
					refs.current.videoPlayer.ref.seekTo(
						startSecond || 0,
						"seconds"
					);
					promiseKeeper
						.stall(DURATIONS.enter * 10, "fadeFromEnd")
						.then(() => {
							window.requestAnimationFrame((timestamp) => {
								setFaded(false);
							});
						})
						.catch((reason) => {
							loggError(reason);
						});
				});

				return;
			}

			refs.current.videoPlayer.ref.seekTo(startSecond || 0, "seconds");
		}
	};

	const handlePlay = () => {
		setIsPlaying(true);
		// setFaded(false);
		if (props.onPlay) props.onPlay();
	};

	useEffect(() => {
		const { phone, tablet, largeScreen, xlScreen, fourK } = deviceState;
		const currentVideoSize = getVideoSize({
			device: deviceState.device,
			images: video?.images,
			phone,
			tablet,
			largeScreen,
			xlScreen,
			fourK,
		});
		if (currentVideoSize !== videoSize) {
			setVideoSize(currentVideoSize);
		}
	}, [deviceState]);

	useEffect(() => {
		setVideoUrl(video?.links?.[videoSize]);
	}, [videoSize]);

	useEffect(() => {
		refs.current.video = props.video;
		if (!isValidVideo(props.video)) return;

		if (fadeInWhenReady) {
			setFaded(true);
		}
		setVideo(props.video);
		promiseKeeper.stall(750, () => {
			refs.current.videoPlayer.ref.wrapper.style.opacity =
				ref.current.video?.opacity || 1;
		});
	}, [props.video]);

	useEffect(() => {
		const { phone, tablet, largeScreen, xlScreen, fourK } = deviceState;
		setVideoUrl(
			video?.links?.[
				getVideoSize({
					device: deviceState.device,
					images: video?.images,
					phone,
					tablet,
					largeScreen,
					xlScreen,
					fourK,
				})
			]
		);
	}, [video]);

	return (
		<View
			fullsize={false}
			className={clsx(
				"VideoPlayer",
				isPlaying && "react-player--playing",
				(props.fullHeight === undefined || props.fullHeight) &&
					"react-player--full-height",

				props.scaleToFitViewport &&
					"react-player--scale-to-fit-viewport",
				noInteraction && "react-player--no-interaction",
				faded && "video-player--faded"
			)}
			ref={ref}
			{...props}
		>
			<ReactPlayer
				className={clsx("react-player")}
				url={videoUrl}
				width="100%"
				height="100%"
				playing={playing}
				loop={loop}
				onPlay={handlePlay}
				ref={(ref) => {
					if (!ref) return;
					refs.current.videoPlayer.ref = ref;
					// ref.wrapper.style.setProperty("transform", "all 0.2s");
				}}
				onReady={handleReady}
				onSeek={props.handleSeek}
				onEnded={handleEnded}
				muted={muted}
				volume={volume}
				onProgress={handleProgress}
				light={light} //light player means that it starts with only a thumbnail and await clicking on it
				//width="100%"
				controls={controls}
			>
				{props.children}
			</ReactPlayer>
		</View>
	);
});

VideoPlayer.propTypes = {
	startSecond: PropTypes.number,
};

export default VideoPlayer;
