import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/logo-grey.png';
import illustration from '../assets/illustration.png';
import { Grid, Typography, Button } from '@material-ui/core';
import './home.css';

const Home = () => {
	const history = useHistory();

	useEffect(
		() => {
			if (localStorage.getItem('id')) {
				history.push('/welcome');
			}
		},
		[ history ]
	);

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
				<Button variant="contained" to={'/login'} component={Link} className="btn">
					Login
				</Button>
			</Grid>
			<Grid item xs={12} className="btn-box">
				<Button variant="contained" to={'/signup'} component={Link} className="btn">
					Sing up
				</Button>
			</Grid>
		</Grid>
	);
};

export default Home;
