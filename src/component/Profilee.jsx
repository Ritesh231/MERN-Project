import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/Profile/Profile.css';
import Proff from '../../src/assets/pc1.jpg';
import { purple } from '@mui/material/colors';

const Profilee = () => {
  const [isEditMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(Proff);
  const [userData, setUserData] = useState({
    userId: '',
    name: '',
    organizationName: '',
    emailAddress: '',
    paymentAmount: 0,
    profileImage: '',
  });

  useEffect(() => {
    fetchData(); // Fetch user data when the component mounts
  }, []); // Empty dependency array ensures it runs only once

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/');
      const userDataFromServer = response.data.data[0]; // Assuming you're fetching a single user
      setUserData(userDataFromServer);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = async () => {
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:3001/update/${userData.userId}`, userData);
        // If the update is successful, you might want to refetch the data to ensure it's up to date
        fetchData();
      }

      setEditMode(!isEditMode);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="container-md emp-profile" style={{  border: '1px solid #ccc', 
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      paddingBottom: '50px',
      marginTop: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      position: 'relative', /* Add position relative */
      minHeight: '500px', /* Set minimum height */ }}>
        <div className="row">
          <div className="col-md-12">
            <Link to="/UserHomePage/NewPrice/Payment3" className="btn btn-primary" style={{  position: 'absolute', top: '10px', right: '10px'  }}>
              Dashboard
            </Link>
          </div>
        </div>
        <div className="row">
          {/* Left column for Profile Image and Subscription Details */}
          <div className="col-md-3" style={{ marginTop: '90px',marginLeft:'50px' }}>
            <div className='profile-img' >
              <img src={profileImage} alt="Profile-image" className="profile-image img-fluid" />
              {isEditMode && (
                <div>
                  <label htmlFor="imageInput">Change Image</label>
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              )}
            </div>
            <div className='profile-work mt-4'>
              <h2>Subscription Details</h2>
              <p>Subscription Buy Date: 24-01-24</p>
              <p>Subscription Expiry Date: 24-02-24</p>
              <p>Subscription Renewal:</p>
            </div>
          </div>
          {/* Right column for User information form */}
          <div className="col-md-6">
            <div className='edit-profile'>
              <div className="row">
                <div className="col-md-3">
                  <div className="profile-head">
                    <h2 className="font-weight-bold" style={{ fontSize: '35px' }}>{userData.name}</h2>
                    <h6>{userData.organizationName}</h6>
                    <p className="profile-rating mt-3 mb-5"></p>
                    <ul className="nav" role="tablist">
                      <li className="nav-item" style={{ marginTop: '30px', fontSize: '30px' ,color:'purple'}}>
                        <h2>Profile</h2>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='row mt-4'>
                <div className="col-md-12">
                  <div className='tab-content profile-tab' id="myTabContent">
                    <div className='tab-pane fade show active' id="home" role="tabpanel" aria-labelledby="home-tab">
                      <table className="table" style={{ backgroundColor: '#f8f9fa' }}>
                        <tbody>
                          <tr>
                            <td className="font-weight-bold" style={{ fontSize: '15px' }}>User ID</td>
                            <td style={{ fontSize: '12px' }}>{isEditMode ? <input type="text" defaultValue="123445686896" /> : '123445686896'}</td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold" style={{ fontSize: '15px' }}>Name</td>
                            <td style={{ fontSize: '12px' }}>{isEditMode ? <input type="text" defaultValue="John Doe" /> : 'John Doe'}</td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold" style={{ fontSize: '15px' }}>Organization Name</td>
                            <td style={{ fontSize: '12px' }}>{isEditMode ? <input type="text" defaultValue="OneWorld Society" /> : 'OneWorld Society'}</td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold" style={{ fontSize: '15px' }}>Email Address</td>
                            <td style={{ fontSize: '12px' }}>{isEditMode ? <input type="text" defaultValue="JohnDoe@gmail.com" /> : 'JohnDoe@gmail.com'}</td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold" style={{ fontSize: '15px' }}>Payment Amount</td>
                            <td style={{ fontSize: '12px' }}>{isEditMode ? <input type="text" defaultValue="20$" /> : '20$'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col-md-12'>
                  <button type="button" className='profile-edit-btn' name="btnAddMore" onClick={handleEditClick}>
                    {isEditMode ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profilee;
