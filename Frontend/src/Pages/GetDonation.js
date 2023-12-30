import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar';

import './Donordonate.css'

import 'reactjs-popup/dist/index.css';

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

        }).then(() => {


            fetch(`http://localhost:3001/linkedorgs?id=${hospital_Id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'authorization': `${authToken}`
                }
            }).then((orgs) => {
                return orgs.json().then((orgs) => {

                    console.log(orgs[0])
                    for (i; i < orgs.length; i++) {

                        const tr = document.createElement('tr')

                        const td1 = document.createElement('td')
                        td1.innerText = orgs[i]

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
                        document.getElementById('organizationstable').appendChild(tr)
                    }
                })
            })
        })


    }, [])

    const [formData, setFormData] = useState({
        orgname: '',
        blood_group: '',
        qty: '',
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
            },
            body: JSON.stringify(formData),
        }).then((res) => {
            if (res.ok) {
                return res.json().then((data) => {
                    console.log(data.msg)
                    alert('Request Made')
                })
            }
            else {
                return res.json().then((err) => {
                    console.log(err)
                })
            }
        })
        console.log(formData)
    })



    if (validstatus === 'true') {
        return (

            <>
                <Navbar />

                <h1>hello</h1>

                <table className="table table-info table-borderless table-hover" >
                    <thead>
                        <tr>
                            <td>Organization Name</td>


                        </tr>
                    </thead>

                    <tbody id='organizationstable'>

                    </tbody>

                </table>


                <form action="" id='donationform' style={{ visibility: 'hidden' }} onSubmit={getblood}>
                    <div>



                        <label for="bloodQuantity">Blood Group:</label>
                        <select onChange={handleInput} id="blood_group" name="blood_group" style={{ height: '5vh' }}>

                            <option  selected value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          
                        </select>
                        <br />




                        <label for="bloodQuantity">Blood Quantity:</label>
                        <select onChange={handleInput} id="bloodQuantity" name="qty" style={{ height: '5vh' }}>

                            <option selected='true' value="1">1 liter</option>
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
