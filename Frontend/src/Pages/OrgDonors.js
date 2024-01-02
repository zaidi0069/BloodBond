import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar';

import './DonorDonate.css'



const OrgDonors = () => {


    const [validstatus, setvalidstatus] = useState('false')
 
    const location = useLocation();

    let organization_Id
    // Access the state object, which contains the id
    try {
        organization_Id = location.state.id || '';
    }
    catch {
        organization_Id = '';
    }


   

    const authToken = localStorage.getItem(`authToken_${organization_Id}`);


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

        }).then(() => {

            
                fetch(`http://localhost:3001/donors?orgname=${location.state.orgname}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `${authToken}`
                    },
                })
                    .then((donors) => {
                        
                        if (donors.ok) {


                            return donors.json().then((donors) => {
                              
                                for (let i = 0; i < donors.length; i++) {
                                    let row = document.createElement('tr')
                                    // row.id='donor'+i
                                    let donorname = document.createElement('td')
                                    donorname.innerText = donors[i].name

                                    let donoremail = document.createElement('td')
                                    donoremail.innerText = donors[i].email

                                    let donorbloodgroup = document.createElement('td')
                                    donorbloodgroup.innerText = donors[i].blood_group

                                    let donoraddress = document.createElement('td')
                                    donoraddress.innerText = donors[i].address

                                    let donorage = document.createElement('td')
                                    donorage.innerText = donors[i].age

                                    row.appendChild(donorname)
                                    row.appendChild(donorage)
                                    row.appendChild(donorbloodgroup)
                                    row.appendChild(donoremail)
                                    row.appendChild(donoraddress)


                                    document.getElementById('donorstable').appendChild(row)
                                }



                            })
                        }
                        else {
                            console.log('error')
                        }
                    })


           
        })


    }, [])



    if (validstatus === 'true') {
        return (

            <>
                <Navbar />

                <div className='main'>
                    <h2>Donors' List</h2>

                <table className="table table-info table-borderless table-hover" >
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Age</td>
                            <td>Blood Group</td>
                            <td>Email</td>
                            <td>Address</td>

                        </tr>
                    </thead>

                    <tbody id='donorstable'>



                    </tbody>

                </table>
                </div>



            </>
        )
    }

    else {
        return (
            <>
                <p>You are not logged in as a organization.</p>
            </>
        )
    }

}



export default OrgDonors