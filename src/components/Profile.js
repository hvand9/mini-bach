import {
	Collapse,
	Grid,
	Typography,
	Button,
	FormControl,
	InputLabel,
	Select,

} from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import logo from '../assets/logo-brown-mobile.png';
import Alert from '@material-ui/lab/Alert';
import {useHistory, Link } from 'react-router-dom';
import { projectStorage } from '../firebase/config';
import placeholder from '../assets/placeholder2.png';
import useStorage from '../composables/useStorage';
import useGetUser from '../composables/useGetUser';
import useDocument from '../composables/useDocument'
import { UserContext } from '../composables/UserContext';

import './profile.css';

const Profile = () => {
	const { url, uploadImage, errorS } = useStorage('/user-pictures', 'user');
	const { user } = useGetUser();
	const history = useHistory();
	const [ fileError, setFileError ] = useState(null);
	const [ file, setFile ] = useState(null);
	const [ showInt, setShowInt ] = useState(false);
	const [ showCult, setShowCult ] = useState(false);
	const [ showLang, setShowLang ] = useState(false);
	const [ inputError, setInputError ] = useState('');
	const [ data, setData ] = useState({
		imageUrl: '',
		interests: [],
		cultures: [],
		languages: [],
		imagePath: ''
	});
	const imgTypes = [ 'image/png', 'image/jpeg' ];
	const {addUser, isPending, error} = useDocument()
	const [ currUser, setCurrUser ] = useContext(UserContext);

	const checkUser = () => {
		// console.log(currUser)
		if (!currUser.id) {
			 history.push('/');
		}
	};
	useEffect(() => {
		const cleanup = checkUser();
		return () => cleanup;
	});

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

			projectStorage
				.ref('/user-pictures/' + user.uid)
				.child(file.name)
				.getDownloadURL()
				.then((url) => {
					user.updateProfile({photoURL: url})
					setData((prevData) => {
						return {
							...prevData,
							imagePath: `/user-pictures/${user.uid}/${file.name}`,
							imageUrl: url
						};
					});
				})
				.catch((err) => {
					setFileError(err.message);
				});
		}
	};

	const handleSelectCat = (e) => {
		const { value, name } = e.target;
		// console.log(name, value);

		if (value) {
			if (name === 'interests') {
				setShowInt(true);
				if (data.interests.find((int) => int === value)) {
					e.target.value = '';
					return;
				}
			} else if (name === 'cultures') {
				setShowCult(true);
				if (data.cultures.find((int) => int === value)) {
					e.target.value = '';
					return;
				}
			} else {
				setShowLang(true);
				if (data.languages.find((int) => int === value)) {
					e.target.value = '';
					return;
				}
			}
			setData((prevData) => {
				return {
					...prevData,
					[name]: [ ...data.[name], value ]
				};
			});

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
			case 'japanese':
				return <i className="fas fa-torii-gate" />;
			case 'art':
				return <i className="fas fa-palette" />;
			case 'american':
				return <i className="fas fa-flag-usa" />;
			case 'french':
				return <i className="fas fa-archway" />;
			case 'italian':
				return <i className="fas fa-pizza-slice" />;
			case 'english':
				return <i className="fas fa-language" />;
			case 'danish':
				return <i className="fas fa-language" />;
			case 'portuguese':
				return <i className="fas fa-language" />;
			default:
				break;
		}
	};

	const handleIntRemove = (e, i, name) => {
		e.preventDefault();
		const newInter = [ ...data.[name] ];
		newInter.splice(i, 1);
		setData((prevData) => {
			return {
				...prevData,
				[name]: newInter
			};
		});
	};

	const handleSubmit = (e) => {
		
		if(data.imagePath && data.imageUrl && data.interests.length !== 0){
			const doc = {
				cultures: data.cultures,
				interests: data.interests,
				languages: data.languages,
				picturePath: data.imagePath,
				pictureURL: url,
				publicGroups: []
			};
			addUser(doc, 'users', user.uid)
			setCurrUser(prevC => {
				return{
					...prevC,
					userImg: user.photoURL
				}
			})
			if(!isPending && error === null){
				history.push('/welcome')
			}
		}	else{
			setInputError("You need to add a picture and interests before saving")
		}

	};
	return (
		<Grid container className="Profile">
			<Grid item xs={12} align="left" className="logo-box">
				<img src={logo} alt="logo" className="logo" />
			</Grid>
			<Grid item xs={12} align="center">
				<Typography className="title" variant="h2">
					Profile
				</Typography>
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
			<Grid item xs={12} align="left">
				<Typography variant="h6" className="subtitle">
					Profile Picture
				</Typography>
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
			<Grid item xs={12} align="left">
				<Typography variant="h6" className="subtitle">
					Your main Interests
				</Typography>
			</Grid>
			<Grid item xs={12} className="category">
				{showInt ? (
					<div className="cat-box">
						{data.interests.map((int, index) => {
							return (
								<div
									className="cat-icon"
									key={int}
									onClick={(e) => handleIntRemove(e, index, 'interests')}
								>
									{categoryDisplay(int)}
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
				<div>
					<Typography variant="subtitle1" className="label-select">
						Select Interests
					</Typography>
					<FormControl variant="filled">
						<InputLabel htmlFor="filled-age-native-simple">Select</InputLabel>
						<Select
							required={true}
							native
							name="interests"
							onChange={handleSelectCat}
							inputProps={{
								name: 'interests',
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
				</div>
			</Grid>
			<Grid item xs={12} align="left">
				<Typography variant="h6" className="subtitle">
					Cultures you love
				</Typography>
			</Grid>
			<Grid item xs={12} className="category">
				{showCult ? (
					<div className="cat-box">
						{data.cultures.map((int, index) => {
							return (
								<div
									className="cat-icon"
									key={int}
									onClick={(e) => handleIntRemove(e, index, 'cultures')}
								>
									{categoryDisplay(int)}
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
				<div>
					<Typography variant="subtitle1" className="label-select">
						Select Cultures
					</Typography>
					<FormControl variant="filled">
						<InputLabel htmlFor="filled-age-native-simple">Select</InputLabel>
						<Select
							required={true}
							native
							name="cultures"
							onChange={handleSelectCat}
							inputProps={{
								name: 'cultures',
								id: 'filled-age-native-simple'
							}}
						>
							<option aria-label="None" value="" />
							<option value="japanese">Japanese</option>
							<option value="american">American</option>
							<option value="french">French</option>
							<option value="italian">Italian</option>
						</Select>
					</FormControl>
				</div>
			</Grid>
			<Grid item xs={12} align="left">
				<Typography variant="h6" className="subtitle">
					Languages you speak
				</Typography>
			</Grid>
			<Grid item xs={12} className="category">
				{showLang ? (
					<div className="cat-box">
						{data.languages.map((int, index) => {
							return (
								<div
									className="cat-icon"
									key={int}
									onClick={(e) => handleIntRemove(e, index, 'languages')}
								>
									{categoryDisplay(int)}
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
				<div>
					<Typography variant="subtitle1" className="label-select">
						Select Languages
					</Typography>
					<FormControl variant="filled">
						<InputLabel htmlFor="filled-age-native-simple">Select</InputLabel>
						<Select
							required={true}
							native
							onChange={handleSelectCat}
							name="languages"
							inputProps={{
								name: 'languages',
								id: 'filled-age-native-simple'
							}}
						>
							<option aria-label="None" value="" />
							<option value="english">English</option>
							<option value="danish">Danish</option>
							<option value="portuguese">Portuguese</option>
						</Select>
					</FormControl>
				</div>
			</Grid>

			<Grid item xs={12} align="center">
					<Collapse in={ inputError !== '' }>
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
			<Grid item xs={12} className="bttn-box">
				<Button variant="contained" onClick={handleSubmit} className="btn">
					Save
				</Button>
			</Grid>

			<Grid item xs={12}>
				<Link to={'/welcome'} className="link">
					Skip
				</Link>
			</Grid>
		</Grid>
	);
};

export default Profile;
