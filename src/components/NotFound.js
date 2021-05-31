import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
	const history = useHistory();
	return (
		<Grid container className="Home">
			<Grid item xs={12} className="not-found">
				<Typography variant="h2">Page does not exist</Typography>
				<Button variant="contained" className="btn" onClick={() => history.goBack()}>
					Go Back
				</Button>
			</Grid>
		</Grid>
	);
};

export default NotFound;
