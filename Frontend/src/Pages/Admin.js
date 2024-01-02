import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar';
import requestimg from '../assets/request.jpg'
import history from '../assets/history.png'
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

  const navigatetorequestsscreen = () => {
    navigate('/allbloodrequests', { state: { id: admin_Id } });
  };


  const navigatetohistoryscreen = () => {
    console.log('history called')
    navigate('/alltransactions', { state: { id: admin_Id } });
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
             
              <div class="card card1" onClick={navigatetorequestsscreen}>
              <img src={requestimg} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">All Blood Requests</h5>
                <p class="card-text">See all blood requests ever made</p>
              </div>
            </div>
          

          
            <div class="card card2" onClick={navigatetohistoryscreen}>
              <img src={history} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Blood Transactions</h5>
                <p class="card-text">See all blood transactions ever made</p>
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
