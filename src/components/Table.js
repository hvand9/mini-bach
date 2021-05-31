import React, { useState, useEffect, useContext } from 'react';
import useFetchOneSub from '../composables/useFetchOneSub';
import useDocument from '../composables/useDocument';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, CircularProgress, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import videoImage from '../assets/musician-celebrating-jazz-day.jpg';
import NavTable from './NavTable';
import Chat from './Chat';
import Voice from './Voice';
import Video from './Video';
import EditTable from './EditTabel';
import firebase from 'firebase/app';
import { UserContext } from '../composables/UserContext';

import './table.css';

const Table = () => {
	const cafeName = localStorage.getItem('cafeName') ? localStorage.getItem('cafeName') : '';
	const cafeId = localStorage.getItem('cafeId') ? localStorage.getItem('cafeId') : '0';
	const tableNum = localStorage.getItem('tableNum') ? localStorage.getItem('tableNum') : '';
	const { id } = useParams();
	const history = useHistory();
	const { updateSubDoc, error, isPending } = useDocument();
	const { dataOneSub, errorOneSub, isLoadingOneSub } = useFetchOneSub(
		'cafes',
		cafeId,
		'tables',
		id
	);
	const [ navIcon, setNavIcon ] = useState('voice');
	const [ currUser ] = useContext(UserContext);

	const checkUser = () => {
		if (!localStorage.getItem('id')) {
			history.push('/');
		}
	};
	useEffect(() => {
		checkUser();
	});

	const leaveTable = () => {
		// const user = JSON.parse(localStorage.getItem('user'));
		let arrayLength = [];
		arrayLength = dataOneSub && dataOneSub.users;

		const doc = {
			numberOfUsers: arrayLength.length - 1,
			users: firebase.firestore.FieldValue.arrayRemove({
				imgURL: currUser.userImg ? currUser.userImg : '',
				userName: currUser.username
			})
		};
		updateSubDoc(doc, cafeId, 'cafes', id, 'tables');
		if (!isPending && error === null) {
			history.push(`/cafe-details/${cafeId}`);
		}
	};

	const clickNav = (value) => {
		setNavIcon(value);
	};
	return (
		<Grid container className="table-details">
			<Grid item xs={12} className="video-place">
				<img src={videoImage} alt="video music" />
			</Grid>
			<Grid item xs={12} className="header">
				<Button className="back" onClick={leaveTable}>
					<i className="fas fa-chevron-left" />
				</Button>
				<Typography variant="h2">{cafeName}</Typography>
				<i className="fas fa-heart heart" />
			</Grid>
			<Grid item xs={12} className="table-bar">
				{errorOneSub && <div>{errorOneSub}</div>}
				{isLoadingOneSub && <CircularProgress />}
				{dataOneSub && (
					<Grid item xs={12}>
						<Typography variant="h3">
							{dataOneSub.name} {tableNum}
						</Typography>
						<div>
							<Button
								className={navIcon === 'edit' ? 'current edit-btn' : 'edit-btn'}
								onClick={() => clickNav('edit')}
							>
								<i className="fas fa-edit" />
								<p>Edit</p>
							</Button>
							<Typography variant="body1" className="nums">
								{dataOneSub.numberOfUsers}/{dataOneSub.limitUsers}
							</Typography>
						</div>
					</Grid>
				)}
			</Grid>
			<Grid item xs={12}>
				{navIcon === 'voice' && <Voice cafeId={cafeId} tableId={id} />}
				{navIcon === 'video' && <Video />}
				{navIcon === 'chat' && <Chat cafeId={cafeId} tableId={id} clickNav={clickNav} />}
				{navIcon === 'edit' && <EditTable clickNav={clickNav} />}
			</Grid>
			{navIcon !== 'chat' &&
			navIcon !== 'edit' && <NavTable clickNav={clickNav} navIcon={navIcon} />}
		</Grid>
	);
};

export default Table;
