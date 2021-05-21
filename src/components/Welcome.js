import React from 'react';
import logo from '../assets/logo-grey-mobile-side.png';
import { Grid, Typography } from '@material-ui/core';
import './welcome.css';
import Nav from './Nav';

const Welcome = () => {
	return (
		<Grid container className="welcome">
			<Grid item xs={12}>
				<img src={logo} alt="logo" />
			</Grid>
			<Grid item xs={12}>
				<Typography>Welcome, username</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography>Private Cafés</Typography>
				{/* slider */}
			</Grid>
			<Grid item xs={12}>
				<Typography>Recent Cafés</Typography>
				{/* slider */}
			</Grid>
			<Nav />
		</Grid>
	);
};

export default Welcome;
