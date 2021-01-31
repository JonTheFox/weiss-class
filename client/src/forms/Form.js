import React, { useContext, useCallback } from "react";
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
import AddressForm from "../../forms/AddressForm.js";
import PersonalInformationForm from "../../forms/PersonalInformationForm.js";
import Copyright from "../../components/Copyright/Copyright.js";
import { useRecoilState } from "recoil";
import userState from "../../store/user.atom.js";
import { AppContext } from "../../contexts/AppContext.jsx";

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

const steps = ["Personal Information", "Address"];

function getStepContent(step) {
	switch (step) {
		case 0:
			return <PersonalInformationForm />;
		case 1:
			return <AddressForm />;

		default:
			throw new Error("Unknown step");
	}
}

export default function Checkout() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const [user, setUser] = useRecoilState(userState);
	const [appUtils] = useContext(AppContext);
	const { capitalizeFirstLetter } = appUtils;

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const handlePostSubmissionClick = useCallback(() => {}, []);

	const nextBtnText =
		activeStep === steps.length - 1 ? "Place order" : "Next";

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
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<React.Fragment>
						{activeStep === steps.length ? (
							<React.Fragment>
								<Typography variant="h5" gutterBottom>
									{`Welcome, ${capitalizeFirstLetter(
										user.first_name
									)}!`}
								</Typography>
								<Typography variant="subtitle1">
									We are so glad to have you here. We are
									going to have a good time. Might as well
									<Button onClick={handlePostSubmissionClick}>
										begin
									</Button>{" "}
									.
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
							<React.Fragment>
								{getStepContent(activeStep)}
								<div className={classes.buttons}>
									{activeStep !== 0 && (
										<Button
											onClick={handleBack}
											className={classes.button}
										>
											Back
										</Button>
									)}
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
									>
										{nextBtnText}
									</Button>
								</div>
							</React.Fragment>
						)}
					</React.Fragment>
				</Paper>
				<Copyright />
			</main>
		</React.Fragment>
	);
}
