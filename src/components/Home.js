import React from 'react';
import logo from '../assets/logo-grey.png';
import illustration from '../assets/illustration.png';
import { Grid, Typography, Button, ButtonGroup } from '@material-ui/core';
import './home.css';

const Home = () => {
	return (
		<Grid container xs={12}>
			<Grid item xs={12}>
				<img src={logo} alt="logo" />
			</Grid>
			<Grid item xs={12}>
				<img src={illustration} alt="logo" />
				<Typography>Welcome</Typography>
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained">Sing in</Button>
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained">Sing up</Button>
			</Grid>
		</Grid>
	);
};

export default Home;
