import React from 'react'
import '../Reset-Password/ForgotPassword.css';
import Axios from 'axios'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { token } = useParams()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3000/auth/reset-password/' + token, {
            password,
        }).then(response => {
            if (response.data.status) {
                navigate('/NewSignIn')
            }
            console.log(response.data)
        }).catch(err => {
            console.log(err)
        })
    };
    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <h2 className='forgot1'>Reset Password</h2>

                <div>
    <label htmlFor="username" className='forgot1'>New Password:</label>
    <div style={{ position: 'relative' }}>
      <input
        type={passwordVisible ? 'text' : 'password'}
        placeholder='******'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='custom-input'
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          marginRight:'100px',
        }}
        onClick={() => setPasswordVisible(!passwordVisible)}
      >
        {passwordVisible ? '👁️' : '👁️'}
      </div>
      <button type='submit' className='Send1'>Reset</button>
    </div>
  </div>
                
            </form>
        </div>
    )
}

export default ResetPassword