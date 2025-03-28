import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './subscriptionPage.css';
import axios from 'axios';
import phonepe from '../../assets/id8Yth9ASQ.svg';

const SubscriptionPage = () => {

  const [loading2, setLoading2] = useState(false);
  const location = useLocation();
  const user = location.state.user;
  const subscriptionAmount = location.state.subscriptionAmount
   
  const data = {
    name: user.name || 'amar', // Set a default name if user.name is undefined
    amount: subscriptionAmount || 0,
    number: '7743968900',
    MUID: "MUID" + Date.now(),
    transactionId: 'T' + Date.now(),
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading2(true);
    axios.post('api/payment', { ...data })
      .then(res => {
        setTimeout(() => {
          setLoading2(false);
        }, 1500);
      })
      .catch(error => {
        setLoading2(false);
        console.error(error);
      });
  };

  return (
    <>
      <div className='main'>
        <div className='center'>
          <img width={300} src={phonepe} alt="" />
          <h2 className='fs-4 mt-2'><span className='text-danger fw-bold'>LIVE</span> Payment Integration</h2>
        </div>
        <div className='card px-5 py-4 mt-5'>
          <form onSubmit={handlePayment}>
            <div className='col-12 '>
              <p className='fs-5'><strong>Name:</strong> {data.name}</p>
            </div>
            <div className='col-12 '>
              <p className='fs-5'><strong>Number:</strong> {data.number}</p>
            </div>
            <div className='col-12 '>
              <p className='fs-5'><strong>Amount:</strong> {data.amount}</p>
            </div>
            {!loading2 ? (
              <div className='col-12 center'>
                <button className='w-100 ' type="submit">Pay Now</button>
              </div>
            ) : (
              <div className='col-12 center'>
                <button className='w-100 text-center' type="submit">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Wait...</span>
                  </div>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;


