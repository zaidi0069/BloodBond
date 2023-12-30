import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import donateimg from '../assets/donate.png'
import { useTypewriter } from 'react-simple-typewriter'
import history from '../assets/history.png'
import requestpic from '../assets/request.jpg'
import './Donor.css'
import { useNavigate } from "react-router-dom";
import BloodRequests from './BloodRequests';
const Organization = () => {

  
  const navigate = useNavigate();

  const [validstatus, setvalidstatus] = useState('false')
  const [organization, setorganization] = useState('')
  // Use the useLocation hook to get the location object
  const location = useLocation();

  // Access the state object, which contains the id
  const organization_Id = location.state.id;

  const authToken = localStorage.getItem(`authToken_${organization_Id}`);


  // console.log(authToken)

  fetch('http://localhost:3001/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `${authToken}`
    },


  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    else return res.json();
  }).then((data) => {
    setvalidstatus('true')
    setorganization(data)
  })


  function gotoinventory()
  {
    navigate('/orginventory', { state: { id: organization_Id, orgname: organization } });
  }



  function gotodonorslist()
  {
    console.log('clicked')
    navigate('/orgdonors', { state: { id: organization_Id, orgname: organization } });
  }


  function getrequests()
  {
    navigate('/bloodrequests', { state: { id: organization_Id, orgname: organization }} );
  }

  if (validstatus === 'true') {
    return (

      <>
        <Navbar />
        <div className="page">
          <div className="text">
            <br />
            <h2>Hello {organization}, Welcome to Blood Bond</h2>
            <br />
         
          </div>

          <div className="cards">
         
              <div class="card card1" onClick={gotoinventory}>
                <img src={donateimg} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Inventory</h5>
                  <p class="card-text">See Inventory</p>
                </div>
              </div>
         

            
              <div class="card card1" onClick={gotodonorslist}>
                <img src={history} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Donors List</h5>
                  <p class="card-text">See your donors</p>
                </div>
              </div>


              <div class="card card1" onClick={getrequests}>
                <img src={requestpic} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Blood Requests</h5>
                  <p class="card-text">See blood request from associated organizations</p>
                </div>
              </div>
         
          </div>
        </div>
      </>
    )
  }

  else {
    return (
      <>
        <p>You are not logged in as an organization.</p>
      </>
    )
  }


}

export default Organization
