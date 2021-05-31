import React from 'react';
import { Grid, Button } from '@material-ui/core';
import './navtable.css';

const NavTable = (props) => {
	return (
		<Grid item xs={12} className="nav-table">
			<Button
				onClick={() => props.clickNav('voice')}
				className={props.navIcon === 'settings' ? 'current' : ''}
			>
				<i className="fas fa-cog" />
			</Button>
			<Button
				onClick={() => props.clickNav('voice')}
				className={props.navIcon === 'voice' ? 'current' : ''}
			>
				<i className="fas fa-microphone" />
			</Button>
			<Button
				onClick={() => props.clickNav('video')}
				className={props.navIcon === 'video' ? 'current' : ''}
			>
				<i className="fas fa-video" />
			</Button>
			<Button
				onClick={() => props.clickNav('chat')}
				className={props.navIcon === 'chat' ? 'current' : ''}
			>
				<i className="fas fa-comment-dots" />
			</Button>
		</Grid>
	);
};

export default NavTable;
