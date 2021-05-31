import React from 'react';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import useFetchOneSub from '../composables/useFetchOneSub';
import placeholder from '../assets/placeholder2.png';
import './voice.css';

const Voice = (props) => {
	const { dataOneSub, errorOneSub, isLoadingOneSub } = useFetchOneSub(
		'cafes',
		props.cafeId,
		'tables',
		props.tableId
	);

	return (
		<Grid item xs={12} className="voice">
			{errorOneSub && <div>{errorOneSub}</div>}
			{isLoadingOneSub && <CircularProgress />}
			{dataOneSub &&
				dataOneSub.users.map((user, i) => {
					return (
						<div>
							<Grid key={user.imgURL} className="user">
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
// {/*	{dataOneSub &&
// 	dataOneSub.map((user, i) => {
// 		console.log(user);
// 		return (
// 			<div>
// 				<Grid key={user.userName + i} className="user">
// 					<img src={user.imgURL} alt={user.name} />
// 					<Typography>{user.userName}</Typography>
// 				</Grid>
// 				<hr />
// 			</div>
// 		);
// 	})} */}
