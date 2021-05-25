import React, { useEffect, useState } from 'react';
import placeholder from '../assets/song-placeholder.png';
import useStorage from '../composables/useStorage';
import Alert from '@material-ui/lab/Alert';
import useDocument from '../composables/useDocument';
import { projectStorage, projectFirestore } from '../firebase/config';

import {
	Collapse,
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

const CreateCafe = (props) => {
	const { url, uploadImage, errorS } = useStorage('/cafe-pictures');
	const [ data, setData ] = useState({
		imageUrl: '',
		type: '',
		name: '',
		description: '',
		categories: [],
		general: false,
		numTables: 0,
		numUsers: 0,
		imagePath: '',
		host: null
	});
	const [ fileError, setFileError ] = useState(null);
	const [ showCat, setShowCat ] = useState(false);
	const [ file, setFile ] = useState(null);
	const imgTypes = [ 'image/png', 'image/jpeg' ];
	const { isPending, error, addSubDoc } = useDocument();
	const [ inputError, setInputError ] = useState('');
	const [ addError, setAddError ] = useState(null);
	const [ addPending, setAddPending ] = useState(true);

	const handleInput = (e) => {
		const { name, value } = e.target;
		// console.log(name, value);
		setData((prevData) => {
			return {
				...prevData,
				[name]: value
			};
		});
	};

	const handleImage = (e) => {
		let selected = e.target.files[0];

		if (selected && imgTypes.includes(selected.type)) {
			setFile(selected);
			setFileError(null);
		} else {
			setFileError(null);
			setFileError('Please select an image file (png or jpg)');
		}
	};

	const handleUpload = async (e) => {
		e.preventDefault();
		if (file) {
			await uploadImage(file);

			projectStorage.ref('/cafe-pictures').child(file.name).getDownloadURL().then((url) => {
				setData((prevData) => {
					return {
						...prevData,
						imagePath: `/cafe-pictures/${file.name}`,
						imageUrl: url
					};
				});
			});
		}
	};

	const handleSelectCat = (e) => {
		const value = e.target.value;
		if (value) {
			if (data.categories.find((cat) => cat === value)) {
				e.target.value = '';
				return;
			}
			setData((prevData) => {
				return {
					...prevData,
					categories: [ ...data.categories, value ]
				};
			});
			setShowCat(true);
			setTimeout(() => {
				e.target.value = '';
			}, 400);
		}
	};

	const categoryDisplay = (cat) => {
		switch (cat) {
			case 'music':
				return <i className="fas fa-music" />;
			case 'anime':
				return <i className="fas fa-moon" />;
			case 'games':
				return <i className="fas fa-gamepad" />;
			case 'movies':
				return <i className="fas fa-film" />;
			case 'comedy':
				return <i className="fas fa-theater-masks" />;
			case 'books':
				return <i className="fas fa-book" />;
			case 'environment':
				return <i className="fas fa-seedling" />;
			case 'art':
				return <i className="fas fa-palette" />;
			default:
				break;
		}
	};

	const handleCatRemove = (e, i) => {
		e.preventDefault();
		const newCateg = [ ...data.categories ];
		newCateg.splice(i, 1);
		setData((prevData) => {
			return {
				...prevData,
				categories: newCateg
			};
		});
	};

	const handleClose = () => {
		props.toggleModal();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			!data.name ||
			!data.imagePath ||
			!data.imageUrl ||
			!data.categories ||
			!data.numTables ||
			!data.numUsers
		) {
			// console.log(data);
			setInputError('Complete required fields!');
		} else {
			const doc = {
				name: data.name + ' Café',
				description: data.description,
				general: data.general === 'true' ? true : false,
				imagePath: data.imagePath,
				imageURL: url,
				categories: data.categories,
				host: ''
			};
			const table = {
				limitUsers: Number(data.numUsers),
				numberOfUsers: 0,
				users: []
			};

			try {
				const res = await projectFirestore.collection('cafes').add(doc);
				const id = res.id;
				setAddPending(false);
				// console.log(id);

				let i = 0;
				while (i < Number(data.numTables)) {
					addSubDoc(table, 'cafes', 'tables', id);
					i++;
				}
				if (!isPending && error === null) {
					handleClose();
				} else {
					console.log(error);
				}
			} catch (err) {
				setAddError('could not add doc in collection');
				setAddPending(false);
				console.log(err.message);
			}
		}
	};

	useEffect(() => {
		return () => handleSubmit;
	});

	return (
		<Modal
			className="modal-create"
			open
			disablePortal
			disableEnforceFocus
			disableAutoFocus
			onClose={handleClose}
		>
			<Grid container className="modal-container">
				<Grid item xs={12} align="right">
					<Button className="close-btn" onClick={handleClose}>
						Close
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h5">Create a Café</Typography>
				</Grid>
				<Grid item xs={12} align="center">
					<Collapse in={fileError !== null || errorS !== null}>
						{fileError && (
							<Alert
								severity="error"
								onClose={() => {
									setFileError(null);
								}}
							>
								{fileError}
							</Alert>
						)}
						{errorS && <Alert severity="error">{errorS}</Alert>}
					</Collapse>
				</Grid>
				<Grid item xs={12} className="picture-box">
					<img src={url ? url : placeholder} alt="café profile" />
					<FormControl>
						<Button
							variant="text"
							component="label"
							className="choose-file"
							onChange={handleImage}
						>
							{file ? file.name : 'Add picture'}
							<input type="file" hidden />
						</Button>
						<Button className="btn" onClick={handleUpload}>
							Upload
						</Button>
					</FormControl>
				</Grid>
				<Grid item xs={12} align="center">
					<FormControl component="fieldset">
						<RadioGroup row className="radio-box" name="type" onChange={handleInput}>
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
						label="Name"
						placeholder="Name"
						variant="outlined"
						name="name"
						onChange={handleInput}
						required={true}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required={true}
						id="outlined-textarea"
						label="Description"
						placeholder="Description"
						multiline
						variant="outlined"
						rows={4}
						name="description"
						onChange={handleInput}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="subtitle2">Categories</Typography>
				</Grid>
				<Grid item xs={12} className="category">
					{showCat ? (
						<div className="cat-box">
							{data.categories.map((cat, index) => {
								return (
									<div
										className="cat-icon"
										key={cat}
										onClick={(e) => handleCatRemove(e, index)}
									>
										{categoryDisplay(cat)}
									</div>
								);
							})}
						</div>
					) : (
						<div className="cat-box">
							<div className="cat-icon" />
							<div className="cat-icon" />
							<div className="cat-icon" />
							<div className="cat-icon" />
							<div className="cat-icon" />
							<div className="cat-icon" />
						</div>
					)}

					<FormControl variant="filled">
						<InputLabel htmlFor="filled-age-native-simple">Select</InputLabel>
						<Select
							required={true}
							native
							onChange={handleSelectCat}
							inputProps={{
								name: 'select',
								id: 'filled-age-native-simple'
							}}
						>
							<option aria-label="None" value="" />
							<option value="music">Music</option>
							<option value="anime">Anime</option>
							<option value="games">Games</option>
							<option value="movies">Movies</option>
							<option value="comedy">Comedy</option>
							<option value="art">Art</option>
							<option value="books">Books</option>
							<option value="environment">Environment</option>
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
							name="general"
							onChange={handleInput}
							required={true}
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
						inputProps={{ min: 1 }}
						name="numTables"
						onChange={handleInput}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="outlined-number"
						required={true}
						type="number"
						variant="outlined"
						label="Limit of Users in table"
						inputProps={{ min: 1 }}
						name="numUsers"
						onChange={handleInput}
					/>
				</Grid>
				<Grid item xs={12} align="center">
					<Collapse in={error !== null || inputError !== '' || addError !== null}>
						{error && <Alert severity="error">{error}</Alert>}
						{addError && <Alert severity="error">{addError}</Alert>}
						{inputError && (
							<Alert
								severity="error"
								onClose={() => {
									setInputError('');
								}}
							>
								{inputError}
							</Alert>
						)}
					</Collapse>
				</Grid>
				<Grid item xs={12} className="btn-box create-btn">
					<Button variant="contained" className="btn" onClick={handleSubmit}>
						Create
					</Button>
				</Grid>
				<Grid item xs={12} className="btn-box cancel">
					<Button className="close-btn" onClick={handleClose}>
						Cancel
					</Button>
				</Grid>
			</Grid>
		</Modal>
	);
};

export default CreateCafe;

// import React, { useState } from 'react';
// import CreateCafe from './CreateCafe';

// // const PublicCafe = () => {
// // 	const [ showModal, setShowModal ] = useState(false);

// // 	const toggleModal = () => {
// // 		setShowModal(!showModal);
// // 	};
// // 	return (
// // 		<div>
// // 			<h1>Public Cafes</h1>
// // 			{showModal && <CreateCafe show={showModal} toggleModal={toggleModal} />}
// // 			<button onClick={toggleModal}>open</button>
// // 		</div>
// // 	);
// // };

// // export default PublicCafe;
