import React,{useState} from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import logo from '../assets/logo-brown-mobile.png';
import { Link, useHistory  } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import useLogin from '../composables/useLogin'
import './login.css'; 

const Login = () => {  
	const {error, login} = useLogin() 
	const [email, setEmail] = useState('') 
	const [password, setPassword] = useState('') 
	const history = useHistory()

	const handlesubmit = async() => {
		if (email && password){
			await login(email, password)

			if(!error){
				history.push('/welcome');
			}
		}
	} 



	return ( <Grid container xs={12} className="Sign">
	<Grid item xs={12}>
		<img src={logo} alt="logo" className="logo" />
		<Typography className="title">Log in</Typography>
	
		
<Grid item xs={12} className="Input">
<TextField error={true} helperText="add a correct email"  type="email" ClassName="filled-basic" label="Email" variant="outlined" onChange={(e)=> setEmail(e.target.value)} />
<TextField type="password" ClassName="filled-basic" label="Password" variant="outlined" onChange={(e)=> setPassword(e.target.value)} />
  
  </Grid>
		

  </Grid>
	
		
	
		<Grid item xs={12} className="bttn-box">
		<Button variant="contained" to={'/sign'} component={Link} onClick={handlesubmit}>
			Log in
		</Button>
	</Grid>
	
</Grid>

		
		
	);
};

export default Login;
