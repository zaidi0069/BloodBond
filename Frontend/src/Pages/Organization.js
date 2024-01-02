import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import inventoryimg from '../assets/inventory.jpeg';

import history from '../assets/history.png';
import requestpic from '../assets/request.jpg';
import './Organization.css'; // Make sure to update your CSS file accordingly
import { useNavigate } from 'react-router-dom';

const Organization = () => {
  const navigate = useNavigate();
  const [validstatus, setvalidstatus] = useState('false');
  const [organization, setorganization] = useState('');
  const location = useLocation();
  const organization_Id = location.state.id;
  const authToken = localStorage.getItem(`authToken_${organization_Id}`);

  fetch('http://localhost:3001/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `${authToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      } else return res.json();
    })
    .then((data) => {
      setvalidstatus('true');
      setorganization(data);
    });

  function gotoinventory() {
    navigate('/orginventory', { state: { id: organization_Id, orgname: organization } });
  }

  function gotodonorslist() {
    console.log('clicked');
    navigate('/orgdonors', { state: { id: organization_Id, orgname: organization } });
  }

  function getrequests() {
    navigate('/bloodrequests', { state: { id: organization_Id, orgname: organization } });
  }

  function getrequestshistory() {
    navigate('/bloodrequestshistory', { state: { id: organization_Id, orgname: organization } });
  }

  if (validstatus === 'true') {
    return (
      <>
        <Navbar />
        <div className="organization-page">
          <div className="organization-text">
            <br />
            <h2>Hello {organization}, Welcome to Blood Bond</h2>
            <br />
          </div>

          <div className="organization-cards">
         
              <div className="organization-card organization-card1" onClick={gotoinventory}>
                <img src={inventoryimg} className="organization-card-img-top" alt="..." />
                <div className="organization-card-body">
                  <h5 className="organization-card-title">Inventory</h5>
                  <p className="organization-card-text">See Inventory</p>
                </div>
              </div>

              <div className="organization-card organization-card1" onClick={gotodonorslist}>
                <img src={history} className="organization-card-img-top" alt="..." />
                <div className="organization-card-body">
                  <h5 className="organization-card-title">Donors List</h5>
                  <p className="organization-card-text">See your donors</p>
                </div>
              </div>
           
            

         
              <div className="organization-card organization-card1" onClick={getrequests}>
                <img src={requestpic} className="organization-card-img-top" alt="..." />
                <div className="organization-card-body">
                  <h5 className="organization-card-title">Blood Requests</h5>
                  <p className="organization-card-text">See blood request from associated organizations</p>
                </div>
              </div>

              <div className="organization-card organization-card1" onClick={getrequestshistory}>
                <img src={requestpic} className="organization-card-img-top" alt="..." />
                <div className="organization-card-body">
                  <h5 className="organization-card-title">Blood Requests History</h5>
                  <p className="organization-card-text">See history of rejected/approved requests</p>
                </div>
              </div>
          
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <p>You are not logged in as an organization.</p>
      </>
    );
  }
};

export default Organization;
