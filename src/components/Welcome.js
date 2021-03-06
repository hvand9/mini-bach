import React, { useEffect, useContext } from 'react';
import logo from '../assets/logo-grey-mobile-side.png';
import family from '../assets/family-group-500.png';
import { Grid, Typography, CircularProgress, Button } from '@material-ui/core';
import useFetch from '../composables/useFetch';
import { useHistory, Link } from 'react-router-dom';
import './welcome.css';
import Nav from './Nav';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../node_modules/swiper/swiper-bundle.css';
import SwiperCore, { Navigation } from 'swiper/core';
import { UserContext } from '../composables/UserContext';
SwiperCore.use([ Navigation ]);

const Welcome = () => {
	const { data, isPending, error } = useFetch('cafes');
	const [ currUser ] = useContext(UserContext);
	const history = useHistory();

	const checkUser = () => {
		if (!localStorage.getItem('id')) {
			history.push('/');
		}
	};
	useEffect(() => {
		const cleanup = checkUser();
		return () => cleanup;
	});

	return (
		<Grid container className="welcome">
			<Grid item xs={12} className="logo-header">
				<img src={logo} alt="logo" />
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h1">
					Welcome, <br />
					<span>{currUser.username}</span>!
				</Typography>
			</Grid>
			<Grid item xs={12} className="slider">
				<Typography variant="subtitle1">Private Cafés</Typography>
				<Swiper spaceBetween={50} slidesPerView={1} navigation={true} className="mySwiper">
					<SwiperSlide>
						<Button
							to={`/welcome`}
							className="slide-link private-groups btn"
							component={Link}
						>
							<div className="circle">
								<img src={family} alt="slide" />
							</div>

							<p>Family</p>
						</Button>
					</SwiperSlide>
				</Swiper>
			</Grid>
			<Grid item xs={12} className="slider">
				<Typography variant="subtitle1">Public Cafés</Typography>
				{error && <div>{error}</div>}
				{isPending && <CircularProgress />}
				{data && (
					<Swiper
						spaceBetween={50}
						slidesPerView={1}
						navigation={true}
						className="mySwiper"
					>
						{data.map((cafe) => {
							return (
								<SwiperSlide key={cafe.id}>
									<Button
										to={`/cafe-details/${cafe.id}`}
										className="slide-link btn"
										component={Link}
									>
										<div className="circle">
											<img src={cafe.imageURL} alt={cafe.name} />
										</div>

										<p>{cafe.name}</p>
									</Button>
								</SwiperSlide>
							);
						})}
					</Swiper>
				)}
			</Grid>
			<Nav />
		</Grid>
	);
};

export default Welcome;
