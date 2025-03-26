import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IoPersonSharp } from "react-icons/io5";
import { RiLockPasswordLine, RiEyeFill, RiEyeOffFill } from "react-icons/ri"; // Import eye icons
import {useNavigate} from 'react-router-dom';
import Axios from 'axios'
import '../pages/SignIn/SignIn.css'; 

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [userr, setUser] = useState({});
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate=useNavigate()
    
    Axios.defaults.withCredentails=true;
    const handleSubmit=(e)=>{
         e.preventDefault();
         Axios.post('http://localhost:3000/auth/NewSignIn',{
            email,
            password,
        }).then(response=>{
                if(response.data.status){
                  document.getElementById("signinDiv").hidden = true;
                  const userObject = response.data.user;
    // Redirect to UserHomePage
    const goToUserHome = () => {
      navigate('/UserHomePage',{ state: {user:  userObject} });
    };
    goToUserHome(userObject);
  }
    else {
        // Show alert if login failed
        alert('Incorrect email or password');
      }
            }).catch(err=>{
                console.log(err)
            })
    };


  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xll" className="sign-in-container" >
        <CssBaseline />
        <Box className="login-box">
          <Avatar className="login-avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className='form'>
            <Typography component="h1" variant="h4" sx={{ border:'black',color:'white',textAlign:'center'}}>
              Login
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputLabelProps={{
                sx: { color: 'white', fontSize: '15px'  ,'&.Mui-focused': {
                  color: 'white', // Color of the label text when focused
                }}
              }}
              InputProps={{
                endAdornment: <IoPersonSharp style={{ color: 'white', fontSize: '20px' }} />,
              }}
              sx={{
                '& .MuiInputBase-input': {
                  color: 'white', // Color of the text inside the input
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px', 
                  '& fieldset': {
                    borderColor: 'cyan', // Color of the border
                  },
                  '&:hover fieldset': {
                    borderColor: 'cyan', // Color of the border on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // Color of the border when focused
                  },
                },
                '& .MuiInputBase-root': {
                  '&:before': {
                    borderBottomColor: 'white', // Color of the bottom border
                  },
                  '& .MuiOutlinedInput-input': {
                    height: '10px', // Adjust height to reduce the overall height
                  },
                },
              }}
              onChange={(e) => setEmail(e.target.value)} // Include onChange event handler
              value={email} // Bind the value to state
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              id="password"
              autoComplete="current-password"
              autoFocus
              InputLabelProps={{
                sx: { color: 'white', fontSize: '15px'  ,'&.Mui-focused': {
                  color: 'white', // Color of the label text when focused
                }}
              }}
              InputProps={{
                endAdornment: (
                  <React.Fragment>
                    {showPassword ? (
                      <RiEyeOffFill
                        onClick={() => setShowPassword(false)}
                        style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }}
                      />
                    ) : (
                      <RiEyeFill
                        onClick={() => setShowPassword(true)}
                        style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }}
                      />
                    )}
                    
                  </React.Fragment>
                ),
              }}
              sx={{
                '& .MuiInputBase-input': {
                  color: 'white', // Color of the text inside the input
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px', 
                  '& fieldset': {
                    borderColor: 'cyan', // Color of the border
                  },
                  '&:hover fieldset': {
                    borderColor: 'cyan', // Color of the border on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // Color of the border when focused
                  },
                },
                '& .MuiInputBase-root': {
                  '&:before': {
                    borderBottomColor: 'white', // Color of the bottom border
                  },
                  '& .MuiOutlinedInput-input': {
                    height: '10px', // Adjust height to reduce the overall height
                  },
                },
              }}
              onChange={(e) => setPassword(e.target.value)} // Include onChange event handler
              value={password} 
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: 'linear-gradient(#081b29,#0ef,#081b29)',
                fontSize: '15px',
                color: 'black',
                borderRadius: '30px',
                transition: 'background 0.5s', // Add transition for smooth color change
                '&:hover': {
                  background: 'linear-gradient(#0ef,#,#0ef)', // Invert colors on hover
                },
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/Forgotten" variant="body2" sx={{ color:'white',fontSize:'15px',textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item >
                <Link href="NewSignUp" variant="body2" sx={{color:'black',color:'white',fontSize:'15px',textDecoration: 'none'}}>
                  {"Sign Up"}
                </Link> 
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <div>
      <div id="signinDiv"></div>
        {(location.pathname === "/UserHomePage" || Object.keys(userr).length !== 0) && (
          <div>
            <img src={userr?.picture} alt="User" />
            <h2>{userr?.name}</h2>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default SignIn;
