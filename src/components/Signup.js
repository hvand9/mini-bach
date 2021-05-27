import React,{useState} from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import logo from '../assets/logo-brown-mobile.png';
import { Link, useHistory  } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import useSignup from '../composables/useSignup'
import './signup.css'; 

const Signup = () => {  
	const {error, signup} = useSignup() 
	const [displayName, setDisplayName] = useState('') 
	const [email, setEmail] = useState('') 
	const [password, setPassword] = useState('') 
	const [rpassword, setRpassword] = useState('')
	const history = useHistory()

	const handlesubmit = async() => {
		if (displayName && email && password){
			await signup(email, password, displayName)

			if(!error){
				history.push('/welcome');
			}
		}
	} 

	return ( <Grid container xs={12} className="Sign">
	<Grid item xs={12}>
		<img src={logo} alt="logo" className="logo" />
		<Typography className="title"variant="h2">Sign up</Typography>
	</Grid>
	<Grid item xs={12} className="icons-sign">
		<div class = "facebook">
		<i class="fab fa-facebook-f"></i>
		</div>

		<div class = "google">
		<i class="fab fa-google"></i>
		</div>
	</Grid>	
<Grid item xs={12} className="Input">
  <TextField type="text" className="filled-basic" label="Username" variant="outlined" onChange={(e)=> setDisplayName(e.target.value)} />
  </Grid>
  <Grid item xs={12} className="Input">
  <TextField error={true} helperText="add a correct email"  type="email" ClassName="filled-basic" label="Email" variant="outlined" onChange={(e)=> setEmail(e.target.value)} />
  </Grid>
  <Grid item xs={12} className="Input">
  <TextField type="password" ClassName="filled-basic" label="Password" variant="outlined" onChange={(e)=> setPassword(e.target.value)} />
  </Grid>
  <Grid item xs={12} className="Input">
  <TextField type="password"  ClassName="filled-basic" label="Repeat Password" variant="outlined" onChange={(e)=> setRpassword(e.target.value)} />
  </Grid>
	
		
	
		<Grid item xs={12} className="bttn-box">
		<Button variant="contained" to={'/sign'} component={Link} onClick={handlesubmit}>
			Sign up
		</Button>
	</Grid>
	
</Grid>

		
		
	);
};

export default Signup;
