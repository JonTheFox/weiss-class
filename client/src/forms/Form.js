import React, { useCallback, useRef, useState, useEffect } from "react";

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
		nextBtnText = "",
	} = props;

	const [isFormValid, setIsFormValid] = useState(false);

	const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true);

	// const setUser = useSetRecoilState(userState);

	const getAllData = () => {
		const allData = {};
		fields.map((field) => {
			const { name } = field;
			debugger;
			const formRef = refs.current[props.name];
			let formData;
			try {
				formData = new FormData(formRef);
			} catch (err) {
				return null;
			}
			const inputValue = formData.get(name);
			allData[name] = inputValue;
			return inputValue;
		});
		return allData;
	};

	const validateFormData = () => {
		let isFormValid = true; //a missing or invalid required field will change this to false

		const data = getAllData();

		Object.values(fields).map((formField) => {
			const { name, required } = formField;
			debugger;
			if (!required) return true;

			const inputValue = data[name];
			if (!inputValue) {
				isFormValid = false;
			}
			const { validate } = formField;

			if (validate) {
				return validate(inputValue);
			}

			//no validation rules... so anything passes
			return true;
		});

		return isFormValid;
	};
	refs.current[`${name}__validateFormData`] = validateFormData;

	const handleChange = (value) => {
		const isValid = validateFormData();
		setIsFormValid(isValid);
	};
	refs.current.handleChange = handleChange;

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

			const allData = getAllData();

			refs.current[name + "Data"] = {};
			Object.assign(refs.current[name + "Data"], allData);

			const _isFormValid = validateFormData(allData, fields);
			debugger;

			if (!_isFormValid) {
				if (props.onValidationFailed) props.onValidationFailed(allData);
				return;
			}

			if (props.onSubmit) return props.onSubmit({ data: allData });
		},
		[fields]
	);

	return (
		<form
			onSubmit={(ev) => handleSubmit(ev, { activeStep })}
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
					disabled={!isFormValid}
					onClick={handleSubmit}
					className={classes.button}
				>
					{nextBtnText}
				</Button>
			</div>
		</form>
	);
}
