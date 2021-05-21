import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-grey.png';
import illustration from '../assets/illustration.png';
import { Grid, Typography, Button } from '@material-ui/core';
import './home.css';

const Home = () => {
	return (
		<Grid container className="Home">
			<Grid item xs={12}>
				<img src={logo} alt="logo" className="logo" />
			</Grid>
			<Grid item xs={12}>
				<img src={illustration} alt="logo" className="illustration" />
				<Typography className="title">Welcome</Typography>
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained" to={'/login'} component={Link}>
					Sing in
				</Button>
			</Grid>
			<Grid item xs={12} className="btn-box">
				<Button variant="contained" to={'/signup'} component={Link}>
					Sing up
				</Button>
			</Grid>
		</Grid>
	);
};

export default Home;
