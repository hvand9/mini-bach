import React from 'react';
import useFetch from '../composables/useFetch';
import logo from '../assets/logo-grey-mobile-side.png';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import Nav from './Nav';
import { Link } from 'react-router-dom';

const tables = () => {
	// const { data, isPending, error } = useFetch('tables');
	// console.log(data);
	// return (
	// 	<Grid container xs={12} className="tables">
	// 		<Grid item xs={12}>
	// 			<img src={logo} alt="logo" />
	// 		</Grid>
	// 		<Grid item xs={12}>
	// 			<Typography><div>{ tables.name }</div></Typography>
	// 		</Grid>
	// 		<Grid item xs={12} className="content">
	// 			{error && <div>{error}</div>}
	// 			{isPending && <CircularProgress></CircularProgress>}
	// 			{data && (		
	// 				<ul id="cafe-list">
	// 					{ 
	// 					data.map(tables => {
	// 						return (
	// 							<Link to={ `/tables/${table.id}`}> { tables.name } </Link>
	// 						)
	// 					})}
	// 				</ul>
	// 			)}
		
	// 		</Grid>
	// 		<Nav />
	// 	</Grid>
	// )
};

export default Table;