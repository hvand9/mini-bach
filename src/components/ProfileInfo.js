import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-grey-mobile-side.png';
import { Grid, Typography, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { projectAuth} from '../firebase/config'
/*import useLogout from '../composables/useLogout'*/
import './profileinfo.css'; 
import Nav from './Nav'; 





const ProfileInfo = () => {
    const [ error, setError ] = useState(null);
	const history = useHistory()



	const handlesubmit = async() => {
	

            setError(null); 

            try { 
                const res = await projectAuth.signOut(); 
                console.log(res); 
                return res

                
            } catch (err) {
                 console.log(err.message); 
                 setError(err.message);
            }
         

            

  /*history.push("/login");*/
}	
    
   
    return (
        
		<Grid container className="ProfileInfo">
			<Grid item xs={12} className="header" align="left">
				<img src={logo} alt="logo" />
			</Grid>
            <Grid item xs={12} className="bttn-box">
                <Button variant="contained" onClick={handlesubmit}>
                Log in
                </Button>
            </Grid>
            <Nav current={'profile'}></Nav> 
        </Grid>

  
    

        
        


    


    
    )
    
};



export default ProfileInfo;
