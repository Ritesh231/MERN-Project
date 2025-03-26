
import React from 'react';
import '../pages/Reset-Password/ForgotPassword.css';
import Axios from 'axios';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'; 
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
         e.preventDefault()
         Axios.post('http://localhost:3000/auth/forgot-password',{
            email,
            }).then(response=>{
                if(response.data.status){
                    alert("check your email for reset password")
                    navigate('/NewSignIn')
                }
            }).catch(err=>{
                console.log(err)
            })
    };
  return (
    <div className='sign-up-container'>
    <form className='sign-up-form' onSubmit={handleSubmit}>
    <h2 className='forgot1'>Forgot Password</h2>

        <label htmlFor="username" className='forgot1'>Email:</label>
        <input type="text" autoComplete='off' placeholder='Email'
            onChange={(e) => setEmail(e.target.value)} 
            className='custom-input'
            />
            

        <button type='submit' className='Send1'>Send</button>
    </form>
</div>
  )
}

export default ForgotPassword;