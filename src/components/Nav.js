import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import './nav.css';
import { Link } from 'react-router-dom';

const Nav = (props) => {
	return (
		<Grid className="Nav" item xs={12}>
			<nav>
				<Link to={'/public-cafe'} className="nav-link btn">
					<svg version="1.1" className="icons" x="0px" y="0px" viewBox="0 0 40 31">
						<path
							className={props.current === 'public' ? 'current' : 'iconColor'}
							d="M21,21c0-5.5,4.3-10,9.5-10c2.6,0,5,1.1,6.7,2.9c0.1-2.3-0.4-4.4-1.3-5.9c-3.8-6.1-8.5-6.5-17-7.5s-15.5,2-18,8
          c-2,4.8-0.5,10,3,13l5,2.5v7l4-6c2.3-0.1,5.7,0.2,9,0.3C21.3,24,21,22.5,21,21z"
						/>
						<g>
							<g>
								<path
									className={props.current === 'public' ? 'current' : 'iconColor'}
									d="M30.3,13.3c-4.1,0-7.3,3.5-7.3,7.8s3.3,7.8,7.3,7.8c4.1,0,7.3-3.5,7.3-7.8S34.4,13.3,30.3,13.3z M36.2,21
              c0,0.7-0.1,1.4-0.3,2h-0.6c-0.1,0-0.2-0.1-0.3-0.2l-0.9-1c-0.1-0.1-0.1-0.4,0-0.5l0.4-0.4v-0.3c0-0.1,0-0.2-0.1-0.3L34,20.1
              C34,20.1,33.9,20,33.8,20h-0.5c-0.2,0-0.3-0.2-0.3-0.4c0-0.1,0-0.2,0.1-0.3l0.3-0.3c0.1-0.1,0.1-0.1,0.2-0.1h0.9
              c0.2,0,0.3-0.2,0.3-0.4v-0.3c0-0.2-0.2-0.4-0.3-0.4h-1.1c-0.3,0-0.5,0.2-0.5,0.5v0.1c0,0.2-0.1,0.4-0.3,0.5l-0.9,0.3
              c-0.1,0-0.2,0.1-0.2,0.2v0.1c0,0.1-0.1,0.3-0.2,0.3h-0.5c-0.1,0-0.2-0.1-0.2-0.3c0-0.1-0.1-0.3-0.2-0.3h-0.1
              c-0.1,0-0.2,0.1-0.2,0.1l-0.3,0.6c-0.1,0.2-0.2,0.3-0.4,0.3h-0.7c-0.3,0-0.5-0.2-0.5-0.5v-0.8c0-0.1,0.1-0.3,0.1-0.4l0.6-0.6
              c0.1-0.1,0.2-0.3,0.2-0.5c0-0.1,0.1-0.2,0.2-0.2l1.2-0.4c0.1,0,0.1,0,0.1-0.1l0.8-0.8c0.1-0.1,0.1-0.2,0.1-0.3
              c0-0.2-0.2-0.4-0.3-0.4h-0.6L30.2,16v0.3c0,0.1-0.1,0.3-0.2,0.3h-0.5c-0.1,0-0.2-0.1-0.2-0.3v-0.6c0-0.1,0-0.2,0.1-0.2l0.9-0.7
              c0.1,0,0.1,0,0.2,0C33.6,14.8,36.2,17.6,36.2,21z M26.8,17.7c0-0.1,0-0.2,0.1-0.3l0.8-0.8c0.1-0.1,0.1-0.1,0.2-0.1
              c0.2,0,0.3,0.2,0.3,0.4v0.5c0,0.1,0,0.2-0.1,0.3l-0.3,0.3C27.8,18,27.7,18,27.7,18h-0.5C27,18,26.8,17.9,26.8,17.7z M30.6,27.2V27
              c0-0.3-0.2-0.5-0.5-0.5h-0.6c-0.3,0-0.8-0.2-1-0.4l-0.7-0.5c-0.3-0.3-0.5-0.7-0.5-1.1v-0.7c0-0.5,0.2-1,0.7-1.2l1.3-0.8
              c0.2-0.1,0.4-0.2,0.7-0.2h0.9c0.3,0,0.6,0.1,0.9,0.3L33,23h0.5c0.3,0,0.5,0.1,0.7,0.3l0.5,0.5C34.8,24,35,24,35.1,24h0.4
              C34.5,25.9,32.7,27.1,30.6,27.2z"
								/>
							</g>
						</g>
					</svg>
					<Typography className={props.current === 'public' ? 'current' : ''}>
						Public
					</Typography>
				</Link>
				<Link to={'/welcome'} className="nav-link btn">
					<svg version="1.1" className="icons" x="0px" y="0px" viewBox="0 0 38 31">
						<path
							className={props.current === 'private' ? 'current' : 'iconColor'}
							d="M20,22.6c0-0.9,1-2.1,2-2.1h0.5v-2c0-2.9,2.8-5.5,6-5.5s6,2.6,6,5.5l0.1,2.4h0.6c0,0,0,0,0.1,0
	c2.5-4,2.7-9.9,0.8-12.9c-3.8-6.1-8.5-6.5-17-7.5s-15.5,2-18,8c-2,4.8-0.5,10,3,13L9,24v7l4-6c1.9-0.1,4.4,0.1,7,0.2V22.6z"
						/>
						<path
							className={props.current === 'private' ? 'current' : 'iconColor'}
							d="M34.4,21.4h-0.8V19c0-2.8-2.3-5-5.1-5s-5.1,2.3-5.1,5v2.4h-0.8c-0.9,0-1.6,0.7-1.6,1.6v6.4
	c0,0.9,0.7,1.6,1.6,1.6h11.8c0.9,0,1.6-0.7,1.6-1.6V23C36,22.2,35.3,21.4,34.4,21.4z M30.9,21.4h-4.8V19c0-1.3,1.1-2.4,2.4-2.4
	s2.4,1.1,2.4,2.4V21.4z"
						/>
					</svg>
					<Typography className={props.current === 'private' ? 'current' : ''}>
						Private
					</Typography>
				</Link>
				<Link to={'/welcome'} className="nav-link btn">
					<svg
						className="icons"
						width="22"
						height="24"
						viewBox="0 0 22 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							className={props.current === 'events' ? 'current' : 'iconColor'}
							d="M0.589286 9H21.4107C21.7348 9 22 9.25313 22 9.5625V21.75C22 22.9922 20.9442 24 19.6429 24H2.35714C1.0558 24 0 22.9922 0 21.75V9.5625C0 9.25313 0.265179 9 0.589286 9ZM22 6.9375V5.25C22 4.00781 20.9442 3 19.6429 3H17.2857V0.5625C17.2857 0.253125 17.0205 0 16.6964 0H14.7321C14.408 0 14.1429 0.253125 14.1429 0.5625V3H7.85714V0.5625C7.85714 0.253125 7.59196 0 7.26786 0H5.30357C4.97946 0 4.71429 0.253125 4.71429 0.5625V3H2.35714C1.0558 3 0 4.00781 0 5.25V6.9375C0 7.24687 0.265179 7.5 0.589286 7.5H21.4107C21.7348 7.5 22 7.24687 22 6.9375Z"
						/>
					</svg>
					<Typography className={props.current === 'events' ? 'current' : ''}>
						Events
					</Typography>
				</Link>
				<Link to={'/profile-info'} className="nav-link btn">
					<svg
						className="icons"
						width="22"
						height="24"
						viewBox="0 0 22 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							className={props.current === 'profile' ? 'current' : 'iconColor'}
							d="M11 12C14.4719 12 17.2857 9.31406 17.2857 6C17.2857 2.68594 14.4719 0 11 0C7.52812 0 4.71429 2.68594 4.71429 6C4.71429 9.31406 7.52812 12 11 12ZM15.4 13.5H14.5799C13.4897 13.9781 12.2768 14.25 11 14.25C9.72321 14.25 8.51518 13.9781 7.42009 13.5H6.6C2.95625 13.5 0 16.3219 0 19.8V21.75C0 22.9922 1.0558 24 2.35714 24H19.6429C20.9442 24 22 22.9922 22 21.75V19.8C22 16.3219 19.0437 13.5 15.4 13.5Z"
						/>
					</svg>

					<Typography className={props.current === 'profile' ? 'current' : ''}>
						Profile
					</Typography>
				</Link>
			</nav>
		</Grid>
	);
};

export default Nav;
