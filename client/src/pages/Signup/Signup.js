import React, {
	useState,
	useContext,
	useCallback,
	useRef,
	useEffect,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";

import Form from "../../components/Form/Form.js";
import { useRecoilState } from "recoil";
import userState from "../../store/user.atom.js";
import { AppContext } from "../../contexts/AppContext.jsx";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ENDPOINTS, { USER_SERVER_URL } from "../../AJAX/ajax-endpoints.js";
import MOCK_USER from "../../mockData/mockUser.js";
import clsx from "clsx";
import useLogg from "../../hooks/useLogg.jsx";
import { useHistory } from "react-router-dom";
import validatePassword from "./validatePassword.js";
import validateEmail from "./validateEmail.js";
import validateDate from "./validateDate.js";
//import validateImage from "./validateImage.js";
import validateCountry from "./validateCountry.js";

import countries from "./countryList.js";
import Autocomplete from "@material-ui/lab/Autocomplete";

import ImageUploader from "../../components/ImageUploader/ImageUploader.jsx";
import FileUploadWithPreview from "file-upload-with-preview";
import "file-upload-with-preview/dist/file-upload-with-preview.min.css";

import firebase from "firebase/app";
import "firebase/storage";
import { storage } from "../../firebase/firebase.js";
const PASSWORD_REQUIREMENTS =
	"Password must be at least 8 characters long and contain a lowercase letter (a-z), an uppercase letter (A-Z) and a digit (0-9).";

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: "relative",
	},
	layout: {
		width: "auto",
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: "auto",
			marginRight: "auto",
		},
		overflow: "auto",
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	stepper: {
		padding: theme.spacing(3, 0, 5),
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end",
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	error: {
		"& svg": {
			color: "var(--canvas) !important",
		},
	},
	autoComplete: {
		// position: "relative",
		// borderRadius: theme.shape.borderRadius,
		// backgroundColor: fade(theme.palette.primary.main, 0.15),
		// "&:hover": {
		//   backgroundColor: fade(theme.palette.primary.main, 0.25)
		// },
		// marginLeft: 0,
		// width: "100%",
		// [theme.breakpoints.up("sm")]: {
		//   marginLeft: theme.spacing(1),
		//   width: "auto"
		// }
		// padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create("width"),
		width: "100%",

		[theme.breakpoints.up("sm")]: {
			width: 200,
			"&:focus": {
				width: 800,
			},
		},
	},
	searchIcon: {
		width: theme.spacing(7),

		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	userImageContainer: {
		backgroundRepeat: "no-repeat",
		backgroundPositionX: "left",
		width: "100%",
		height: "auto",
		position: "relative",
	},
	fileUploaderGrid: {
		width: "100%",
	},
	profilePic: {
		//position: "absolute",
		width: "100%",
		opacity: 1,
		borderRadius: "0.5rem",
	},
	bday: {
		"& #bday": {
			textAlign: "left",
			flexBasis: "60%",
			width: "auto",
		},
	},
}));

const getPublicUserInfo = (user) => {
	// assertValidCredentials(user);
	if (!user) return null;
	const { first_name, last_name, email, role } = user;
	return { first_name, last_name, email, role };
};

const isTruthy = (val) => !!val;

const ACCOUNT_FIELDS = [
	{
		name: "email",
		label: "Email",
		validate: validateEmail,
		required: true,
	},
	{
		name: "password",
		label: "Password",
		validate: validatePassword,
		required: true,
	},
];

const PROFILE_FIELDS = [
	{
		label: "Picture",
		name: "profile_pic_url",
		validate: isTruthy,
		required: true,
		type: "imageUpload",
	},
	{
		label: "First Name",
		name: "first_name",
		validate: isTruthy,
		required: true,
	},
	{
		label: "Middle Name",
		name: "middle_name",
		validate: isTruthy,
		required: false,
	},
	{
		label: "Last Name",
		name: "last_name",
		validate: isTruthy,
		required: true,
	},
	{
		label: "Gender",
		name: "gender",
		validate: isTruthy,
		required: true,
		type: "select",
		options: [
			{ label: "Male", value: "male" },
			{ label: "Female", value: "female" },
			{ label: "Fluid", value: "fluid" },
			{ label: "Trans", value: "transgender" },
		],
	},

	{
		name: "country",
		label: "Country",
		type: "autoComplete",
		validate: validateCountry,
		required: true,
		options: countries,
	},
	{
		label: "Birthday",
		name: "bday",
		validate: validateDate,
		required: true,
		type: "date",
	},
];

