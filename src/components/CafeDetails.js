import React from 'react';
import useFetchOne from '../composables/useFetchOne';
import useFetchSub from '../composables/useFetchSub';
import logo from '../assets/logo-grey-mobile-side.png';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

const CafeDetails = () => {
	const { id } = useParams();
	const { data, isPending, error } = useFetchOne('cafes', id);
	const { dataSub, isPendingSub, errorSub } = useFetchSub('cafes', id, 'tables');
	console.log(data);
	console.log(dataSub);
	return (
		<Grid container xs={12} className="cafedetails">
			<Grid item xs={12}>
				<img src={logo} alt="logo" />
			</Grid>
			<Grid item xs={12}>
				{<Typography><div>{ data ? data.name : "" }</div></Typography>}
			</Grid>
			<Grid item xs={12} className="content">
				{errorSub && <div>{error}</div>}
				{isPendingSub && <CircularProgress></CircularProgress>}
				{dataSub && (		
					<ul id="cafe-list"> {
						dataSub.map(tables => {
							return (
								<Link to={ `/tables/${tables.id}`}> { tables.name } </Link>
							)
						})
					} </ul>
				)}
			</Grid>
			<Nav />
		</Grid>
	)
};

export default CafeDetails;