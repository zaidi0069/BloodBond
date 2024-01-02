import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar';

import './DonorDonate.css'



const AdmintransDashboard = () => {


    const [validstatus, setvalidstatus] = useState('false')

    const location = useLocation();

    let admin_Id
    // Access the state object, which contains the id
    try {
        admin_Id = location.state.id || '';
    }
    catch {
        admin_Id = '';
    }




    const authToken = localStorage.getItem(`authToken_${admin_Id}`);


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


            fetch(`http://localhost:3001/alltransactions`, {
               
            headers: {
              'Content-Type': 'application/json',
              'authorization': `${authToken}`
          },
            })
                .then((requests) => {
                       
                    if (requests.ok) {


                        return requests.json().then((requests) => {
                          

                            for (let i = 0; i < requests.length; i++) {
                                let row = document.createElement('tr')
                             
                                let donorname = document.createElement('td')
                                donorname.innerText = requests[i].donorName

                                let orgname = document.createElement('td')
                                orgname.innerText = requests[i].orgname


                                let bloodgroup = document.createElement('td')
                                bloodgroup.innerText = requests[i].blood_group

                                let qty = document.createElement('td')
                                qty.innerText = requests[i].quantity

                                let date = document.createElement('td')
                                date.innerText = requests[i].date

                            
                                    
                                

                                row.appendChild(donorname)
                                row.appendChild(orgname)
                                row.appendChild(bloodgroup)
                                row.appendChild(qty)
                                row.appendChild(date)
                              
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
                    <h2>Blood Requests History</h2>

                <table className="table table-info table-borderless table-hover" >
                    <thead>
                        <tr>
                            <td>Donor</td>
                            <td>Organization</td>
                            <td>Blood Group</td>
                            <td>Quantity</td>
                            <td>Date</td>
                         
                        
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
                <p>You are not logged in as an admin.</p>
            </>
        )
    }

}



export default AdmintransDashboard