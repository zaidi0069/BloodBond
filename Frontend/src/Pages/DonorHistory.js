import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import './DonorHistory.css'

const DonorHistory = () => {

    const [validstatus, setvalidstatus] = useState('false')
    const location = useLocation();

    let donor_Id
    // Access the state object, which contains the id
    try {
        donor_Id = location.state.id || '';
    }
    catch {
        donor_Id = '';
    }



    const authToken = localStorage.getItem(`authToken_${donor_Id}`);


    let i = 0
  
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


            fetch('http://localhost:3001/history', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${authToken}`
                },
                body: JSON.stringify({ donorid: donor_Id }),
            })
                .then((donations) => {
                    if (donations.ok) {


                        return donations.json().then((donations) => {

                            if (donations.transactions.length < 1) {
                                alert('No donations... Donate First')
                                
                            }
                            else {
                                for (i; i < donations.transactions.length; i++) {

                                    const donation = donations.transactions[i]

                                    const tr = document.createElement('tr')

                                    const td1 = document.createElement('td')
                                    td1.innerText = donation.orgname
                                    const td2 = document.createElement('td')
                                    td2.innerText = donation.quantity
                                    const td3 = document.createElement('td')
                                    td3.innerText = donation.date



                                    tr.appendChild(td1)
                                    tr.appendChild(td2)
                                    tr.appendChild(td3)

                                    document.getElementById('organizationstable').appendChild(tr)
                                }
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

                
                <h2>History</h2>
                <br></br>

                <table className=" table  table-borderless table-hover" >
                    <thead>
                        <tr>
                            <td>Organization Name</td>
                            <td>Quantity</td>
                            <td>Date</td>
                        </tr>
                    </thead>

                    <tbody id='organizationstable'>

                    </tbody>

                </table>

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


export default DonorHistory
