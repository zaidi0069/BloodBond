import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar';

import './Donordonate.css'



const HospitalRequestsHistory = () => {


    const [validstatus, setvalidstatus] = useState('false')

    const location = useLocation();

    let hospital_Id
    // Access the state object, which contains the id
    try {
        hospital_Id = location.state.id || '';
    }
    catch {
        hospital_Id = '';
    }




    const authToken = localStorage.getItem(`authToken_${hospital_Id}`);


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


            fetch(`http://localhost:3001/hospitalrequestshistory?hospitalid=${hospital_Id}`, {
               
                headers: {
                    'Content-Type': 'application/json',
                },

            })
                .then((requests) => {

                    if (requests.ok) {
                        return requests.json().then((requests) => {
                        

                            for (let i = 0; i < requests.length; i++) {
                                let row = document.createElement('tr')
                                // row.id='donor'+i
                                let hospitalname = document.createElement('td')
                                hospitalname.innerText = requests[i].hospital


                                let bloodgroup = document.createElement('td')
                                bloodgroup.innerText = requests[i].blood_group

                                let qty = document.createElement('td')
                                qty.innerText = requests[i].quantity

                                let status = document.createElement('td')
                                status.innerText = requests[i].status

                            
                                    
                                

                                row.appendChild(hospitalname)
                                row.appendChild(bloodgroup)
                                row.appendChild(qty)
                                row.appendChild(status)
                              
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

                

                <table className="table table-info table-borderless table-hover" >
                    <thead>
                        <tr>
                            <td>Hospital</td>
                            <td>Blood Group</td>
                            <td>Quantity</td>
                            <td>Status</td>
                         
                        
                        </tr>
                    </thead>

                    <tbody id='donorstable'>



                    </tbody>

                </table>




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



export default HospitalRequestsHistory