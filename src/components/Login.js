import React, { useState } from 'react';
import {
	Grid,
	Typography,
	Button,
	InputAdornment,
	FormControlLabel,
	Checkbox
} from '@material-ui/core';
import logo from '../assets/logo-brown-mobile.png';
import { Link, useHistory } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import useLogin from '../composables/useLogin';
import './signup.css';

const Login = () => {
	const { error, login } = useLogin();
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loginCheck, setLoginCheck ] = useState(false);
	const [ emailError, setEmailError ] = useState(false);
	const [ passError, setPassError ] = useState(false);
	const history = useHistory();

	const handlesubmit = async () => {
		if (!emailError && !passError) {
			await login(email, password);

			if (!error) {
				history.push('/welcome');
			}
		}
	};

	return (
		<Grid container className="Sign">
			<Grid item xs={12} align="left" className="logo-box">
				<img src={logo} alt="logo" className="logo" />
			</Grid>
			<Grid item xs={12} align="center">
				<Typography className="title" variant="h2">
					Login
				</Typography>
			</Grid>
			<Grid item xs={12} className="Input">
				<TextField
					error={emailError}
					helperText={emailError ? 'add a correct email' : ''}
					type="email"
					className="filled-basic"
					placeholder="Email"
					variant="outlined"
					onChange={(e) => setEmail(e.target.value)}
					onBlur={() =>
						email.match(/^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/)
							? setEmailError(false)
							: setEmailError(true)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<i className="fas fa-envelope" />
							</InputAdornment>
						)
					}}
				/>
			</Grid>
			<Grid item xs={12} className="Input">
				<TextField
					error={passError}
					helperText={passError ? 'add a password. Min 6 char' : ''}
					type="password"
					className="filled-basic"
					name="password"
					placeholder="Password"
					variant="outlined"
					onChange={(e) => setPassword(e.target.value)}
					onBlur={(e) =>
						password.length >= 6 ? setPassError(false) : setPassError(true)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<i className="fas fa-lock" />
							</InputAdornment>
						)
					}}
				/>
			</Grid>
			<Grid item xs={12}>
				<FormControlLabel
					control={
						<Checkbox
							checked={loginCheck}
							onChange={(e) => setLoginCheck(!loginCheck)}
							color="primary"
							className="checkbox"
						/>
					}
					label="remember me"
				/>
			</Grid>
			<Grid item xs={12} className="bttn-box">
				<Button variant="contained" onClick={handlesubmit} className="btn">
					Login
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Link to={'/login'} className="link">
					forgot password
				</Link>
			</Grid>
			<Grid item xs={12}>
				<Typography className="change-sign">
					I don’t have an account.{' '}
					<Link to={'/signup'} className="link">
						Sign up
					</Link>
				</Typography>
			</Grid>
			<Grid item xs={12} align="center" className="hr-box">
				<hr />
			</Grid>
			<Grid item xs={12} className="icons-sign">
				<div className="facebook">
					<i className="fab fa-facebook-f" />
				</div>

				<div className="google">
					<i className="fab fa-google" />
				</div>
			</Grid>
		</Grid>
	);
};

export default Login;
