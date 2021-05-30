import React, { useContext, useEffect } from 'react';
import useFetchOne from '../composables/useFetchOne';
import useFetchSub from '../composables/useFetchSub';
import { Collapse, Grid, Typography, CircularProgress, Button } from '@material-ui/core';
import Nav from './Nav';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import plus from '../assets/plus-icon.png';
import useDocument from '../composables/useDocument';
import { timestamp } from '../firebase/config';
import Alert from '@material-ui/lab/Alert';
import firebase from 'firebase/app';
import './cafe-details.css';
import { UserContext } from '../composables/UserContext';

const CafeDetails = () => {
	const { id } = useParams();
	const { data } = useFetchOne('cafes', id);
	const { dataSub, isPendingSub, errorSub } = useFetchSub('cafes', id, 'tables');
	const { addSubDoc, error, updateSubDoc, isPending } = useDocument();
	const history = useHistory();
	const [ currUser ] = useContext(UserContext);

	const checkUser = () => {
		if (!currUser.id) {
			history.push('/');
		}
	};
	useEffect(() => {
		const cleanup = checkUser();
		return () => cleanup;
	});

	const handleAddTable = () => {
		if (dataSub) {
			const table = {
				limitUsers: dataSub[0].limitUsers,
				numberOfUsers: 0,
				users: [],
				name: 'Table',
				createdAt: timestamp()
			};

			addSubDoc(table, 'cafes', 'tables', id);
		}
	};

	const handleUserEnter = (tId, limit, numUser, num, users) => {
		if (numUser < limit) {
			// const user = JSON.parse(localStorage.getItem('user'));
			let arrayLength = [];
			arrayLength = users;

			const doc = {
				numberOfUsers: arrayLength.length + 1,
				users: firebase.firestore.FieldValue.arrayUnion({
					imgURL: currUser.userImg ? currUser.userImg : '',
					userName: currUser.username
				})
			};
			updateSubDoc(doc, id, 'cafes', tId, 'tables');
			if (!isPending && error === null) {
				localStorage.setItem('cafeId', id);
				localStorage.setItem('cafeName', data ? data.name : '');
				localStorage.setItem('tableNum', num);
				history.push(`/tables/${tId}`);
			}
		}
	};

	return (
		<Grid container className="cafe-details">
			<Grid item xs={12} className="header">
				<Link to={'/public-cafe'}>
					<i className="fas fa-chevron-left" />
				</Link>
				{data && (
					<div className="title">
						<img src={data.imageURL} alt={data.name} />
						<Typography variant="h6">{data.name}</Typography>
					</div>
				)}
			</Grid>
			<Grid item xs={12} align="center">
				<Collapse in={error !== null}>
					<Alert severity="error">{error}</Alert>
				</Collapse>
			</Grid>
			<Grid item xs={12} className="grid general">
				<Link className="cafe btn" to="#">
					<Grid item xs={12} className="cafe-grid">
						<i className="fas fa-align-left" />
						<Typography variant="subtitle1">General Chat</Typography>
					</Grid>
				</Link>
			</Grid>
			<Grid item xs={12} className="cafes-list">
				{errorSub && <div>{errorSub}</div>}
				{isPendingSub && <CircularProgress />}
				{dataSub && (
					<Grid item xs={12} className="grid">
						{dataSub.map((tables, i) => {
							let num = i + 1;

							return (
								<Button
									key={tables.id}
									onClick={() =>
										handleUserEnter(
											tables.id,
											tables.limitUsers,
											tables.numberOfUsers,
											num,
											tables.users
										)}
									className="cafe btn"
								>
									<Grid item xs={12} className="cafe-grid">
										<i className="fas fa-volume-up" />
										<div className="table-grid">
											<Typography variant="subtitle1">
												{tables.name} {num}
											</Typography>

											<div className="table">
												<Typography variant="body1">
													{tables.numberOfUsers}/{tables.limitUsers}
												</Typography>
												<svg
													width="53"
													height="53"
													viewBox="0 0 53 53"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<circle
														cx="26.5001"
														cy="26.5"
														r="11.5"
														fill="#E2C6AE"
													/>
													<rect
														x="43.0389"
														y="29.039"
														width="11.9805"
														height="11.9805"
														transform="rotate(36.3284 43.0389 29.039)"
														fill={
															tables.numberOfUsers >= 3 ? (
																'#bc6600'
															) : (
																'#E2C6AE'
															)
														}
													/>
													<rect
														x="21.0001"
														width="12"
														height="12"
														fill={
															tables.numberOfUsers >= 1 ? (
																'#bc6600'
															) : (
																'#E2C6AE'
															)
														}
													/>
													<rect
														x="0.855835"
														y="35.8149"
														width="11.9805"
														height="11.9805"
														transform="rotate(-29.614 0.855835 35.8149)"
														fill={
															tables.numberOfUsers >= 5 ? (
																'#bc6600'
															) : (
																'#E2C6AE'
															)
														}
													/>
													<rect
														x="7.63489"
														y="6.78955"
														width="11.9805"
														height="11.9805"
														transform="rotate(39.5889 7.63489 6.78955)"
														fill={
															tables.numberOfUsers >= 6 ? (
																'#bc6600'
															) : (
																'#E2C6AE'
															)
														}
													/>
													<rect
														x="47.3754"
														y="7.64526"
														width="11.9805"
														height="11.9805"
														transform="rotate(61.9984 47.3754 7.64526)"
														fill={
															tables.numberOfUsers >= 2 ? (
																'#bc6600'
															) : (
																'#E2C6AE'
															)
														}
													/>
													<rect
														x="21.0001"
														y="41"
														width="12"
														height="12"
														fill={
															tables.numberOfUsers >= 4 ? (
																'#bc6600'
															) : (
																'#E2C6AE'
															)
														}
													/>
												</svg>
											</div>
										</div>
									</Grid>
								</Button>
							);
						})}{' '}
					</Grid>
				)}
			</Grid>
			<Button className="add-btn" onClick={handleAddTable}>
				<img src={plus} alt="add button" />
			</Button>
			<Nav current="public" />
		</Grid>
	);
};

export default CafeDetails;
