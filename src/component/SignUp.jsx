import * as React from 'react';
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
import SignUpGoogle from './SignUpGoogle';
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import img1 from '../assets/Logo2.png';
import {  RiEyeFill, RiEyeOffFill } from "react-icons/ri"; // Import eye icons
import {useNavigate} from 'react-router-dom';
import Axios from 'axios'
import '../pages/UserHomePage/Signup/Signup.css';

const defaultTheme = createTheme();

export default function SignUp() {
  const [showGoogleSignUp, setShowGoogleSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate=useNavigate()

  const handleSubmit=(e)=>{
       e.preventDefault()
       Axios.post('http://localhost:3000/auth/NewSignUp',{
          username,
          email,
          password}).then(response=>{
              if(response.data.status){
                  navigate('/NewSignIn')
              }
          }).catch(err=>{
              console.log(err)
          })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="" className='background'>
        <Box
          sx={{
            paddingTop: '50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Typography component="h1" variant="h4" sx={{ color: 'white', textAlign: 'center', mb: 2, '@media screen and (min-width: 768px) and (max-width: 1024px)': {
                  fontSize:'80px',
                  marginTop:"100px"
                  }, }}>
                SignUp
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                className='form'
                sx={{
                  backgroundColor: "rgba(0, 3, 8, 0.649)",
                  borderRadius: '10px',
                  // Increase vertical padding to increase height
                  width: '80%', // Reduce width
                  maxWidth: '400px', // Limit maximum width
                  margin: '0 auto',
                  height:'440px',
                  '@media screen and (min-width: 768px) and (max-width: 1024px)': {
                    width: '140%', // Change width to 10% for the specified screen size range
                    marginTop:'200px',
                  },
                  '@media screen and (min-width: 330px) and (max-width: 767px)': {
                    width: '100%',
                    height:'491px', 
                  }
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      autoComplete="given-name"
                      autoFocus
                      InputLabelProps={{
                        sx: { color: 'white', fontSize: '15px'  ,'&.Mui-focused': {
                          color: 'white', // Color of the label text when focused
                        }}
                      }}
                      sx={{
                        '& .MuiInputBase-input': {
                          color: 'cyan', // Color of the text inside the input
                        },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '30px',
                          marginTop:'5px',
                          '& fieldset': {
                            borderColor: 'cyan', // Color of the border
                          },
                          '&:hover fieldset': {
                            borderColor: 'cyan', // Color of the border on hover
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'cyan', // Color of the border when focused
                          },
                        },
                        '& .MuiInputBase-root': {
                          '&:before': {
                            borderBottomColor: 'cyan', // Color of the bottom border
                          },
                          '& .MuiOutlinedInput-input': {
                            height: '10px', // Adjust height to reduce the overall height
                          },
                        },
                      }}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      autoFocus
                      InputLabelProps={{
                        sx: { color: 'white', fontSize: '15px'  ,'&.Mui-focused': {
                          color: 'white', // Color of the label text when focused
                        }}
                      }}
                      sx={{
                        '& .MuiInputBase-input': {
                          color: 'cyan', // Color of the text inside the input
                        },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '30px',
                          marginTop:'5px',
                          '& fieldset': {
                            borderColor: 'cyan', // Color of the border
                          },
                          '&:hover fieldset': {
                            borderColor: 'cyan', // Color of the border on hover
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'cyan', // Color of the border when focused
                          },
                        },
                        '& .MuiInputBase-root': {
                          '&:before': {
                            borderBottomColor: 'cyan', // Color of the bottom border
                          },
                          '& .MuiOutlinedInput-input': {
                            height: '10px', // Adjust height to reduce the overall height
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
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
                      sx={{
                        '& .MuiInputBase-input': {
                          color: 'cyan', // Color of the text inside the input
                        },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '30px',
                          marginTop:'5px',
                          '& fieldset': {
                            borderColor: 'cyan', // Color of the border
                          },
                          '&:hover fieldset': {
                            borderColor: 'cyan', // Color of the border on hover
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'cyan', // Color of the border when focused
                          },
                        },
                        '& .MuiInputBase-root': {
                          '&:before': {
                            borderBottomColor: 'cyan', // Color of the bottom border
                          },
                          '& .MuiOutlinedInput-input': {
                            height: '10px', // Adjust height to reduce the overall height
                          },
                        },
                      }}
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      autoComplete="new-password"
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
                          color: 'cyan', // Color of the text inside the input
                        },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '30px',
                          marginTop:'5px',
                          '& fieldset': {
                            borderColor: 'cyan', // Color of the border
                          },
                          '&:hover fieldset': {
                            borderColor: 'cyan', // Color of the border on hover
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'cyan', // Color of the border when focused
                          },
                        },
                        '& .MuiInputBase-root': {
                          '&:before': {
                            borderBottomColor: 'cyan', // Color of the bottom border
                          },
                          '& .MuiOutlinedInput-input': {
                            height: '10px', // Adjust height to reduce the overall height
                          },
                        },
                      }}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary"  sx={{ color: 'white',marginLeft:'20px' }}/>}
                      label="I want to receive updates via email."
                      sx={{ color: 'white' }}
                    />
                  </Grid>
                </Grid>
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
                    transition: 'background 0.5s',
                    '&:hover': {
                      background: 'linear-gradient(#0ef,#,#0ef)',
                    },
                  }}
                >
                  Become a Member
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item xs>
                    <Button variant="body2" onClick={() => setShowGoogleSignUp(true)}>
                      <FcGoogle style={{ width: '30px', height: '30px' }} />
                    </Button>
                  </Grid>
                  {showGoogleSignUp && <SignUpGoogle onClose={() => setShowGoogleSignUp(false)} />}
                  <Grid item>
                    <Link href="NewSignIn" variant="body2" sx={{ color: 'white', fontSize: '15px' }}>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
