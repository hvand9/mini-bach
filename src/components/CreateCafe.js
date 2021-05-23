import React, { useState } from 'react';
import placeholder from '../assets/song-placeholder.png';
import {
	Grid,
	Typography,
	Button,
	FormControl,
	FormHelperText,
	TextField,
	Radio,
	RadioGroup,
	FormControlLabel,
	InputLabel,
	Select,
	Modal
} from '@material-ui/core';
import './createcafe.css';

const CreateCafe = () => {
	const [ data, setData ] = useState({
		imageUrl: '',
		type: '',
		name: '',
		description: '',
		categories: [],
		general: false,
		numTables: 0,
		numUsers: 0
	});

	const handleInput = (e, d) => {
		// console.log(e.target.value, name);
		setData((prevData) => {
			return {
				...prevData,
				d: e.target.value
			};
		});
		console.log(data);
	};

	return (
		<Modal
			className="modal-create"
			open
			disablePortal
			disableEnforceFocus
			disableAutoFocus
			// onClose={handleClose}
		>
			<Grid container className="modal-container">
				<Grid item xs={12} align="right">
					<Button className="close-btn">Close</Button>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h5">Create a Café</Typography>
				</Grid>
				<Grid item xs={12} className="picture-box">
					<img src={placeholder} alt="café profile" />
					<FormControl>
						{/* <TextField required={true} type="file" placeholder="Add Picture" /> */}
						<Button variant="text" component="label" className="choose-file">
							Add picture
							<input type="file" hidden />
						</Button>
						<Button className="btn">Upload</Button>
					</FormControl>
				</Grid>
				<Grid item xs={12} align="center">
					<FormControl component="fieldset">
						<RadioGroup
							row
							className="radio-box"
							onChange={(e) => handleInput(e, 'type')}
						>
							<FormHelperText className="label">Type</FormHelperText>
							<FormControlLabel
								value="public"
								control={<Radio color="primary" />}
								label="Public"
								className="radio-btn"
							/>
							<FormControlLabel
								value="private"
								control={<Radio color="primary" />}
								label="Private"
								className="radio-btn"
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<TextField
						// error={}
						label="Name"
						placeholder="Name"
						// value={}
						variant="outlined"
						onChange={(e) => handleInput(e, 'name')}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="outlined-textarea"
						label="Description"
						placeholder="Description"
						multiline
						variant="outlined"
						rows={4}
						onChange={(e) => handleInput(e, 'description')}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="subtitle2">Categories</Typography>
				</Grid>
				<Grid item xs={12} className="category">
					<div className="cat-box">
						<div className="cat-icon">
							<i className="fas fa-music" />
						</div>
						<div className="cat-icon" />
						<div className="cat-icon" />
						<div className="cat-icon" />
						<div className="cat-icon" />
						<div className="cat-icon" />
					</div>
					<FormControl variant="filled">
						<InputLabel htmlFor="filled-age-native-simple">Select</InputLabel>
						<Select
							native
							// value={state.age}
							// onChange={handleChange}
							inputProps={{
								name: 'select',
								id: 'filled-age-native-simple'
							}}
						>
							<option aria-label="None" value="" />
							<option value={10}>Music</option>
							<option value={20}>Anime</option>
							<option value={30}>Games</option>
							<option value={30}>Movies</option>
							<option value={30}>Comedy</option>
							<option value={30}>Art</option>
							<option value={30}>Books</option>
							<option value={30}>Environment</option>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="subtitle2">Tables</Typography>
				</Grid>
				<Grid item xs={12} align="center">
					<FormControl component="fieldset">
						<RadioGroup
							row
							className="radio-box"
							onChange={(e) => handleInput(e, 'categories')}
						>
							<FormHelperText className="label">General Table</FormHelperText>
							<FormControlLabel
								value="true"
								control={<Radio color="primary" />}
								label="yes"
								className="radio-btn"
							/>
							<FormControlLabel
								value="false"
								control={<Radio color="primary" />}
								label="no"
								className="radio-btn"
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required={true}
						type="number"
						variant="outlined"
						label="Number of Tables"
						// placeholder="Number of Tables"
						inputProps={{ min: 1 }}
						onChange={(e) => handleInput(e, 'numTables')}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="outlined-number"
						required={true}
						type="number"
						variant="outlined"
						label="Limit of Users in table"
						// placeholder="Number of Tables"
						inputProps={{ min: 1 }}
						onChange={(e) => handleInput(e, 'numUsers')}
					/>
				</Grid>
				<Grid item xs={12} className="btn-box create-btn">
					<Button variant="contained" className="btn">
						Create
					</Button>
				</Grid>
				<Grid item xs={12} className="btn-box cancel">
					<Button className="close-btn">Cancel</Button>
				</Grid>
			</Grid>
		</Modal>
	);
};

export default CreateCafe;
