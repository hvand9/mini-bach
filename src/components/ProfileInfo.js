import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-grey-mobile-side.png';
import { Grid, Typography, Button, Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { projectAuth } from '../firebase/config';
/*import useLogout from '../composables/useLogout'*/
import { UserContext } from '../composables/UserContext';
import placeholder from '../assets/placeholder2.png';
import './profileinfo.css';
import Nav from './Nav';

const ProfileInfo = () => {
	const [ error, setError ] = useState(null);
	const history = useHistory();
	const [ currUser, setCurrUser ] = useContext(UserContext);

	const checkUser = () => {
		console.log(currUser);
		if (!currUser.id) {
			history.push('/');
		}
	};
	useEffect(() => {
		const cleanup = checkUser();
		return () => cleanup;
	});

	const handleSubmit = async () => {
		setError(null);

		try {
			await projectAuth.signOut();
			setCurrUser({
				id: '',
				username: '',
				userImg: ''
			});

			history.push('/');
		} catch (err) {
			console.log(err.message);
			setError(err.message);
		}
	};

	return (
		<Grid container className="ProfileInfo">
			<Grid item xs={12} align="left" className="logo-box">
				<img src={logo} alt="logo" className="logo" />
			</Grid>

			<Grid item xs={12} className="user-header" align="left">
				<img src={currUser.username ? currUser.userImg : placeholder} alt="user" />
				<div>
					<Typography variant="h2">{currUser.username}</Typography>
					<Typography>{currUser.email}</Typography>
				</div>
			</Grid>
			<Grid item xs={12} className="btn-box">
				<div>
					<div>
						<Button>
							<Typography>Set Status</Typography>
							<i className="fas fa-chevron-right" />
						</Button>
					</div>
					<hr />
				</div>
				<div>
					<div>
						<Button>
							<Typography>Account</Typography>
							<i className="fas fa-chevron-right" />
						</Button>
					</div>
					<hr />
				</div>
				<div>
					<Button>
						<Typography>Language</Typography>
						<i className="fas fa-chevron-right" />
					</Button>

					<hr />
				</div>
				<div>
					<Button>
						<Typography>Notifications</Typography>
						<i className="fas fa-chevron-right" />
					</Button>

					<hr />
				</div>
				<div>
					<Button>
						<Typography>Voice & Video</Typography>
						<i className="fas fa-chevron-right" />
					</Button>
					<hr />
				</div>
				<div>
					<div>
						<Button>
							<Typography>Support</Typography>
							<i className="fas fa-chevron-right" />
						</Button>
					</div>
					<hr />
				</div>
			</Grid>
			<Grid item xs={12} align="center">
				<Collapse in={error !== null}>
					<Alert severity="error">{error}</Alert>
				</Collapse>
			</Grid>
			<Grid item xs={12} align="center" className="logout-btn">
				<Button variant="contained" onClick={handleSubmit} className="btn">
					Logout
				</Button>
			</Grid>
			<Nav current={'profile'} />
		</Grid>
	);
};

export default ProfileInfo;
