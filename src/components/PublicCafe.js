import React, { useState, useEffect, useContext } from 'react';
import useFetch from '../composables/useFetch';
import logo from '../assets/logo-grey-mobile-side.png';
import plus from '../assets/plus-icon.png';
import {
	Grid,
	Typography,
	CircularProgress,
	Button,
	TextField,
	InputAdornment
} from '@material-ui/core';
import Nav from './Nav';
import { Link, useHistory } from 'react-router-dom';
import './PublicCafe.css';
import CreateCafe from './CreateCafe';
import useGetUser from '../composables/useGetUser';
import useFetchQuery from '../composables/useFetchQuery';
import useDocument from '../composables/useDocument';
import { UserContext } from '../composables/UserContext';

const PublicCafe = () => {
	const { data, isPending, error } = useFetch('cafes');
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ showModal, setShowModal ] = useState(false);
	const [ showAll, setShowAll ] = useState(true);
	const { user } = useGetUser();
	const history = useHistory();
	const { dataQ, isPendingQ, errorQ } = useFetchQuery('cafes', 'users');
	const { updateField } = useDocument();
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

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const handleSave = (e, id) => {
		if (user) {
			updateField('cafes', id, 'users');
		}
	};

	return (
		<Grid container className="public-cafe">
			<Grid item xs={12} className="header" align="left">
				<img src={logo} alt="logo" />
				<Typography variant="h4">Public Cafés</Typography>
			</Grid>
			<Grid item xs={12} className="search">
				<TextField
					variant="outlined"
					name="search"
					placeholder="Search"
					onChange={(event) => {
						setSearchTerm(event.target.value);
					}}
					required={true}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<i className="fas fa-search" />
							</InputAdornment>
						)
					}}
				/>
			</Grid>
			<Grid item xs={12} className="show-btns">
				<Button onClick={() => setShowAll(true)}>All Cafés</Button>
				<Button onClick={() => setShowAll(false)}>Favorites</Button>
			</Grid>
			{showAll && (
				<Grid item xs={12} className="cafes-list">
					{error && <div>{error}</div>}
					{isPending && <CircularProgress />}
					{data && (
						<Grid item xs={12} className="grid">
							{data
								.filter((data) => {
									if (searchTerm === '') {
										return data;
									} else {
										return (
											data.name
												.toLowerCase()
												.indexOf(searchTerm.toLowerCase()) !== -1
										);
									}
								})
								.map((cafes) => {
									return (
										<div className="cafe btn" key={cafes.id}>
											<Button onClick={(e) => handleSave(e, cafes.id)}>
												<i className="fas fa-heart" />
											</Button>
											<Link className="btn" to={`/cafe-details/${cafes.id}`}>
												<Grid item xs={12} className="cafe-grid">
													<img src={cafes.imageURL} alt={cafes.name} />
													<div>
														<Typography variant="h6" align="left">
															{cafes.name}
														</Typography>
														<Typography variant="body2" align="left">
															{cafes.description}
														</Typography>
													</div>
												</Grid>
											</Link>
										</div>
									);
								})}
						</Grid>
					)}
				</Grid>
			)}
			{!showAll && (
				<Grid item xs={12} className="cafes-list">
					{errorQ && <div>{error}</div>}
					{isPendingQ && <CircularProgress />}
					{dataQ &&
					user && (
						<Grid item xs={12} className="grid">
							{dataQ
								.filter((data) => {
									if (searchTerm === '') {
										return data;
									} else {
										return (
											data.name
												.toLowerCase()
												.indexOf(searchTerm.toLowerCase()) !== -1
										);
									}
								})
								.map((cafes) => {
									return (
										<Link
											to={`/cafe-details/${cafes.id}`}
											className="cafe btn"
											key={cafes.id}
										>
											<Grid item xs={12} className="cafe-grid">
												<img src={cafes.imageURL} alt={cafes.name} />
												<div>
													<Typography variant="h6" align="left">
														{cafes.name}
													</Typography>
													<Typography variant="body2" align="left">
														{cafes.description}
													</Typography>
												</div>
											</Grid>
										</Link>
									);
								})}
						</Grid>
					)}
				</Grid>
			)}
			<Button className="add-btn" onClick={toggleModal}>
				<img src={plus} alt="add button" />
			</Button>
			{showModal && <CreateCafe show={showModal} toggleModal={toggleModal} />}
			<Nav current={'public'} />
		</Grid>
	);
};

export default PublicCafe;
