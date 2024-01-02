import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar';

import './DonorHistory.css'

const GetDonation = () => {

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


            fetch(`http://localhost:3001/linkedorgs?id=${hospital_Id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${authToken}`
                },
            }).then((orgs) => {
                return orgs.json().then((orgs) => {

                  
                    for (i; i < orgs.length; i++) {

                        const tr = document.createElement('tr');
                        tr.style.padding='0px'
                        tr.style.maxHeight='10px'


                        const td1 = document.createElement('td')
                        td1.innerText = orgs[i]
                        td1.style.padding = '0px';


                        const btn = document.createElement('button')

                        btn.id = orgs[i]
                        btn.innerHTML = 'Request'
                        btn.className = 'btn  donatebutton'
                        btn.onclick = (() => {
                            setFormData({
                                ...formData,
                                orgname: btn.id,

                            });

                            document.getElementById('donationform').style.visibility = 'visible';

                        })
                        tr.appendChild(td1)

                        tr.appendChild(btn)
                        
                        
                        document.getElementById('organizationtable').appendChild(tr)
                    }
                })
            })
        })


    }, [])

    const [formData, setFormData] = useState({
        orgname: '',
        blood_group: 'A+',
        qty: '1',
        hospital_Id: hospital_Id,
    });

    const handleInput = ((e) => {

        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    })

    const getblood = ((e) => {
        e.preventDefault()
        fetch('http://localhost:3001/hospitalrequest', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'authorization': `${authToken}`
            },
            body: JSON.stringify(formData),
        }).then((res) => {
            if (res.ok) {
                return res.json().then((data) => {
                   
                    alert('Request Made')
                })
            }
            else {
                return res.json().then((err) => {
                    console.log(err)
                })
            }
        })
       
    })



    if (validstatus === 'true') {
        return (

            <>
                <Navbar />

                <div className='main' >

                    <table className="table  table-borderless table-hover" >
                        <thead>
                            <tr style={{ 'max-height': '20px' }}>
                                <td>Organization Name</td>
                                <td>Request Blood</td>
                            </tr>




                        </thead>

                        <tbody id='organizationtable'>

                        </tbody>

                    </table>


                    <form action="" id='donationform' style={{ visibility: 'hidden' }} onSubmit={getblood}>
                        <div>



                            <label htmlFor="blood_group">Blood Group:</label>
                            <select onChange={handleInput} id="blood_group" name="blood_group" style={{ height: '5vh' }} required >

                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>

                            </select>
                            <br />




                            <label htmlFor="bloodQuantity">Blood Quantity:</label>
                            <select onChange={handleInput} id="bloodQuantity" name="qty" style={{ height: '5vh' }} required>

                                <option  value="1">1 liter</option>
                                <option value="2">2 liters</option>
                                <option value="3">3 liters</option>
                                <option value="4">4 liters</option>
                                <option value="5">5 liters</option>
                                <option value="6">6 liters</option>
                                <option value="7">7 liters</option>
                                <option value="8">8 liters</option>
                                <option value="9">9 liters</option>
                                <option value="10">10 liters</option>
                            </select>
                            <br />

                            <button >Submit</button>
                        </div>
                    </form>
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


export default GetDonation
