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
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Form from "../../forms/Form.js";
import AddressForm from "../../forms/AddressForm.js";
import PersonalInformationForm from "../../forms/PersonalInformationForm.js";
import ProfileForm from "../../forms/ProfileForm.js";
import Copyright from "../../components/Copyright/Copyright.js";
import { useRecoilState } from "recoil";
import userState from "../../store/user.atom.js";
import { AppContext } from "../../contexts/AppContext.jsx";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ENDPOINTS from "../../AJAX/ajax-endpoints.js";
import MOCK_USER from "../../mockData/mockUser.js";
import clsx from "clsx";

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
}));

const isTruthy = (val) => !!val;

const PROFILE_FIELDS = [
	{
		name: "email",
		label: "Email",
		validate: isTruthy,
		required: true,
	},
	{
		name: "password",
		label: "Password",
		validate: isTruthy,
		required: true,
	},
];

const PERSONAL_FIELDS = [
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
		label: "Date of birth",
		name: "bday",
		validate: isTruthy,
		required: true,
	},
	{
		label: "Gender",
		name: "gender",
		validate: isTruthy,
		required: true,
	},
];

const ADDRESS_FIELDS = [
	{
		name: "street_name",
		label: "Street",
		validate: isTruthy,
		required: true,
	},
	{
		name: "street_number",
		label: "Number",
		validate: isTruthy,
		required: true,
	},
	{
		name: "city",
		label: "City",
		validate: isTruthy,
		required: true,
	},
	{
		name: "state",
		label: "State",
		validate: isTruthy,
		required: false,
	},
	{
		name: "country",
		label: "Country",
		validate: isTruthy,
		required: true,
	},
];

const FORMS = [
	{
		label: "Profile",
		fields: PROFILE_FIELDS,
	},
	{ label: "Personal", fields: PERSONAL_FIELDS },
	{ label: "Address", fields: ADDRESS_FIELDS },
];

export default function Signup(props) {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const [user, setUser] = useRecoilState(userState);
	const refs = useRef({
		form: {},
		forms: {},
		personal: {},
		profile: {},
		address: {},
		activeStep,
	});
	const [showError, setShowError] = useState(false);

	Object.assign(refs.current, MOCK_USER);

	const [appUtils] = useContext(AppContext);
	const { capitalizeFirstLetter, request, navigateTo } = appUtils;

	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		refs.current.activeStep = activeStep;
		// logg("activeStep:", activeStep);
	}, [activeStep]);

	const isLastForm = activeStep + 1 === FORMS.length;
	const nextBtnText = isLastForm ? "Finish" : "Next";

	function getFormComponent(step, refs) {
		const form = FORMS[step];
		const { fields = [], label } = form;

		// setIsNextDisabled

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
				onSubmit={async ({ data }) => {
					try {
						const _isLastForm =
							refs.current.activeStep + 1 === FORMS.length;
						if (_isLastForm) {
							//todo: collect data from all forms and do AJAX

							const {
								profileData,
								personalData,
								addressData,
							} = refs.current;
							const allFormsData = {
								...profileData,
								...personalData,
								...addressData,
							};

							//convert types
							allFormsData.street_number = parseInt(
								addressData.street_number
							);
							allFormsData.bday = new Date();

							debugger;

							if (_isLastForm) {
								const ajaxResult = await request(
									"POST",
									ENDPOINTS.users.POST.signup.path,
									{
										user: allFormsData,
										collectionName: "user",
									}
								);

								debugger;
								const { error, data } = ajaxResult;

								if (error) throw new Error(error);
								if (!data) throw new Error("No data received");
							}
						}
					} catch (err) {
						const _err = err;
						console.error(err);
						setShowError(true);
					}

					handleNext();
				}}
				fields={fields}
			>
				{fields.map(({ label, name, required }, inputIndex) => {
					return (
						<Grid item xs={12} sm={12} key={label}>
							<TextField
								required={Boolean(required)}
								id={name}
								defaultValue={refs.current[name]}
								key={name}
								name={name}
								label={label}
								fullWidth
								onChange={(ev) => {
									const { value } = ev.target;
									refs.current[name] = value;
									refs.current.handleChange(value);

									// const validate =
									// 	refs.current[`${name}__validate`];
									// debugger;
									// const isFormValid = validate();
								}}
								autoComplete={name}
								isFormValid={isFormValid}
								defaultValue={refs.current[name] || ""}
							/>
						</Grid>
					);
				})}
			</Form>
		);
	}

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const handleTryAgain = useCallback(
		(val) => {
			setShowError(false);
			refs.current.setIsFormValid(true);
			setActiveStep(0);
		},
		[refs.current, setActiveStep]
	);

	const FinishedMessage = (
		<React.Fragment>
			<Typography variant="h5" gutterBottom>
				{`Welcome, ${capitalizeFirstLetter(refs.current.first_name)}!`}
			</Typography>
			<Typography variant="subtitle1">
				Thank you for signing up. We are so glad to have you here with
				us.
				<div className={classes.buttons}>
					<Button
						onClick={() => {
							navigateTo("/", props.history);
						}}
						className={classes.button}
					>
						Continue
					</Button>
				</div>
			</Typography>
		</React.Fragment>
	);

	const ErrorMessage = (
		<React.Fragment>
			<Typography variant="h5" gutterBottom>
				{`Umm,`}
			</Typography>
			<Typography variant="subtitle1">
				{`That didn't work. Sorry about that, ${refs.current.first_name}.`}
				<div className={classes.buttons}>
					<Button onClick={handleTryAgain} className={classes.button}>
						Try Again
					</Button>
				</div>
			</Typography>
		</React.Fragment>
	);

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
							showError && classes.error
						)}
					>
						{FORMS.map(({ label }) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<React.Fragment>
						{showError
							? ErrorMessage
							: activeStep === FORMS.length
							? FinishedMessage
							: getFormComponent(activeStep, refs)}
					</React.Fragment>
				</Paper>
			</main>
		</React.Fragment>
	);
}
