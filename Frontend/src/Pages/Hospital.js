import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar';
import donateimg from '../assets/donate.png'
import { useTypewriter } from 'react-simple-typewriter'
import history from '../assets/history.png'
import { Link } from 'react-router-dom'
import './Donor.css'


const Hospital = () => {
  const navigate = useNavigate();

 

  

  const [validstatus, setvalidstatus] = useState('false')
  const [hospital, sethospital] = useState('')
  // Use the useLocation hook to get the location object
  const location = useLocation();
  let hospital_Id
  // Access the state object, which contains the id
  try {
    hospital_Id = location.state.id || '';
  }
  catch {
    hospital_Id = '';
  }

  const getdonation = () => {
    console.log('called')
    navigate('/getdonation', { state: { id: hospital_Id } });
  };


  const seehistory = () => {
    console.log('history called')
    navigate('/hospitaldonationhistory', { state: { id: hospital_Id } });
  };

  const authToken = localStorage.getItem(`authToken_${hospital_Id}`);


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
      sethospital(data)
    })


  }, [validstatus])


  if (validstatus === 'true') {
    return (

      <>
        <Navbar />
        <div className="page">
          <div className="text">
            <br />
            <h2>Hello {hospital}, Welcome to Blood Bond</h2>
            <br />
            
          </div>

          <div className="cards" >
             
              <div class="card card1" onClick={getdonation}>
              <img src={donateimg} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Get Blood</h5>
                <p class="card-text">Request blood from your linked organizations</p>
              </div>
            </div>
          

          
            <div class="card card2" onClick={getdonation}>
              <img src={history} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Recieving History</h5>
                <p class="card-text">Ypur blood recieving history</p>
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
      <p>You are not logged in as a hospital.</p>
    </>
  )
}



}




export default Hospital
