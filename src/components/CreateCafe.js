import React from 'react';
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
	Select
} from '@material-ui/core';

const CreateCafe = () => {
	return (
		<Grid container>
			<Grid item xs={12}>
				<Button>Close</Button>
			</Grid>
			<Grid item xs={12}>
				<Typography>Create a Café</Typography>
			</Grid>
			<Grid item xs={12}>
				<img src="" alt="café profile" />
				<FormControl>
					<FormHelperText className="info">Votes required to skip song</FormHelperText>
					<TextField required={true} type="file" />
				</FormControl>
				<Button>Upload</Button>
			</Grid>
			<Grid item xs={12} align="center">
				<FormControl component="fieldset">
					<RadioGroup row>
						<FormHelperText>Type</FormHelperText>
						<FormControlLabel
							value="public"
							control={<Radio color="primary" />}
							label="Public"
						/>
						<FormControlLabel
							value="private"
							control={<Radio color="primary" />}
							label="Private"
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
					// helperText={}
					variant="outlined"
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
				/>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h6">Categories</Typography>
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
						<option value={10}>Ten</option>
						<option value={20}>Twenty</option>
						<option value={30}>Thirty</option>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h6">Tables</Typography>
			</Grid>
			<Grid item xs={12} align="center">
				<FormControl component="fieldset">
					<RadioGroup row>
						<FormHelperText>General Table</FormHelperText>
						<FormControlLabel
							value="true"
							control={<Radio color="primary" />}
							label="yes"
						/>
						<FormControlLabel
							value="false"
							control={<Radio color="primary" />}
							label="no"
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
					// onChange={handelVotesChange}
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
					// onChange={handelVotesChange}
				/>
			</Grid>
			<Grid item xs={12} className="btn-box">
				<Button variant="contained">Create</Button>
			</Grid>
			<Grid item xs={12} className="btn-box">
				<Button>Close</Button>
			</Grid>
		</Grid>
	);
};

export default CreateCafe;
