import React, { useCallback, useRef } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import userState from "../store/user.atom.js";

const useStyles = makeStyles((theme) => ({
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end",
	},
}));

const validateFormData = (data = {}, fields = []) => {
	let isFormValid = true; //a missing or invalid required field will change this to false

	Object.values(fields).map((formField) => {
		const { name, required } = formField;
		if (!required) return true;

		const inputValue = data[name];

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

export default function Form(props) {
	const classes = useStyles();
	const {
		refs = { current: {} },
		fields,
		name = "",
		label = "",
		activeStep,
		showBack,
		children,
	} = props;

	// const setUser = useSetRecoilState(userState);

	const handleSubmit = useCallback(
		(ev) => {
			if (ev) ev.preventDefault();

			const form = refs.current[name];

			if (!form) return;
			let formData;

			try {
				formData = new FormData(form);
			} catch (err) {
				return null;
			}

			const allData = {};

			fields.map((field) => {
				const { name } = field;
				const inputValue = formData.get(name);

				allData[name] = inputValue;
				return inputValue;
			});

			refs.current[name + "Data"] = {};
			Object.assign(refs.current[name + "Data"], allData);

			const isFormValid = validateFormData(allData, fields);

			if (!isFormValid) {
				if (props.onValidationFailed) props.onValidationFailed(allData);
				return;
			}
			// return isFormValid;

			if (props.onSubmit) return props.onSubmit({ data: allData });
		},
		[fields]
	);

	return (
		<form
			onSubmit={handleSubmit}
			ref={(ref) => {
				if (ref) refs.current[name] = ref;
			}}
		>
			<Typography variant="h6" gutterBottom>
				{label}
			</Typography>
			<Grid container spacing={3}>
				{children}
			</Grid>

			<div className={classes.buttons}>
				{showBack && (
					<Button
						onClick={props.handleBack}
						className={classes.button}
					>
						Back
					</Button>
				)}
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					className={classes.button}
				>
					{"next"}
				</Button>
			</div>
		</form>
	);
}
