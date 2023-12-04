import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import donateimg from '../assets/donate.png'
import { useTypewriter } from 'react-simple-typewriter'
import history from '../assets/history.png'
import './Donor.css'

const Organization = () => {


  const [validstatus, setvalidstatus] = useState('false')
  const [donor, setdonor] = useState('')
  // Use the useLocation hook to get the location object
  const location = useLocation();

  // Access the state object, which contains the id
  const donor_Id = location.state.id;

  const authToken = localStorage.getItem(`authToken_${donor_Id}`);


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
    console.log(data)
    setvalidstatus('true')
    setdonor(data)
  })


  if (validstatus === 'true') {
    return (

      <>
        <Navbar />
        <div className="page">
          <div className="text">
            <br />
            <h2>Hello {donor}, Welcome to Blood Bond</h2>
            <br />
         
          </div>

          <div className="cards">
            <a href="">
              <div class="card card1">
                <img src={donateimg} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Donate Blood</h5>
                  <p class="card-text">Your Blood can save someone's life. Donate Life, Donate Blood</p>
                </div>
              </div>
            </a>

            <a href="">
              <div class="card">
                <img src={history} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Donation History</h5>
                  <p class="card-text">See how many lives have you donated</p>
                </div>
              </div>
            </a>
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
