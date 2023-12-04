import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar';
import donateimg from '../assets/donate.png'
import { useTypewriter } from 'react-simple-typewriter'
import history from '../assets/history.png'
import { Link } from 'react-router-dom'
import './Donor.css'


const Donor = () => {
  const navigate = useNavigate();

 

  const [trt] = useTypewriter({

    words: ['Every drop you donate is a beacon of hope. You are the unsung hero who, with a simple act, can save lives and bring smiles. Be a lifesaver, be a hero—donate blood.'

    ],
    // loop: {},

    typeSpeed: 100,



  });

  const [validstatus, setvalidstatus] = useState('false')
  const [donor, setdonor] = useState('')
  // Use the useLocation hook to get the location object
  const location = useLocation();
  let donor_Id
  // Access the state object, which contains the id
  try {
    donor_Id = location.state.id || '';
  }
  catch {
    donor_Id = '';
  }

  const navigatetodonatescreen = () => {
    console.log('called')
    navigate('/donate', { state: { id: donor_Id } });
  };


  const navigatetohistoryscreen = () => {
    console.log('history called')
    navigate('/history', { state: { id: donor_Id } });
  };

  const authToken = localStorage.getItem(`authToken_${donor_Id}`);


  // console.log(authToken)
  useEffect(() => {

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


  }, [validstatus])


  if (validstatus === 'true') {
    return (

      <>
        <Navbar />
        <div className="page">
          <div className="text">
            <br />
            <h2>Hello {donor}, Welcome to Blood Bond</h2>
            <br />
            <p>{trt}</p>
          </div>

          <div className="cards" >
             
              <div class="card card1" onClick={navigatetodonatescreen }>
              <img src={donateimg} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Donate Blood</h5>
                <p class="card-text">Your Blood can save someone's life. Donate Life, Donate Blood</p>
              </div>
            </div>
          

          <div className="cards" >
            <div class="card card2" onClick={navigatetohistoryscreen }>
              <img src={history} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Donation History</h5>
                <p class="card-text">See how many lives have you donated</p>
              </div>
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
      <p>You are not logged in as a donor.</p>
    </>
  )
}



}




export default Donor
