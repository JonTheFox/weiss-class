import React, {
	useState,
	useContext,
	useRef,
	useEffect,
	useCallback,
} from "react";
//import PropTypes from "prop-types";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import Search from "@material-ui/icons/Search";
import Close from "@material-ui/icons/Close";
import VideoLibrary from "@material-ui/icons/VideoLibrary";
import CircularProgress from "@material-ui/core/CircularProgress";
import ENDPOINTS from "../../AJAX/ajax-endpoints.js";
import { AppContext } from "../../contexts/AppContext.jsx";
import { DeviceContext } from "../../contexts/DeviceContext.jsx";
import posed, { PoseGroup } from "react-pose";
// import { AwesomeButtonProgress } from "react-awesome-button";
// import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";

import { AwesomeButtonProgress, AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";
import VideoPlayer from "../partials/VideoPlayer.jsx";

import View from "../layout/View.jsx";
import Swiper from "../partials/Swiper.jsx";
import Feedback from "../partials/Feedback.jsx";
import "./_Lyrics.scss";
import "../../styles/_aws-btn.scss";

const BG_VIDEOS = [
	{
		originalTitle: "Flying into clouds, above clouds and around clouds",
		url: "https://www.youtube.com/watch?v=VmMYfAR21KY",
		startSecond: 60 * 1 + 38,
		stopSecond: 60 * 2 + 16,
		groupName: "Clouds",
		opacity: 0.3,
	},
	{
		originalTitle: "Flying Above the Clouds",
		url: "https://www.youtube.com/watch?v=6AJl7DsL-1Y",
		startSecond: 15,
		stopSecond: 60 * 5 + 50,
		groupName: "Clouds",
	},

	{
		originalTitle:
			"Softest Beach Sounds from the Tropics - Ocean Wave Sounds for Sleeping, Yoga, Meditation, Study",
		title: "Softest Beach Sounds from the Tropics",
		url: "https://www.youtube.com/watch?v=B1T06UhcX0Q",
		groupName: "Beach",
	},

	{
		originalTitle: "Relajarse: Sonidos del Mar, Playa HD - Relajación",
		title: "Relajarse",
		url: "https://www.youtube.com/watch?v=xkUyIYfmTmg",
		groupName: "Beach",
		opacity: 0.9,
	},

	{
		originalTitle:
			"Tropical Island Beach Ambience Sound - Thailand Ocean Sounds For Relaxation And Holiday Feeling",
		title: "Tropical Island Beach, Thailand",
		url: "https://www.youtube.com/watch?v=DGIXT7ce3vQ",
		startSecond: 5,
		groupName: "Beach",
	},
	{
		originalTitle: "Relaxar - Som do Mar e Praia Linda - Para Relaxar",
		title: "Relaxar",
		url: "https://www.youtube.com/watch?v=NKDhjZQFdS0",
		startSecond: 5,
		groupName: "Beach",
	},

	{
		originalTitle:
			"Onda Beach Relaxing Waves - Dominican Ocean Sounds Will Help You Unwind",
		title: "Dominican Ocean Beach",
		url: "https://www.youtube.com/watch?v=Xn8tufsbSz0",
		groupName: "Beach",
	},
	{
		originalTitle:
			"Olas del Paraíso - Playa Hermosa con Sonidos Relajantes del Mar sin Música",
		title: "Olas del Paraíso",
		url: "https://www.youtube.com/watch?v=2IcdEJ4Jhs0",
		groupName: "Beach",
	},
	{
		originalTitle:
			"Relaxing 3 Hour Video of A Tropical Beach with Blue Sky White Sand and Palm Tree",
		title: "Tropical Beach with Palm Tree",
		url: "https://www.youtube.com/watch?v=qREKP9oijWI",
		groupName: "Beach",
		opacity: 0.95,
	},

	{
		originalTitle: "Relaxing Music with Nature Sounds - Waterfall HD",
		title: "Waterfall",
		url: "https://www.youtube.com/watch?v=lE6RYpe9IT0",
		groupName: "Waterfall",
	},
	{
		originalTitle:
			"Relaxing Concentration Music: Study, Work – Focus – Soothing HD Nature Video",
		title: "Gorgeous Waterfall",
		url: "https://www.youtube.com/watch?v=SDZJElr9gFs",
		groupName: "Waterfall",
		startSecond: 33,
		stopSecond: 60 * 3,
	},
	{
		originalTitle:
			"Relaxing River Sounds - Gentle River, Nature Sounds, Singing Birds Ambience",
		title: "Running River Next to Mountains",
		url: "https://www.youtube.com/watch?v=LiiYMEWKVnY",
		groupName: "River",
	},
	{
		originalTitle:
			"Relaxing Music & Campfire - Relaxing Guitar Music, Soothing Music, Calm Music",
		title: "Campfire",
		url: "https://www.youtube.com/watch?v=EqqpcFj8G-s",
		startSecond: 11,
		groupName: "Campfire",
	},
	{
		originalTitle:
			"Crackling Mountain Campfire with Relaxing River, Wind and Fire Sounds (HD)",
		title: "Mountain Campfire",
		url: "https://www.youtube.com/watch?v=5gBJrZmbGLo",
		startSecond: 30,
		//stopSecond: 60 * 2 + 16,
		groupName: "Campfire",
	},

	{
		originalTitle:
			"Calmsound Antarctic Wind - 10 Hour Katabatic Wind Sounds for Sleep and Relaxation",
		title: "Anarctic Wind",
		url: "https://www.youtube.com/watch?v=9NmeAQruCgs",
		startSecond: 2 * 60,
		groupName: "Snow",
	},
	{
		originalTitle:
			"3 HOURS of Relaxing Snowfall: Beautiful Falling Heavy Snow - The Best Relax Music 1080p HD",
		title: "Falling Snow In a Forest",
		url: "https://www.youtube.com/watch?v=eS2ssUROF5o",
		startSecond: 6,
		groupName: "Snow",
	},
	{
		originalTitle:
			"Driving in Switzerland 6: From Grindelwald to Lauterbrunnen | 4K 60fps",
		title: "Switzerland Drive",
		url: "https://www.youtube.com/watch?v=b-WViLMs_4c",
		startSecond: 4 * 60 + 51,
		groupName: "Driving",
	},
	{
		originalTitle:
			"Zion Nationalpark - Scenic Drive, Utah - Full Ride - Onboard Front View",
		title: "Zion Nationalpark Drive",
		url: "https://www.youtube.com/watch?v=rXKt0qhFN-Y",
		startSecond: 60 * 1.5,
		stopSecond: 60 * 23,
		groupName: "Driving",
	},

	{
		originalTitle:
			"We bit off MUCH more than we could pedal | Mountain Biking Downieville",
		title: "Cycling Down a Mountain",
		url: "https://www.youtube.com/watch?v=xQTsfbUvWc4",
		startSecond: 60 * 4 + 28,
		stopSecond: 60 * 12 + 25,
		groupName: "Driving",
	},

	{
		originalTitle:
			"Full Race Replay: 2020 Daytona 500 | NASCAR at Daytona International Speedway",
		title: "Daytona Beach NASCAR race",
		url: "youtube.com/watch?v=tmfKfEZGxH4",
		startSecond: 60 * 32 + 47,
		stopSecond: 60 * 56 + 30,
		groupName: "Racing",
	},

	{
		originalTitle: "The Best Surfing Clips of 2019",
		title: "The Best Surfing Clips of 2019",
		url: "https://www.youtube.com/watch?v=hwLo7aU1Aas",
		startSecond: 18,
		groupName: "Surfing",
	},

	{
		originalTitle:
			"Sleep Music in Underwater Paradise: Deep Relaxing Music, Sleeping Music, Meditation Music 147",
		title: "Underwater Paradise",
		url: "https://www.youtube.com/watch?v=OVct34NUk3U",
		startSecond: 60 * 8,
		groupName: "Underwater",
	},
	{
		originalTitle: "Michael Jordan Top 50 All Time Plays",
		title: "Michael Jordan's Best Plays",
		url: "https://www.youtube.com/watch?v=LAr6oAKieHk",
		startSecond: 23,
		groupName: "Sports",
	},
];

let animationFrame;
let logg;
let loggError;
let promiseKeeper;
let overallLineIndex = 0;
const label = "LyricsPage";

const PROMISE_LABELS = {
	FOCUS_FIRST_LINE: "focusFirstLine",
};

const LyricsPage = React.forwardRef((props, ref) => {
	const {
		// cloudDesign = "oneCloud"
		// cloudDesign = "perSlide"
		cloudDesign = "narrowMarginTop",
	} = props;

	const mediaContext = useContext(DeviceContext);
	const [appUtils, appState] = useContext(AppContext);
	// const { user } = appState;
	const {
		Logger,
		PromiseKeeper,
		request,
		DURATIONS,
		handlePress,
		removePressHandlers,
		localStorage,
		climbFrom,
	} = appUtils;

	promiseKeeper = promiseKeeper || new PromiseKeeper({ label });

	const [artistName, setArtistName] = useState("");
	const [songTitle, setSongTitle] = useState("");
	const [lyrics, setLyrics] = useState([]);
	const [highlightWhite, setHighlightWhite] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(true);
	const [isSearching, setIsSearching] = useState(false);
	const [isNotFound, setIsNotFound] = useState(false);
	const [hasErrored, setHasErrored] = useState(false);
	const [hasSubmittedWithoutContent, setSubmittedWithoutContent] = useState(
		false
	);

	const [isModalOpenable, setIsModalOpenable] = useState(false);
	// const [isSliderView, setIsSliderView] = useState(false);
	const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

	const [isPlaying, setIsPlaying] = useState(false);
	const [video, setVideo] = useState(BG_VIDEOS[0]);
	const [showVideo, setShowVideo] = useState(true);

	const refs = useRef({
		artistName: "",
		songTitle: "",
		lines: [],
		//swiper_viewedItem: {},
		//swiper_activeStep: 0,
		//stanzasFirstIndex: []
	});

	const lang = useRef("en");
	const isSearchCancelled = useRef(false);

	const mapStanza = (refs, swiper_goToStep, stanza, stanzaIndex, _lyrics) => {
		//call this function with bind(null, refs)
		if (!stanza) return null;
		const { partType } = stanza;
		const lines = stanza.lines.map((line, lineIndexInStanza, _lines) => {
			if (stanzaIndex === 0 && lineIndexInStanza === 0) {
				//very first line. init
				overallLineIndex = 0;
				if (!refs.current.stanzasFirstIndex)
					refs.current.stanzasFirstIndex = [];
				if (!refs.current.stanzasLastIndex)
					refs.current.stanzasLastIndex = [];
				if (!refs.current.stanzasNumLines)
					refs.current.stanzasNumLines = [];
			} else {
				overallLineIndex++;
			}
			const _overallLineIndex = overallLineIndex;

			if (lineIndexInStanza === 0) {
				refs.current.stanzasFirstIndex[stanzaIndex] = _overallLineIndex;
			}

			if (lineIndexInStanza === _lines.length - 1) {
				//last line in stanza
				refs.current.stanzasLastIndex[stanzaIndex] = _overallLineIndex;
			}

			if (!stanza.lineRefs) {
				stanza.lineRefs = [];
			}

			return (
				<pre
					className={clsx(
						"line wrap-entire-lines stroke",
						highlightWhite
							? "highlight--white"
							: "highlight--black",
						`overall-line-index--${_overallLineIndex} readable`
					)}
					key={`line${_overallLineIndex}`}
					ref={(ref) => {
						if (!ref) return;
						stanza.lineRefs[lineIndexInStanza] = ref;
					}}
					//tabIndex={_overallLineIndex + 3}
				>
					{" "}
					{line}{" "}
				</pre>
			);
		});

		refs.current.lines = lines;

		// stanza.lineRefs
		// refs.current.lines = lines;

		return (
			<div
				className="stanza-wrapper margin--auto"
				key={`stanza-wrapper--${stanzaIndex}`}
			>
				<div
					className={clsx(
						"stanza",
						"stanza" + stanzaIndex,
						partType,
						cloudDesign === "perSlide" &&
							"has-before cloudy-top animation--paused---before"
					)}
					key={`stanza-${stanzaIndex + 1}`}
				>
					{lines}
				</div>
			</div>
		);
	};

	const findLyrics = useCallback(async (artist = "", title = "") => {
		if (!artist || !title) {
			return null;
		}
		try {
			const ajaxResult = await request(
				"POST",
				ENDPOINTS.lyrics.POST.find.path,
				{
					artist,
					title,
				}
			);

			if (isSearchCancelled.current) {
				return { userCancelled: true };
			}
			if (!ajaxResult || ajaxResult.error) {
				throw new Error(
					(ajaxResult && ajaxResult.error) || `AJAX request errored. `
				);
			}
			if (!ajaxResult || !ajaxResult.lyrics) {
				return { lyricsNotFound: true };
			}
			return ajaxResult;
		} catch (err) {
			logg(err);
			return { error: err.message };
		}
	});

	const prepareAndSearch = useCallback(
		async (form) => {
			try {
				const formData = new FormData(form);
				const artistInput = formData.get("artist_input");
				if (!artistInput) {
					setSubmittedWithoutContent(true);
					return null;
				}
				const songInput = formData.get("song_input");
				if (!songInput) {
					setSubmittedWithoutContent(true);
					return null;
				}

				logg(`Searching for the lyrics of:
		 ${artistInput} - "${songInput}"`);

				isSearchCancelled.current = false;
				setIsSearching(true);
				if (refs.current.searchBtn && refs.current.searchBtn.blur) {
					refs.current.searchBtn.blur();
				}

				setHasErrored(false);
				setIsNotFound(false);
				setSubmittedWithoutContent(false);

				const searchResult = await findLyrics(artistInput, songInput);

				setIsSearching(false);
				if (!searchResult || searchResult.error) {
					logg(
						"ERROR while fetching song lyrics: ",
						searchResult.error || "Client code error"
					);
					setHasErrored(true);
					return;
				}
				if (searchResult.userCancelled) {
					logg(
						"res was received, but user has cancelled it, so ignoring result."
					);
					isSearchCancelled.current = true;
					return;
				}
				if (searchResult.lyricsNotFound || !searchResult.lyrics) {
					logg(
						`Server: did not find the lyrics for ${artistInput} - ${songInput}`
					);
					setIsNotFound(true);
					return;
				}
				// lyrics were indeed found!
				const {
					title,
					artist,
					lyrics,
					lang: serverLang,
					//images
				} = searchResult;

				setArtistName(artist);
				setSongTitle(title);
				setLyrics(lyrics);
				if (refs.current.swiper_goToStep)
					refs.current.swiper_goToStep(0);
				lang.current = serverLang === "he" ? "he" : "en";
				logg(
					`Found lyrics for the song "${title}" by ${artist}`,
					lyrics
				);
				const lyricsWithoutRefs = [];
				let currentStanza;
				for (let i = 0; i < lyrics.length; i++) {
					currentStanza = lyrics[i]?.lines;

					if (currentStanza) {
						lyricsWithoutRefs[i] = { lines: currentStanza };
					}
				}

				localStorage.setObj("last_song", {
					lyrics: lyricsWithoutRefs,
					artist,
					title,
				});

				animationFrame = window.requestAnimationFrame(() => {
					setIsModalOpen(false);
				});
				return "success";
			} catch (err) {
				loggError(err.message);
				return null;
			}
		},
		[findLyrics, localStorage]
	);

	const focusFirstLine = () => {
		try {
			const { lyrics, swiper_activeStep } = refs.current;
			lyrics[swiper_activeStep].lineRefs[0].focus();
		} catch (err) {
			loggError(err.message);
		}
	};

	const removeTabIndexes = (elemRefs) => {
		if (!elemRefs || !elemRefs.length) {
			loggError("No elemRefs were passed to addTabIndexes");
			return null;
		}
		elemRefs = elemRefs.flat();
		for (let i = 0; i < elemRefs.length; i++) {
			const _elem = elemRefs[i];
			if (!_elem || !_elem.setAttribute) {
				loggError("an item in elemRefs was not a DOM element: ", _elem);
				return null;
			}

			_elem.setAttribute("tabindex", -1);
			const newTabIndex = _elem.getAttribute("tabindex");
			const _lineIndex = _elem.className.split(" ").slice(-1)[0];
			logg(`${_lineIndex} tabIndex: `, newTabIndex, _elem);
		}
	};

	const removeTabIndex = (elemRef) => {
		if (!elemRef) {
			loggError("removeTabIndex(): No elemRef was passed");
			return null;
		}
		if (!elemRef.setAttribute) {
			loggError(
				"removeTabIndex(): passed elemRef is not a DOM element",
				elemRef
			);
			return null;
		}
		elemRef.setAttribute("tabindex", -1);
		if (elemRef.className.split(" ").includes("overall-line-index--6")) {
			logg("overall-line-index--6 is now -1 ", elemRef);
		}
	};

	const addTabIndex = (elemRef, tabIndex = 1) => {
		if (!elemRef) {
			loggError("addTabIndex(): No elemRef was passed");
			return;
		}

		if (!elemRef.setAttribute) {
			loggError(
				"addTabIndex(): passed elemRef is not a DOM element",
				elemRef
			);
			return;
		}
		elemRef.setAttribute("tabindex", tabIndex);
		if (elemRef.className.split(" ").includes("overall-line-index--6")) {
			logg("overall-line-index--6 is now ", tabIndex, elemRef);
		}
	};

	const addTabIndexesToCurrentLines = (tabIndex = 1) => {
		const { swiper_activeStep, lyrics } = refs.current;
		const lines = lyrics[swiper_activeStep].lineRefs;

		if (!lines) {
			loggError("addTabIndexesToCurrentLines(): No lines found");
			return;
		}

		lines.forEach((line) => {
			addTabIndex(line, tabIndex);
		});
	};

	const removeTabIndexesFromCurrentLines = (tabIndex = 1) => {
		const { swiper_activeStep, lyrics } = refs.current;
		const lines = lyrics[swiper_activeStep].lineRefs;

		if (!lines) {
			loggError("addTabIndexesToCurrentLines(): No lines found");
			return;
		}

		lines.forEach((line) => {
			removeTabIndex(line);
		});
	};

	const focusElem = (elem) => {
		if (!elem) {
			loggError("focusElem() was called without an element ref");
			return null;
		}
		const tabIndex = elem.getAttribute("tabindex");
		//make element tab-able by JS
		elem.setAttribute("tabindex", -1);
		//focus it
		elem.focus();
		//now revert the element to be tab-able by HTML
		elem.setAttribute("tabindex", tabIndex);
	};

	const handleViewedItemChange = useCallback(({ step, item, items }) => {
		// promiseKeeper.reject({label: })
		const firstLineRef = item && item.lineRefs && item.lineRefs[0];

		if (!firstLineRef || !firstLineRef.focus) {
			loggError("handleViewedItemChange(): No firstLineRef element");
			return null;
		}

		promiseKeeper
			.stall(DURATIONS.enter * 1, PROMISE_LABELS.FOCUS_FIRST_LINE)
			.then(() => {
				const lines = items
					.reduce((accumulated, stanza, i) => {
						if (i === step) {
							logg(
								"skipped stanza that starts with ",
								stanza.lines[0]
							);
							return accumulated;
						}
						return [...accumulated, stanza.lineRefs];
					}, [])
					.flat();

				lines.forEach((line) => {
					removeTabIndex(line);
				});
				addTabIndexesToCurrentLines(1);
				focusElem(firstLineRef);
			})
			.catch((err) => {
				loggError(err.message || err);
			});
	});

	const renderSliderView = useCallback(() => {
		return (
			<Swiper
				sharedRefs={refs}
				className={clsx(
					"x-fast transition--opaque animation animation-delay--3"
				)}
				items={lyrics || []}
				mapItem={mapStanza.bind(
					null,
					refs,
					refs.current.swiper_goToStep
				)}
				onItemsLoaded={() => {
					if (lyrics && lyrics.length) {
						addTabIndexesToCurrentLines(1);
					}
				}}
				noFullscreen={true}
				size={mediaContext.screenSize}
				justifyContent="space-between"
				//onChange={handleViewedItemChange}
				onChangeIndex={handleViewedItemChange}
				onSwitching={(index, type) => {
					promiseKeeper.reject(
						PROMISE_LABELS.FOCUS_FIRST_LINE,
						"switching slide"
					);
				}}
			></Swiper>
		);
	});

	const handleBlur = async function() {
		// const isLastItem = this && this.isLastItem; //passed by handleBlur.bind()
		if (hasSubmittedWithoutContent) setSubmittedWithoutContent(false);
	};

	const toggleModal = () => {
		if (!isModalOpenable) setIsModalOpenable(true);
		animationFrame = window.requestAnimationFrame(() => {
			const _refs = refs;
			setIsModalOpen((isOpen) => {
				const { lyrics, swiper_activeStep } = _refs.current;

				const currentStanzaLines = lyrics[swiper_activeStep].lineRefs;
				if (isOpen) {
					//modal is closing to show the lyrics
					// make current stanza tab-able
					addTabIndexesToCurrentLines(1);

					//focus on stanza's first line
					promiseKeeper
						.stall(
							DURATIONS.enter,
							"focusFirstLineInCurrentStanza_onCloseModal"
						)
						.then(() => {
							focusFirstLine();
						});
					return false;
				}

				//Modal is opening
				removeTabIndexesFromCurrentLines();

				promiseKeeper
					.stall(DURATIONS.enter, "focusArtistInput_onOpenModal")
					.then(() => {
						//give focus to artist input element
						//make it JS-controlled
						const { artistInput } = _refs.current;
						focusElem(artistInput);
					});
				return true;
			});
		});
	};

	useEffect(() => {
		const logger = new Logger({ label });
		logg = logger.logg;
		loggError = logger.loggError;
		const lastSong = localStorage.getObj("last_song");
		if (!lastSong || !lastSong.lyrics || !lastSong.lyrics.length) {
			setIsModalOpen(true);
		} else {
			setLyrics(lastSong.lyrics);
			setArtistName(lastSong.artist);
			setSongTitle(lastSong.title);
			setIsModalOpen(false);
			logg("Pulled song from local storage: ", lastSong);
			promiseKeeper
				.stall(DURATIONS.enter * 4, "finished_transition_in_lyrics")
				.then(() => {
					animationFrame = window.requestAnimationFrame(() => {
						setHasTransitionedIn(true);
					});
				});
		}

		promiseKeeper
			.stall(2 * DURATIONS.enter, label + "_attachCloseHandler")
			.then(() => {
				handlePress({ key: "escape" }, toggleModal);
			})
			.catch((reason) => {
				loggError(reason);
			});

		appState.setSearchables({
			placeholder: "Background",
			options: BG_VIDEOS,
			getOptionsLabel: (option) => {
				if (!option) {
					return "no label";
				}
				return option.title || option.originalTitle;
			},
			onChange: (searchable) => {
				logg("searchable: ", searchable);
				if (!searchable || !searchable.url) {
					loggError(
						"Option is null or doesnt contain a URL. staying with current video."
					);
					return null;
				}
				setVideo(searchable);
			},
		});

		return () => {
			window.cancelAnimationFrame(animationFrame);
			removePressHandlers();
		};
	}, []);

	useEffect(() => {
		refs.current.lyrics = lyrics;
		logg("lyrics: ", lyrics);
	}, [lyrics]);

	const { screenSize } = mediaContext;
	const fabSize = ["small", "medium", "large"].includes(screenSize)
		? screenSize
		: "medium";

	return (
		<View
			className={clsx(
				"lyrics-page max-height portrait-only--phone",
				cloudDesign && `cloud-design--${cloudDesign}`,
				isModalOpen && "modal-is-open",
				showVideo && "show-video",
				isPlaying && "video-player--playing"
			)}
			ref={ref}
		>
			<div
				className={clsx(
					"main-page",
					isModalOpen && "modal-is-open",
					lang.current
				)}
			>
				{showVideo && (
					<VideoPlayer
						controls={false}
						noInteraction={true}
						light={false}
						loop={true}
						playing={true}
						muted={true}
						volume={0}
						video={video}
						scaleToFitViewport={true}
						fadeFromEnd={true}
						startSecond={video.startSecond || 0}
						stopSecond={video.stopSecond}
						onPlay={() => {
							setIsPlaying(true);
						}}
					></VideoPlayer>
				)}{" "}
				<h1
					className={clsx(
						"song-info-section",
						hasTransitionedIn ? "overflow-auto" : "overflow-hidden"
					)}
				>
					<span
						className={clsx(
							"song-title rise-up scale-on-hover readable"
						)}
						variant="h5"
						component="h1"
						tabIndex={1}
					>
						{songTitle}
					</span>
					<span
						className={clsx(
							"artist-name scale-on-hover rise-up animation-delay--1 readable",
							lyrics && "has-before"
						)}
						tabIndex={1}
					>
						{artistName}
					</span>
				</h1>
				<div
					className={clsx(
						"lyrics-section",
						!isPlaying &&
							"show-after slow after--running has-before before--sun---up show-before",
						!isPlaying &&
							["oneCloud", "narrowMarginTop"].includes(
								cloudDesign
							) &&
							"has-after cloudy-top"
					)}
				>
					<pre className={clsx("lyrics fullsize slider-view")}>
						{renderSliderView()}
					</pre>
				</div>
			</div>
			<div
				className={clsx(
					"modal vh-max--portrait---minus-appbar vw-full portrait-only--phone",
					isModalOpen ? "modal-is-open fade-in" : "fade-out"
				)}
			>
				<div
					className={clsx(
						"modal--inner search-section vh-max--portrait---minus-appbar vw-full flex"
					)}
				>
					<div className="form-container">
						<form
							className={clsx("search-form flex")}
							autoComplete="on"
							name="theForm"
							ref={(ref) => (refs.current.form = ref)}
							onSubmit={(ev) => {
								ev.preventDefault();
								const form = ev.target;
								prepareAndSearch(form);
							}}
						>
							<TextField
								className={"text-input artist-input"}
								name={"artist_input"}
								label={"Artist"}
								margin="normal"
								variant="standard" //or: "outlined", "filled"
								fullWidth
								defaultValue={refs.current.artistName}
								onChange={(ev) =>
									(refs.current.artistName = ev.target.value)
								}
								onBlur={handleBlur}
								ref={(ref) => {
									if (!ref) return;
									const inputElem = ref.querySelector(
										"[name=artist_input]"
									);
									if (!inputElem) {
										loggError(
											"Did not find the input element inside TextField ref. Check the selector"
										);
										return;
									}

									refs.current.artistInput = inputElem;
								}}
							/>

							<TextField
								className={"text-input song-input"}
								label={"Song"}
								margin="normal"
								name={"song_input"}
								variant="standard" //or: "outlined", "filled"
								fullWidth
								defaultValue={refs.current.songTitle}
								onChange={(ev) =>
									(refs.current.songTitle = ev.target.value)
								}
								onBlur={handleBlur.bind({ isLastItem: true })}
								ref={(ref) => (refs.current.songInput = ref)}
							/>
							<input type="submit" style={{ display: "none" }} />
							<AwesomeButton
								type="primary"
								disabled={isSearching}
								className={"awesome-search-btn"}
								loadingLabel={"Searching for it.."}
								releaseDelay={500}
								ref={(ref) => (refs.current.searchBtn = ref)}
								onPress={async (target) => {
									try {
										const form = refs.current.form;
										const result = await prepareAndSearch(
											form
										);
										return;
									} catch (err) {
										console.log(err.message);
									}
								}}
								tabIndex={0}
							>
								{isSearching
									? "searching lyrics..."
									: "Find lyrics"}
							</AwesomeButton>
						</form>

						<Feedback
							className={clsx(
								"error-msg",
								(hasErrored ||
									isNotFound ||
									hasSubmittedWithoutContent) &&
									"fade-in"
							)}
							show={
								hasErrored ||
								isNotFound ||
								hasSubmittedWithoutContent
							}
						>
							{isNotFound
								? "Hmm. Lyrics were not found. Try cchanging the spelling, maybe?"
								: hasErrored
								? "You might want to check your internet connection"
								: hasSubmittedWithoutContent
								? "Please enter both the name of the artist and the song's title."
								: ""}
						</Feedback>
					</div>
				</div>
			</div>

			<Zoom
				in={!isModalOpen}
				//|| (artistName && songTitle)
				style={{
					transitionDelay: DURATIONS.enter + "ms",
				}}
			>
				<Fab
					aria-label={clsx("fab fab-search")}
					//<Search className={"search-icon"} />
					//size="medium"
					size={fabSize}
					className={clsx("fab fab-search")}
					color="primary"
					onClick={toggleModal}
					tabIndex={0}
				>
					<Search className={"search-icon"} />
				</Fab>
			</Zoom>
			<Zoom
				in={Boolean(lyrics && lyrics.length && isModalOpen)}
				//|| (artistName && songTitle)
				style={{
					transitionDelay: DURATIONS.enter + "ms",
				}}
			>
				<Fab
					aria-label={clsx("fab fab-close")}
					size={fabSize}
					className={clsx("fab fab-close")}
					color="primary"
					onClick={toggleModal}
					tabIndex={0}
				>
					<Close className={"close-icon"} />
				</Fab>
			</Zoom>
		</View>
	);
});

// LyricsPage.propTypes = {
// 	rounds: PropTypes.object,
// 	onCorrect: PropTypes.func
// };

export default LyricsPage;

/*
<AwesomeButtonProgress
							type="primary"
							ripple="true"
							action={async (element, next) => {
								next();
								try {
									const form = refs.current.form;
									await prepareAndSearch(form);
									next();
								} catch (err) {
									console.log(err.message);
									next();
								}
							}}
						>
							Button
						</AwesomeButtonProgress>
*/

/*
old button
<Button
							ref={ref => (refs.current.searchBtn = ref)}
							className={clsx(
								"search-btn",
								isSearching && "is-searching"
							)}
							variant="contained"
							color="primary"
							onClick={ev => {
								const form = refs.current.form;
								prepareAndSearch(form);
							}}
							disabled={isSearching}
							tabIndex={0}
						>
							<div className={"find-lyrics"}>
								{isSearching ? "Searching..." : "Find lyrics"}
							</div>
							<div
								className={clsx(
									"spinner-container",
									isSearching && "show-spinner"
								)}
							>
								<CircularProgress
									className={"spinner"}
									size={38}
								/>
							</div>
							<div
								className={clsx(
									"cancel-container",
									isSearching && "show-cancel"
								)}
								onClick={ev => {
									setIsSearching(false);
									isSearchCancelled.current = true;
								}}
							>
								<Close className={clsx("close-icon")} />
							</div>
						</Button>
*/

/*
pre

	onFocus={(ev) => {
						const lineElem = ev.target;

						const overallLineIndex = lineElem.className
							.split(" ")
							.find((_className) =>
								_className.startsWith("overall-line-index")
							)
							.split("--")[1];
						const {
							stanzasFirstIndex,
							stanzasLastIndex,
							swiper_activeStep,
						} = refs.current;
						const stanzaIndex = swiper_activeStep;
						const firstIndexInStanza =
							stanzasFirstIndex[stanzaIndex];
						const lastIndexInStanza = stanzasLastIndex[stanzaIndex];
						if (
							overallLineIndex < firstIndexInStanza ||
							overallLineIndex > lastIndexInStanza
						) {
						}
					}}

*/
