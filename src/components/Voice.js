import React, { useContext } from 'react';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import useFetchOneSub from '../composables/useFetchOneSub';
import placeholder from '../assets/placeholder2.png';
import { UserContext } from '../composables/UserContext';
import './voice.css';

const Voice = (props) => {
	const { dataOneSub, errorOneSub, isLoadingOneSub } = useFetchOneSub(
		'cafes',
		props.cafeId,
		'tables',
		props.tableId
	);
	const [ currUser, setCurrUser ] = useContext(UserContext);

	return (
		<Grid item xs={12} className="voice">
			{errorOneSub && <div>{errorOneSub}</div>}
			{isLoadingOneSub && <CircularProgress />}
			{dataOneSub &&
				dataOneSub.users.map((user, i) => {
					return (
						<div key={currUser.id}>
							<Grid className="user">
								<img
									src={user.imgURL ? user.imgURL : placeholder}
									alt={user.name}
								/>
								<Typography>{user.userName}</Typography>
							</Grid>
							<hr />
						</div>
					);
				})}
		</Grid>
	);
};

export default Voice;
