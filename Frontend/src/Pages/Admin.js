import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar';
import donateimg from '../assets/donate.png'
import { useTypewriter } from 'react-simple-typewriter'
import history from '../assets/history.png'
import { Link } from 'react-router-dom'
import './Donor.css'


const Admin = () => {
  const navigate = useNavigate();

  const [validstatus, setvalidstatus] = useState('false')
  const [admin, setadmin] = useState('')

  const location = useLocation();
  let admin_Id
  try {
    admin_Id = location.state.id || '';
  }
  catch {
    admin_Id = '';
  }

  const navigatetodonatescreen = () => {
    navigate('/donate', { state: { id: admin_Id } });
  };


  const navigatetohistoryscreen = () => {
    console.log('history called')
    navigate('/history', { state: { id: admin_Id } });
  };

  const authToken = localStorage.getItem(`authToken_${admin_Id}`);


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
      setvalidstatus('true')
      setadmin(data)
    })


  }, [validstatus])


  if (validstatus === 'true') {
    return (

      <>
        <Navbar />
        <div className="page">
          <div className="text">
            <br />
            <h2>Hello {admin}, Welcome to Blood Bond</h2>
            <br />
       
          </div>

          <div className="cards" >
             
              <div class="card card1" onClick={navigatetodonatescreen}>
              <img src={donateimg} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Donate Blood</h5>
                <p class="card-text">Your Blood can save someone's life. Donate Life, Donate Blood</p>
              </div>
            </div>
          

          
            <div class="card card2" onClick={navigatetohistoryscreen}>
              <img src={history} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Donation History</h5>
                <p class="card-text">See how many lives have you donated</p>
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
      <p>You are not logged in as an admin.</p>
    </>
  )
}



}

export default Admin
