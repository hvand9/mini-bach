import React from 'react';
import { Grid } from '@material-ui/core';
import user1 from '../assets/camera-user-1-mobile.png';
import user2 from '../assets/camera-user-2-mobile.png';
import user3 from '../assets/camera-user-3-mobile.png';
import './video.css';

const Video = () => {
	return (
		<Grid item xs={12} className="video">
			<div className="images1">
				<img src={user1} alt="user1" /> <img src={user2} alt="user1" />
			</div>
			<div>
				<img src={user3} alt="user3" />
			</div>
		</Grid>
	);
};

export default Video;
