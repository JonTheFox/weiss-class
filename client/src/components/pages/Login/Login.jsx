import React, { useContext, useEffect, useCallback } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import View from "../layout/View.jsx";
// import clsx from "clsx";
import ENDPOINTS from "../../AJAX/ajax-endpoints.js";

import { AppContext } from "../../contexts/AppContext.jsx";

import {
	// atom,
	// selector,
	// useRecoilState,
	// useRecoilValue,
	useSetRecoilState,
} from "recoil";
import userState from "../../store/user.atom.js";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://weiss-english.herokuapp.com/">
				Weiss English
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

let logg;
let loggError;
let animationFrame;
let label = "login";

export default function SignIn(props) {
	const { route } = props;
	const { history } = route;
	const classes = useStyles();

	const [appUtil, appState] = useContext(AppContext);
	// const { localStorageKey, user } = appState;
	const {
		Logger,
		request,
		navigateTo,
		//localStorage,
		//PromiseKeeper,
	} = appUtil;

	const setUser = useSetRecoilState(userState);

	const submitForm = useCallback(async (ev) => {
		ev.preventDefault();
		try {
			const formData = new FormData(ev.target);
			const email = formData.get("email");
			const password = formData.get("password");
			const rememberMe = formData.get("remember");
			const _end = ENDPOINTS;

			const ajaxResult = await request(
				"POST",
				ENDPOINTS.users.POST.login.path,
				{ email, password }
			);
			const { error, wrongCredentials, loggedIn, user } = ajaxResult;
			debugger;
			if (error) throw new Error(error);
			if (wrongCredentials) {
				throw new Error(
					"Login failed. Reason: wrong credentials provided."
				);
			}
			if (!loggedIn) {
				throw new Error("Login failed for an unknown reason.");
			}
			const { first_name, last_name, role } = user;
			const loggedInUser = {
				email,
				password,
				role,
				first_name,
				last_name,
			};
			// appState.setUser(loggedInUser, rememberMe);
			setUser(loggedInUser);
			logg(`logged in ${role ? role : ""} user ${email} `);
			animationFrame = window.requestAnimationFrame(() => {
				navigateTo("/rt", history);
			});
		} catch (err) {
			loggError(err.message);
		}
	}, []);

	useEffect(() => {
		const logger = new Logger({ label });
		logg = logger.logg;
		loggError = logger.loggError;
		return () => {
			cancelAnimationFrame(animationFrame);
		};
	}, [Logger]);

	return (
		<View animate={false} className="login-page">
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Log in
					</Typography>
					<form className={classes.form} onSubmit={submitForm}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={
								<Checkbox
									value={"remember"}
									name="remember"
									color="primary"
								/>
							}
							name="remember"
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="/" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		</View>
	);
}
