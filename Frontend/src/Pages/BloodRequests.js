import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar';

import './DonorDonate.css'



const BloodRequests = () => {


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

        console.log('1')
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


            fetch(`http://localhost:3001/bloodrequests?orgname=${location.state.orgname}`, {

            headers: {
                'Content-Type': 'application/json',
                'authorization': `${authToken}`
            },

            })
                .then((requests) => {

                    if (requests.ok) {


                        return requests.json().then((requests) => {
                   
                                console.log(requests)
                            for (let i = 0; i < requests.length; i++) {
                                let row = document.createElement('tr')
                                
                                let hospitalname = document.createElement('td')
                                hospitalname.innerText = requests[i].hospital


                                let bloodgroup = document.createElement('td')
                                bloodgroup.innerText = requests[i].blood_group

                                let qty = document.createElement('td')
                                qty.innerText = requests[i].quantity

                                let status = document.createElement('td')
                                status.innerText = requests[i].status

                                let possibility = document.createElement('td')
                                possibility.innerText = requests[i].possibility

                                let approvetd = document.createElement('td')
                                let approvebtn= document.createElement('button')
                                approvebtn.className = 'approvebtn btn btn-outline-success'
                                approvebtn.innerText= 'Approve'
                                approvetd.appendChild(approvebtn)

                                if(requests[i].possibility==='false')
                                approvebtn.disabled='true'

                                approvebtn.onclick= ()=>{
                                    status.innerText='Approved'

                                    fetch(`http://localhost:3001/orgrequesthandling`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'authorization': `${authToken}`
                                        },
                                        body: JSON.stringify({reqid: requests[i]._id, status:'approved'}),
                                    })

                                    approvebtn.disabled='true'
                                    rejectbtn.disabled='true'
                                    
                                }
                                
                                let rejecttd = document.createElement('td')
                                let rejectbtn = document.createElement('button')
                                rejectbtn.className = 'rejectbtn btn btn-outline-light'
                                rejectbtn.innerText='Reject'
                                rejecttd.appendChild(rejectbtn)


                                rejectbtn.onclick= ()=>{
                                    status.innerText='Rejected'

                                    fetch(`http://localhost:3001/orgrequesthandling`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'authorization': `${authToken}`
                                        },
                                        body: JSON.stringify({reqid: requests[i]._id, status: 'rejected'}),
                                    })

                                    rejectbtn.disabled='true'
                                    approvebtn.disabled='true'
                                    
                                }

                                row.appendChild(hospitalname)
                                row.appendChild(bloodgroup)
                                row.appendChild(qty)
                                row.appendChild(status)
                                row.appendChild(possibility)
                                row.appendChild(rejecttd)
                                row.appendChild(approvetd)

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
                <h2>Pending Blood Requests</h2>

                <table className="table table-info table-borderless table-hover" >
                    <thead>
                        <tr>
                            <td>Hospital</td>
                            <td>Blood Group</td>
                            <td>Quantity</td>
                            <td>Status</td>
                            <td>Possibility</td>
                            <td>Reject</td>
                            <td>Approve</td>
                        
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



export default BloodRequests