import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
//import Paper from '@material-ui/core/Paper';
//import Typography from '@material-ui/core/Typography';
import ImageCard from "./ImageCard.js";
import SearchInput from "./SearchInput.js";
import Unsplash from "unsplash-js";
import posed, { PoseGroup } from "react-pose";
import Button from "@material-ui/core/Button";

const AnimatedCard = posed.li({
	enter: {
		opacity: 1,
		transition: ({ i, numItems }) => ({
			duration: 350,
			delay: numItems - i * 50
		})
	},
	exit: { opacity: 0, duration: 200 },
	props: { i: 0, numItems: 0 }
});

const styles = theme => ({
	root: {
		maxHeight: "auto",
		margin: "auto",
		position: "relative",
		minHeight: "10%",
		width: "100%",
		display: "flex",
		flexWrap: "wrap",
		overflow: "hidden",
		flexDirection: "column",
		alignItems: "flex-end",
		alignContent: "space-between",
		jusifityItems: "space-between",
		jusifityContent: "space-between",
		flexBasis: "20%",
		fontSize: "0.75rem"
		// flexBasis: 100
		//backgroundColor: theme.palette.paper
	},
	searchBar: {
		padding: `${theme.spacing.unit * 0.5}px`,
		margin: "auto"
	},
	row: {
		width: "100%",
		clear: "both",
		position: "relative",
		display: "flex",
		overflow: "hidden",
		// minHeight: "2rem",
		height: "auto",
		margin: "auto",
		padding: `${theme.spacing.unit * 0.5}px`
	},
	searchInput: {
		background: "hsla(0, 0%, 100%, .6)",
		top: 0,
		left: 0,
		zIndex: 100
	},
	header: {
		position: "relative",
		boxSizing: "border-box",

		width: "100%",
		height: "auto",
		display: "flex",
		alignContent: "space-evenly",
		alignItems: "space-evenly",
		justifyItems: "space-evenly",
		justifyContent: "space-evenly",
		padding: `${theme.spacing.unit * 1}`,
		margin: 0
	},

	findMoreBtn: {
		margin: `${theme.spacing.unit * 3}px auto`,
		fontSize: "1rem",
		width: "auto",
		height: "auto",
		padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 4}px`
	},
	foundImages: {
		width: "100%",
		height: "auto",
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		overflow: "hidden",
		padding: 0,
		margin: 0,
		jusifityItems: "space-evenly",
		justifyContent: "space-evenly",
		alignContent: "space-evenly",
		alignItems: "space-evenly"
	},
	item: {
		//minWidth: "9.25rem",
		//maxWidth: "600",
		boxSizing: "border-box",
		height: "auto",
		listStyle: "none",
		fontSize: "1rem",
		fontWeight: "normal",
		margin: 0,
		paddingBottom: `${theme.spacing.unit * 1}px`,
		[theme.breakpoints.down("xs")]: {
			width: "47%"
		},
		[theme.breakpoints.up("sm")]: {
			width: "32%"
		},
		[theme.breakpoints.up("md")]: {
			width: "23.5%"
		},
		[theme.breakpoints.up("lg")]: {
			width: "19.5%"
		},
		[theme.breakpoints.up("xl")]: {
			width: "15%"
		}
	},

	container: {
		display: "flex",
		flexWrap: "wrap"
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit
	},
	dense: {
		marginTop: 16
	},
	menu: {
		width: 200
	}
});

class ImageFetcher extends Component {
	state = {
		items: [],
		query: "",
		isLoading: false,
		displayedImages: null,
		selectedItem: { id: -1 },
		numItemsFound: { pig: 0 },
		searchMode: false
	};

	fetchAnimals = async (animalName, num = 12, addToExisting = false) => {
		return new Promise(async (resolve, reject) => {
			const { logg } = this.props;
			try {
				if (!animalName) return reject(null);

				const { numItemsFound } = this.state;

				if (!numItemsFound[animalName]) {
					numItemsFound[animalName] = 0;
					logg(this)(
						`creating a new results entry for "${animalName}"`
					);
				}

				const APP_ACCESS_KEY =
					"ce665e1b0c3a7efb0c8bc47b4435a923c49724537447ccbbd2aef973dc7ee7d4";
				const APP_SECRET =
					"353e8bdb91ca337e635cbf2b39e81bf8a760a8a9c0f5374bb66b235cc2aa702a";

				const unsplash = new Unsplash({
					applicationId: APP_ACCESS_KEY,
					secret: APP_SECRET,
					callbackUrl: ""
				});
				const keywords = [""];
				const keyword = animalName + " " + keywords.join(" ");
				const perPage = num;
				const pageNumber =
					parseInt(numItemsFound[animalName] / perPage, 10) + 1;
				logg(this)(
					`Searching for "${animalName}", starting from page ${pageNumber}`
				);

				// const unsplashURL =
				// 	"https://api.unsplash.com/users/:JonTheFox/collections";
				const collectionIds = "2348193/fox";

				const res = await unsplash.search.photos(
					keyword,
					pageNumber,
					perPage,
					collectionIds
				);
				const json = await res.json();
				const newItems = json.results.map((image, i) => {
					return {
						label: animalName,
						url: image.urls.small,
						index: i,
						domRef: null
					};
				});

				if (newItems.length <= 0)
					return reject("Could not fetch images from UNSPLASH");

				numItemsFound[animalName] += newItems.length;
				logg(this)(
					`Found ${newItems.length} new ${animalName} images. Total: ${numItemsFound[animalName]}. `,
					newItems
				);

				const joinedItems = addToExisting
					? [...this.state.items, ...newItems]
					: newItems;
				this.setState({
					items: joinedItems,
					numItemsFound
				});

				return resolve(joinedItems);
			} catch (err) {
				logg(this)(err);
				return reject(err);
			}
		});
	};

	handleClick = (e, item, i) => {
		// const { logg, issy } = this.props;
		// const { copyToClipboard } = issy;
	};

	parseAnimal = (text = "") => {
		const { logg } = this.props;
		if (!text) {
			console.warn("parseAnimal:: No text provided. Returning null.");
			return null;
		}

		function getFirstMatchIn(obj, valToMatch) {
			if (!obj) {
				return null;
			}

			for (let animal in obj) {
				if (obj.hasOwnProperty(animal)) {
					if (valToMatch === animal) {
						return animal;
					}
				}
			}

			logg(this)(
				`parseAnimal():: getFirstMatchIn()::  Did not match any animal with text "${valToMatch}".`
			);
			return null;
		}

		const { animals, supportedAnimals } = this.state;

		try {
			const firstLetter = text[0];

			//First, look for the animal in this.state.animals
			let matchedAnimal;
			let animalsInIndex = animals[firstLetter];

			if (!animalsInIndex) {
				//create new index letter
				logg(this)(
					"parseAnimal():: creating new letter index, for the letter " +
						firstLetter.toUpperCase()
				);
				animals[firstLetter] = {};
			} else {
				logg(this)(
					`parseAnimal():: animalsInIndex (inside application state) === ${JSON.stringify(
						animals[firstLetter]
					)}`
				);
				matchedAnimal = getFirstMatchIn(animals[firstLetter], text);

				if (matchedAnimal) {
					logg(this)(
						`parseAnimal():: matched user input with the animal: "${matchedAnimal}" found within the application state.`
					);

					return matchedAnimal;
				}
			}

			//animal does not exist within this.state.animals
			//Look for the animal in the SUPPORTED_ANIMALS list
			const indexPos = this.getIndexOfLetter(firstLetter);
			animalsInIndex = supportedAnimals[indexPos].animals;
			matchedAnimal = animalsInIndex.filter(animal => {
				return text.includes(animal);
			})[0];
			logg(this)(
				`parseAnimal():: animals in index (within supportedAnimals) === " ${animalsInIndex}"`
			);

			if (matchedAnimal) {
				logg(this)(
					`parseAnimal():: matched user input with the animal: "${matchedAnimal}", found in supported animals. (outside of state) `
				);

				//todo: UPDATE STATE?
				return matchedAnimal;
			} else {
				logg(this)(
					`parseAnimal():: Did not match user input ${matchedAnimal} with any supported animal. `
				);
				return null;
			}
		} catch (err) {
			logg(this)(err);
		}
	};

	render() {
		const { items, query, selectedItem, searchMode } = this.state;
		const { classes, onImagesLoad, issy, logg } = this.props;
		const { isInViewport } = issy;

		return (
			<div className={classes.root}>
				<div className={classes.row}>
					<SearchInput
						className={classes.searchInput}
						placeholder={"iguana, zebra..."}
						onChange={query => {
							this.setState({ query });
						}}
						onSubmit={(ev, query) => {
							logg(this)("Query:", query);
							this.fetchAnimals(query, 12);

							onImagesLoad && onImagesLoad();

							this.setState(prev => ({
								searchMode: !prev.searchMode
							}));
						}}
						logg={logg}
						issy={issy}
					/>
				</div>

				<div className={classes.row}>
					<ul className={classes.foundImages}>
						<PoseGroup>
							{items &&
								items.map((item, i) => (
									<AnimatedCard
										numItems={items.length}
										i={i}
										className={classes.item}
										key={i}
										onClick={e =>
											this.handleClick(e, item, i)
										}
									>
										<ImageCard
											imgURL={item.url}
											label={query + " image #" + i}
											showHeader={selectedItem.id === i}
										/>
									</AnimatedCard>
								))}
						</PoseGroup>
					</ul>
				</div>
				<div className={classes.row}>
					<Button
						variant="fab"
						onClick={e =>
							this.fetchAnimals(query, 12, "addToExisting")
						}
						className={classes.findMoreBtn}
						style={{
							display: items.length > 0 ? "inline" : "none"
						}}
					>
						more
					</Button>
				</div>
			</div>
		);
	}
}

ImageFetcher.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string).isRequired,
	theme: PropTypes.object.isRequired,
	onImagesLoad: PropTypes.func,
	issy: PropTypes.object.isRequired,
	logg: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(ImageFetcher);
