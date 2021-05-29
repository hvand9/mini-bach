import React, { useState } from 'react';
import useFetchOneSub from '../composables/useFetchOneSub';
import { Grid, Typography, CircularProgress, Button } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import videoImage from '../assets/musician-celebrating-jazz-day.jpg';
import NavTable from './NavTable';
import Chat from './Chat';
import Voice from './Voice';
import Video from './Video';
import EditTable from './EditTabel';

import './table.css';

const Table = (props) => {
	const location = useLocation();
	const { cafeId, cafeName, tableNum } = location.state;
	const { id } = useParams();
	const { dataOneSub, errorOneSub, isLoadingOneSub } = useFetchOneSub(
		'cafes',
		cafeId,
		'tables',
		id
	);
	const [ navIcon, setNavIcon ] = useState('voice');
	// console.log(dataOneSub);
	// const audioTune = new Audio('../assets/Marshmallow-(Prod-by-Lukrembo).mp3');
	// const [ playInLoop, setPlayInLoop ] = useState(false);

	// useEffect(() => {
	// 	audioTune.load();
	// }, []);

	// useEffect(
	// 	() => {
	// 		audioTune.loop = playInLoop;
	// 	},
	// 	[ playInLoop, audioTune ]
	// );

	const clickNav = (value) => {
		setNavIcon(value);
	};
	return (
		<Grid container className="table-details">
			<Grid item xs={12} className="video-place">
				{/* <iframe
					width="100%"
					height="315"
					src="https://www.youtube-nocookie.com/embed/7PL7ADKDYcw?controls=0"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/> */}
				<img src={videoImage} alt="video music" />
			</Grid>
			<Grid item xs={12} className="header">
				<Link to={`/cafe-details/${cafeId}`} className="back">
					<i className="fas fa-chevron-left" />
				</Link>
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
							<Button className="edit-btn" onClick={() => clickNav('edit')}>
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
				{navIcon === 'voice' && <Voice />}
				{navIcon === 'video' && <Video />}
				{navIcon === 'chat' && <Chat cafeId={cafeId} tableId={id} clickNav={clickNav} />}
				{navIcon === 'edit' && <EditTable />}
			</Grid>
			{navIcon !== 'chat' &&
			navIcon !== 'edit' && <NavTable clickNav={clickNav} navIcon={navIcon} />}
		</Grid>
	);
};

export default Table;
