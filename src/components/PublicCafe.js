import React, {useState} from 'react';
import useFetch from '../composables/useFetch';
import logo from '../assets/logo-grey-mobile-side.png';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import Nav from './Nav';
import { Link } from 'react-router-dom';

const PublicCafe = () => {
	const { data, isPending, error } = useFetch('cafes');
	console.log(data);
	const [searchTerm, setSearchTerm] = useState("");
	
	return (
		<Grid container xs={12} className="publiccafe">
			<Grid item xs={12}>
				<img src={logo} alt="logo" />
			</Grid>
			<Grid item xs={12}>
				<Typography>Public Cafés</Typography>
			</Grid>
			<Grid item xs={12} className="search">
				<input onChange={ event => {setSearchTerm(event.target.value)}} type="text" placeholder="Search"></input>
			</Grid>
			<Grid item xs={12} className="content">
				{error && <div>{error}</div>}
				{isPending && <CircularProgress></CircularProgress>}
				{data && (		
					<ul id="cafe-list"> {
						data.filter((data) => {
							if (searchTerm === "") {
								return data;
							} else {
								return data.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
								
							}
						}).map(cafes => {
							return (
								<Link to={ `/cafe-details/${cafes.id}`}> { cafes.name } </Link>
							)
						})
					} </ul>
				)}
		
			</Grid>
			<Nav />
		</Grid>
	)
};

export default PublicCafe;