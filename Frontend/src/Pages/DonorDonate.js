import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import './DonorDonate.css'


const DonorDonate = () => {

    const [validstatus, setvalidstatus] = useState('false')
    
    const [donor, setdonor] = useState('')
    const location = useLocation();

    const [recieverorg, setrecieverorg] = useState()
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


            fetch('http://localhost:3001/organizations', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${authToken}`
                }
            }).then((orgs) => {
                return orgs.json().then((orgs) => {

                   
                    for (i; i < orgs.length; i++) {

                        const tr = document.createElement('tr')
                        const { name, address, city } = orgs[i]
                        const td1 = document.createElement('td')
                        td1.innerText = name
                        const td2 = document.createElement('td')
                        td2.innerText = city
                        const td3 = document.createElement('td')
                        td3.innerText = address
                        const btn = document.createElement('button')

                        btn.id = name
                        btn.innerHTML = 'Donate'
                        btn.className = 'btn  donatebutton'
                        btn.onclick = (() => {
                            setFormData({
                                ...formData,
                                orgname: name,
                            });
                            document.getElementById('donationform').style.visibility = 'visible';

                        })
                        tr.appendChild(td1)
                        tr.appendChild(td2)
                        tr.appendChild(td3)
                        tr.appendChild(btn)
                        document.getElementById('organizationstable').appendChild(tr)
                    }
                })
            })
        })


    }, [])

    const [formData, setFormData] = useState({
        orgname: '',
        donorid: donor_Id,
        date: '',
        qty:'',
    });

    const handleInput = ((e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    })

    const donateblood = ((e) => {
        e.preventDefault()
        fetch('http://localhost:3001/donordonate', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'authorization': `${authToken}`
            },
            body: JSON.stringify(formData),
        }).then((res) => {
            if (res.ok) {
                return res.json().then((data)=>{
                   
                    alert('Blood donated')
                })
            }
            else {
              return res.json().then((err)=>{
                console.log(err)
              })
            }
        })
        
    })
  


    if (validstatus === 'true') {
        return (

            <>
                <Navbar />

               <div className='main'>
                <table className="table  table-hover" >
                    <thead>
                        <tr>
                            <td>Organization Name</td>
                            <td>City</td>
                            <td>Address</td>
                            <td>Donate</td>
                        </tr>
                    </thead>

                    <tbody id='organizationstable'>

                    </tbody>

                </table>


                <form action="" id='donationform' style={{ visibility: 'hidden' }} onSubmit={donateblood}>
                    <div>
                        <label htmlFor="">Blood Quantity to donate: </label>
                        <input required onChange={handleInput} type='radio' name='qty' value='0.5' />
                        <label htmlFor="">0.5 liters</label>
                        <input required onChange={handleInput} type='radio' name='qty' value='1.0' />
                        <label htmlFor="">1.0 liters</label>
                        <br />
                        <label  htmlFor="">Donation Date: </label>
                        <input required min='2024-01-02' onChange={handleInput} type='date' name='date' />
                        <br />
                        <button>Submit</button>
                    </div>
                </form>
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


export default DonorDonate
