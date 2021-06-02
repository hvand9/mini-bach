import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import './editable.css';

const EditTable = (props) => {
	return (
		<Grid item xs={12} className="edit">
			<Typography variant="h6">Edit Table</Typography>
			<div>
				<div>
					<Button>
						<Typography>Password</Typography>
						<i className="fas fa-chevron-right" />
					</Button>
				</div>
				<hr />
			</div>
			<div>
				<div>
					<Button>
						<Typography>Color & Background</Typography>
						<i className="fas fa-chevron-right" />
					</Button>
				</div>
				<hr />
			</div>
			<div>
				<Button>
					<Typography>Table Name</Typography>
					<i className="fas fa-chevron-right" />
				</Button>

				<hr />
			</div>
			<div>
				<Button>
					<Typography>Artist</Typography>
					<i className="fas fa-chevron-right" />
				</Button>

				<hr />
			</div>
			<div>
				<Button>
					<Typography>Voice & Video & Chat</Typography>
					<i className="fas fa-chevron-right" />
				</Button>
				<hr />
			</div>
			<div>
				<div>
					<Button>
						<Typography>Support</Typography>
						<i className="fas fa-chevron-right" />
					</Button>
				</div>
				<hr />
			</div>
			<Button className="back-arrow" onClick={() => props.clickNav('voice')}>
				<i className="fas fa-chevron-left" />
			</Button>
		</Grid>
	);
};

export default EditTable;
