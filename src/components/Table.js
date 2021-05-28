import React from 'react';
import useFetchOne from '../composables/useFetchOne';
import useFetchSub from '../composables/useFetchSub';
import useFetchChat from '../composables/useFetchChat';
import logo from '../assets/logo-grey-mobile-side.png';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

const Table = () => {
	const { id } = useParams();
	const { data1, isPending, error } = useFetchOne('cafes', id);
	const { data2, isPendingSub, errorSub } = useFetchSub('cafes', id, 'tables');
	//const { data3, isPendingChat, errorChat } = useFetchChat('cafes', id, 'tables', 'ChatCollection');
	console.log(data1);
	console.log(data2);
	//console.log(data3);
	return (
		<Grid container xs={12} className="tables">
			<Grid item xs={12}>
				<img src={logo} alt="logo" />
			</Grid>
			<Grid item xs={12}>
				<Typography><h2>Chat</h2></Typography>
			</Grid>
			<Grid item xs={12} className="content">
				{error && <div>{error}</div>}
				{isPending && <CircularProgress></CircularProgress>}
			</Grid>
			<Nav />
		</Grid>
	)
};

export default Table;