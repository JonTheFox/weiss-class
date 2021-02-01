import React, { useState, useContext, useCallback, useRef } from "react";
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
}));

//const steps = ["Profile", "Personal", "Address"];

const validateFormData = ({ data = {}, requiredFields = [] }) => {
	const { email } = data;

	let isFormValid = true; //a missing or invalid required field will change this to false
	Object.values(requiredFields).map((formField) => {
		const { label } = formField;
		const inputValue = data[label];
		debugger;
		if (!inputValue) {
			isFormValid = false;
		}
		const { validateValue } = formField;

		if (validateValue) {
			return validateValue(inputValue);
		}

		//no validation rules... so anything passes
		return true;
	});

	return isFormValid;
};

const isTruthy = (val) => !!val;

const PROFILE_FIELDS = [
	{
		name: "email",
		label: "Email",
		validateValue: isTruthy,
		required: true,
	},
	{
		name: "password",
		label: "Password",
		validateValue: isTruthy,
		required: true,
	},
];

const PERSONAL_FIELDS = [
	{
		label: "First Name",
		name: "first_name",
		validateValue: isTruthy,
		required: true,
	},
	{
		label: "Middle Name",
		name: "middle_name",
		validateValue: isTruthy,
		required: false,
	},
	{
		label: "Last Name",
		name: "last_name",
		validateValue: isTruthy,
		required: true,
	},
	{
		label: "Date of birth",
		name: "bDay",
		validateValue: isTruthy,
		required: true,
	},
	{
		label: "Gender",
		name: "gender",
		validateValue: isTruthy,
		required: true,
	},
];

const ADDRESS_FIELDS = [
	{
		name: "street_name",
		label: "Street",
		validateValue: isTruthy,
		required: true,
	},
	{
		name: "street_number",
		label: "Number",
		validateValue: isTruthy,
		required: true,
	},
	{
		name: "city",
		label: "City",
		validateValue: isTruthy,
		required: true,
	},
	{
		name: "state",
		label: "State",
		validateValue: isTruthy,
		required: true,
	},
	{
		name: "country",
		label: "Country",
		validateValue: isTruthy,
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

export default function Signup() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const [user, setUser] = useRecoilState(userState);
	const refs = useRef({
		form: {},
		forms: {},
		personal: {},
		profile: {},
		address: {},
	});
	const [appUtils] = useContext(AppContext);
	const { capitalizeFirstLetter } = appUtils;

	function getFormComponent(step, refs) {
		const form = FORMS[step];
		const { fields = [], label } = form;

		return (
			<Form
				refs={refs}
				name={label.toLowerCase()}
				label={label}
				//handleNext={handleNext}
				handleBack={handleBack}
				showBack={activeStep > 0}
				onSubmit={({ data }) => {
					if (activeStep === FORMS.length) {
						//todo: collect data from all forms and do AJAX
						debugger;
						return;
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
								key={name}
								name={name}
								label={label}
								fullWidth
								onChange={(ev) => {
									const { value } = ev.target;
									refs.current[name] = value;
								}}
								autoComplete={name}
								defaultValue={refs.current[name] || ""}
							/>
						</Grid>
					);
				})}
			</Form>
		);
	}

	const validateForm = () => {};

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const handlePostSubmissionClick = useCallback(() => {}, []);

	const nextBtnText =
		activeStep === FORMS.length - 1 ? "Place order" : "Next";

	return (
		<React.Fragment>
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h4" align="center">
						Sign Up
					</Typography>
					<Stepper
						activeStep={activeStep}
						className={classes.stepper}
					>
						{FORMS.map(({ label }) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<React.Fragment>
						{activeStep === FORMS.length ? (
							<React.Fragment>
								<Typography variant="h5" gutterBottom>
									{`Welcome, ${capitalizeFirstLetter(
										user.first_name
									)}!`}
								</Typography>
								<Typography variant="subtitle1">
									We are so glad to have you here. We are
									going to have a good time.
									<div className={classes.buttons}>
										<Button
											onClick={handleBack}
											className={classes.button}
										>
											Edit
										</Button>
									</div>
								</Typography>
							</React.Fragment>
						) : (
							getFormComponent(activeStep, refs)
						)}
					</React.Fragment>
				</Paper>
			</main>
		</React.Fragment>
	);
}