// const ADDRESS_FIELDS = [
// 	{
// 		name: "street_name",
// 		label: "Street",
// 		validate: isTruthy,
// 		required: false,
// 	},
// 	{
// 		name: "street_number",
// 		label: "Number",
// 		validate: isTruthy,
// 		required: false,
// 	},
// 	{
// 		name: "city",
// 		label: "City",
// 		validate: isTruthy,
// 		required: false,
// 	},
// 	{
// 		name: "state",
// 		label: "State",
// 		validate: isTruthy,
// 		required: false,
// 	},
// ];

const FORMS = [
	{
		label: "Account",
		fields: ACCOUNT_FIELDS,
	},
	{ label: "Profile", fields: PROFILE_FIELDS },
	//{ label: "Address", fields: ADDRESS_FIELDS },
];

const label = "Signup";

export default function Signup(props) {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const [user, setUser] = useRecoilState(userState);
	const history = useHistory();
	const refs = useRef({
		form: {},
		forms: {},
		personal: {},
		profile: {},
		address: {},
		profileData: {},
		accountData: {},
		//addressData: {},
		activeStep,
	});
	const [showFeedback, setshowFeedback] = useState(false);
	const [feedback, setFeedback] = useState({});
	const { logg, loggError } = useLogg({ label });
	//Object.assign(refs.current, MOCK_USER);
	const [appUtils] = useContext(AppContext);
	const { capitalizeFirstLetter, request, navigateTo } = appUtils;
	const [isFormValid, setIsFormValid] = useState(false);
	const [profilePic, setProfilePic] = useState({});

	useEffect(() => {
		refs.current.activeStep = activeStep;
		// logg("activeStep:", activeStep);
	}, [activeStep]);

	const isLastForm = activeStep + 1 === FORMS.length;
	const nextBtnText = isLastForm ? "Finish" : "Next";

	const handleSubmit = useCallback(async () => {
		try {
			const _isLastForm = refs.current.activeStep + 1 === FORMS.length;
			if (!_isLastForm) return handleNext();

			const { accountData, profileData } = refs.current;
			const allFormsData = {
				...accountData,
				...profileData,
				//...addressData,
			};

			//convert types
			// allFormsData.street_number = parseInt(addressData.street_number);
			// allFormsData.bday = new Date();

			const ajaxResult = await request(
				"POST",
				ENDPOINTS.users.POST.signup.path,
				allFormsData
			);

			debugger;

			const { error, alreadyExists, success, reason, data } = ajaxResult;

			if (alreadyExists) {
				setshowFeedback(true);
				setFeedback({
					heading: `Hey, ${refs.current.first_name}, `,
					bodyText: `You already have an account (which is great).`,
					btnText: "Login",
					handleBtnClick: handleLogin,
				});
				return;
			}

			if (error) throw new Error(error);

			if (!data)
				throw new Error("Did not receive any data from the server");

			//success

			const updateUser = (allUserInfo) => {
				setUser({
					...getPublicUserInfo(allUserInfo),
					password: accountData.password,
				});
			};
			updateUser(allFormsData);

			setshowFeedback(true);
			return setFeedback({
				heading: "Great Success!",
				bodyText: `You are now ready to go.`,
				btnText: "continue",
				handleBtnClick: () => {
					navigateTo("/client-type-select", history);
				},
			});
		} catch (err) {
			// if (err.name && err.name === "ValidationError") {
			loggError(err);
			setshowFeedback(true);
			return setFeedback({
				heading: `Hmm.`,
				bodyText:
					"Something is off. Please go over the form again and make sure that all required fields are filled properly.",
				btnText: "Go back",
				handleBtnClick: handleTryAgain,
				type: "error",
			});
			// }

			setshowFeedback(true);
		}

		handleNext();
	}, [refs.current, setUser, setshowFeedback, setFeedback]);

	const handleInputChange = useCallback(
		(ev, { fieldName, useInnerText = false }) => {
			const value = ev.target[useInnerText ? "innerText" : "value"];
			if (!value) debugger;
			refs.current[fieldName] = value;
			refs.current.handleChange(value);

			// refs.current.setIsFormValid(true);

			// const result = refs.current[`${fieldName}__validateFormData`]?.();

			// const result2 = refs.current[
			// 	`setIs${capitalizeFirstLetter(fieldName)}Valid`
			// ]?.();
		},
		[]
	);

	const handleImageChange = useCallback(async (_image, images) => {
		try {
			// const formData = new FormData();
			// formData.append("uploadedImage", _image);
			// const config = {
			// 	headers: {
			// 		"content-type": "multipart/form-data",
			// 	},
			// };
			//refs.current._image = formData;

			if (_image === "") {
				loggError(`not an image, the image file is a ${typeof _image}`);
			}

			const uploadTask = storage
				.ref(`/images/${_image.name}`)
				.put(_image);

			uploadTask.on(
				"state_changed",
				(snapShot) => {
					//takes a snap shot of the process as it is happening
					logg(snapShot);
				},
				(err) => {
					logg(err);
				},
				() => {
					// gets the functions from storage refences the image storage in firebase by the children
					// gets the download url then sets the image from firebase as the value for the url key:
					storage
						.ref("images")
						.child(_image.name)
						.getDownloadURL()
						.then((fireBaseUrl) => {
							refs.current.profile_pic_url = fireBaseUrl;
							refs.current.profileData.profile_pic_url = fireBaseUrl;

							refs.current.handleChange(fireBaseUrl);

							//todo: test to see that the image was indeed uploaded successfully
							setProfilePic((prevObject) => ({
								...prevObject,
								url: fireBaseUrl,
							}));
						});
				}
			);
		} catch (err) {
			loggError(err);
			debugger;
			return null;
		}
	}, []);

	function getFormComponent(step, refs) {
		const form = FORMS[step];
		const { fields = [], label } = form;

		// refs.current.validateFormData && refs.current.validateFormData();

		return (
			<Form
				refs={refs}
				name={label.toLowerCase()}
				label={label}
				nextBtnText={nextBtnText}
				//handleNext={handleNext}
				handleBack={handleBack}
				showBack={activeStep > 0}
				showSubmit={isFormValid}
				onSubmit={handleSubmit}
				fields={fields}
				className={classes.form}
			>
				<div
					className={classes.userImageContainer}
					style={{ backgroundImage: profilePic?.url }}
				>
					{profilePic && profilePic.url && (
						<img
							className={classes.profilePic}
							src={profilePic?.url}
							alt={user?.first_name ?? ""}
						></img>
					)}
				</div>
				{fields.map(
					(
						{ label, name = "", type = "", required, options = [] },
						inputIndex
					) => {
						if (type === "imageUpload") {
							return (
								<Grid
									key={label}
									className={classes.fileUploaderGrid}
								>
									<ImageUploader
										withIcon={false}
										label={
											"Accepted types: jpeg, jpg and png"
										}
										buttonText="Select image"
										buttonClassName="gradient-mix"
										onChange={handleImageChange}
										imgExtension={[
											".jpg",
											".jpeg",
											".png",
											//".gif",
										]}
										maxFileSize={40242880}
									></ImageUploader>
								</Grid>
							);
						}
						if (type === "autoComplete") {
							return (
								<Grid item xs={10} sm={10} key={label}>
									<Autocomplete
										className={clsx(
											classes.autoComplete,
											"auto-complete"
										)}
										classes={{
											root: classes.inputRoot,
										}}
										options={options}
										//groupBy={appState.searchables.groupBy}
										//defaultValue={appState.searchables.list[0]}
										getOptionsLabel={(option) =>
											option.label
										}
										label="Country"
										aria-label="search"
										autoComplete={true}
										placeholder={
											"Please select your country"
										}
										autoHighlight={false}
										autoSelect={false}
										clearOnEscape={false}
										disableClearable={false}
										disableCloseOnSelect={false}
										disabled={false}
										loading={false}
										loadingText={"Working.."}
										noOptionsText={
											"Imagine there's no countries.."
										}
										renderInput={(params) => (
											<React.Fragment>
												<div
													className={clsx(
														"search-icon",
														classes.searchIcon
													)}
												>
													<SearchIcon />
												</div>

												<TextField
													{...params}
													// label="search-term"
													variant="standard"
													label="Country"
												/>
											</React.Fragment>
										)}
										onChange={(ev) => {
											const value = ev.target.innerText;
											logg("selected option: ", value);

											handleInputChange(ev, {
												fieldName: name,
												useInnerText: true,
											});
										}}
									></Autocomplete>
								</Grid>
							);
						}

						const isNarrowField = [
							"first_name",
							"middle_name",
							"last_name",
							//"bday",
							"gender",
						].includes(name);

						const isMediumSizeField = ["bday"].includes(name);

						const renderTextField = () => {
							return (
								<TextField
									className={classes[name]}
									InputLabelProps={{
										shrink: true,
									}}
									select={type === "select"}
									helperText={
										name === "password" &&
										PASSWORD_REQUIREMENTS
									}
									type={type}
									required={required}
									id={name}
									//	defaultValue={refs.current[name]}
									key={name}
									name={name}
									label={label}
									fullWidth={!isNarrowField}
									onChange={(ev) =>
										handleInputChange(ev, {
											fieldName: name,
										})
									}
									autoComplete={name}
									isFormValid={isFormValid}
									defaultValue={refs.current[name] || null}
								>
									{options &&
										options.map &&
										options.map((option) => (
											<MenuItem
												key={option.value}
												value={option.value}
											>
												{option.label}
											</MenuItem>
										))}
								</TextField>
							);
						};

						return (
							<Grid
								item
								xs={
									isNarrowField
										? 4
										: isMediumSizeField
										? 10
										: 12
								}
								sm={
									isNarrowField
										? 4
										: isMediumSizeField
										? 10
										: 12
								}
								key={label}
							>
								{renderTextField()}
							</Grid>
						);
					}
				)}
			</Form>
		);
	}

	const handleNext = () => {
		setActiveStep((_step) => ++_step);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const handleTryAgain = useCallback(
		(val) => {
			setshowFeedback(false);
			refs.current.setIsFormValid(true);
			//setActiveStep((step) => step - 1);
		},
		[refs.current, setActiveStep]
	);

	const handleLogin = useCallback(
		(val) => {
			setshowFeedback(false);
			navigateTo("/login", history);
		},
		[setshowFeedback]
	);

	const { heading, bodyText, btnText, handleBtnClick } = feedback;

	const FeedbackMessage = ({
		heading,
		bodyText,
		btnText = "",
		onBtnClick,
	}) => {
		const _refs = refs.current;
		return (
			<React.Fragment>
				<Typography variant="h5" gutterBottom>
					{heading}
				</Typography>
				<Typography variant="subtitle1">
					{bodyText}
					<div className={classes.buttons}>
						<Button onClick={onBtnClick} className={classes.button}>
							{btnText}
						</Button>
					</div>
				</Typography>
			</React.Fragment>
		);
	};

	return (
		<React.Fragment>
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h4" align="center">
						Sign Up
					</Typography>
					<Stepper
						activeStep={activeStep}
						className={clsx(
							classes.stepper,
							showFeedback &&
								feedback.type === "error" &&
								classes.error
						)}
					>
						{FORMS.map(({ label }) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<React.Fragment>
						{showFeedback ? (
							<FeedbackMessage
								heading={heading}
								btnText={btnText}
								bodyText={bodyText}
								onBtnClick={handleBtnClick}
							></FeedbackMessage>
						) : (
							getFormComponent(activeStep, refs)
						)}
					</React.Fragment>
				</Paper>
			</main>
		</React.Fragment>
	);
}
