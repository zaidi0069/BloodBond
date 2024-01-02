import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar';

import './DonorDonate.css'



const Orginventory = () => {

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


            fetch(`http://localhost:3001/inventory?orgname=${location.state.orgname}`, {
                
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${authToken}`
            },
              
            })
                .then((inventory) => {
                    if (inventory.ok) {


                        return inventory.json().then((inventory) => {
                         
                             document.getElementById('A+').innerText=inventory["A+"]
                             document.getElementById('A-').innerText=inventory["A-"]
                             document.getElementById('B+').innerText=inventory["B+"]
                             document.getElementById('B-').innerText=inventory["B+"]
                             document.getElementById('AB+').innerText=inventory["AB+"]
                             document.getElementById('AB-').innerText=inventory["AB-"]
                             document.getElementById('O+').innerText=inventory["O+"]
                             document.getElementById('O-').innerText=inventory["O-"]

                         
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

                    <h2>Inventory</h2>

                <table className="table table-info table-borderless table-hover" >
                    <thead>
                        <tr>
                            <td>Blood Type</td>
                            <td>Quantity</td>
                        </tr>
                    </thead>

                    <tbody id='inventorytable'>

                        <tr> <td>A+</td> <td id='A+'></td> </tr>
                        <tr> <td>A-</td> <td id='A-'></td> </tr>
                        <tr> <td>B+</td> <td id='B+'></td> </tr>
                        <tr> <td>B-</td> <td id='B-'></td> </tr>
                        <tr> <td>AB+</td> <td id='AB+'></td> </tr>
                        <tr> <td>AB-</td> <td id='AB-'></td> </tr>
                        <tr> <td>O+</td> <td id='O+'></td> </tr>
                        <tr> <td>O+</td> <td id='O-'></td> </tr>

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



export default Orginventory