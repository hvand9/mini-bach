import React, { useState, useContext } from 'react';
import { Grid, Typography, Button, InputAdornment, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import logo from '../assets/logo-brown-mobile.png';
import { Link, useHistory } from 'react-router-dom';
import { TextField } from '@material-ui/core';
// import useSignup from '../composables/useSignup';
import { projectAuth } from '../firebase/config';
import { UserContext } from '../composables/UserContext';

import './signup.css';

const Signup = () => {
	// const { error, signup } = useSignup();
	const [ displayName, setDisplayName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ rPassword, setRPassword ] = useState('');
	const [ userError, setUserError ] = useState(false);
	const [ emailError, setEmailError ] = useState(false);
	const [ passError, setPassError ] = useState(false);
	const [ rPassError, setRPassError ] = useState(false);
	const [ error, setError ] = useState(null);
	const history = useHistory();
	const [ currUser, setCurrUser ] = useContext(UserContext);

	const handlesubmit = async (e) => {
		if (
			!userError &&
			!emailError &&
			!passError &&
			!rPassError &&
			displayName &&
			email &&
			password &&
			rPassword
		) {
			setError(null);

			try {
				const res = await projectAuth.createUserWithEmailAndPassword(email, password);

				if (!res) {
					throw new Error('Could not complete the signup');
				}
				await res.user.updateProfile({ displayName });
				setError(null);

				setCurrUser({
					id: res.user.uid,
					username: displayName,
					userImg: '',
					email: email
				});

				history.push('/profile');
				return res;
			} catch (err) {
				console.log(err.message);
				setError(err.message);
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
					Sign up
				</Typography>
			</Grid>

			<Grid item xs={12} className="icons-sign">
				<div className="facebook">
					<i className="fab fa-facebook-f" />
				</div>

				<div className="google">
					<i className="fab fa-google" />
				</div>
			</Grid>
			<Grid item xs={12} align="center" className="hr-box">
				<hr />
			</Grid>
			<Grid item xs={12} className="Input">
				<TextField
					error={userError}
					helperText={userError ? 'add an username. Min 4 char' : ''}
					type="text"
					className="filled-basic"
					placeholder="Username"
					variant="outlined"
					onChange={(e) => setDisplayName(e.target.value)}
					onBlur={() =>
						displayName.length >= 4 ? setUserError(false) : setUserError(true)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<i className="fas fa-user" />
							</InputAdornment>
						)
					}}
				/>
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
			<Grid item xs={12} className="Input">
				<TextField
					error={rPassError}
					helperText={rPassError ? 'password must match' : ''}
					type="password"
					className="filled-basic"
					variant="outlined"
					placeholder="Repeat Password"
					onChange={(e) => setRPassword(e.target.value)}
					onBlur={(e) =>
						rPassword === password && rPassword
							? setRPassError(false)
							: setRPassError(true)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<i className="fas fa-lock" />
							</InputAdornment>
						)
					}}
				/>
			</Grid>
			<Grid item xs={12} align="center">
				<Collapse in={error !== null}>
					<Alert severity="error">{error}</Alert>
				</Collapse>
			</Grid>
			<Grid item xs={12} className="bttn-box">
				<Button variant="contained" onClick={handlesubmit} className="btn">
					Sign up
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Typography className="change-sign">
					I already have an account.{' '}
					<Link to={'/login'} className="link">
						Login
					</Link>
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Signup;
