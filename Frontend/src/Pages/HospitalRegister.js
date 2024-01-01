import React from 'react'
import Navbar from '../Components/Navbar'
import bd from '../assets/blooddrop1.png'
import './Register.css'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom'

const HospitalRegister = () => {

    const navigate = useNavigate();
    const [page, setpage] = useState('hospital')


    const [formData, setFormData] = useState({

    });


    const [selectedorgs, setselectedorgs] = useState([])


    const handleInputonChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxonChange = (e) => {
        const { value } = e.target;
        setselectedorgs((prev) => [
            ...prev, value,
        ]);

    };


    const requestBody = {
        formData: formData,
        selectedorgs: selectedorgs,
    };





    const handleHospitalSubmit = (e) => {

        try {

            e.preventDefault()
            console.log(selectedorgs)
            console.log(formData)
            console.log(JSON.stringify(requestBody))
            fetch('http://localhost:3001/hospitalsignup', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })
                .then((res) => {
                    if (!res.ok) {
                        return res.json()
                            .then((data) => {
                                console.log(data.err)
                            })
                    }
                    else return res.json();

                })
                .then((data) => {

                    const id = data.id


                    localStorage.setItem(`authToken_${id}`, data.token);


                        navigate("/hospital", { state: { id: id } });

                })
                .catch((error) => {
                    console.error('Errorrrr:' + error);

                });
        } catch (e) {

        }

    }



    function Pagesetter(e) {

        e.preventDefault();

         if (e.target.value !== 'hospital') {
            navigate('/signup')

        }

    }



    useEffect(() => {
        if (page == 'hospital') {
            var checkboxesContainer = document.getElementById('organizationsrow');

            if (!checkboxesContainer.hasChildNodes()) {
                console.log('hi')
                fetch('http://localhost:3001/organizations').then((res) => {
                    return res.json()
                }).then((orgs) => {
                    return orgs
                }).then((organizations) => {
                    console.log(organizations)

                    for (var i = 0; i < organizations.length; i++) {
                        var checkboxLabel = document.createElement('label');
                        checkboxLabel.innerText = organizations[i].name
                        var checkbox = document.createElement('input');

                        checkbox.type = 'checkbox';

                        checkbox.name = 'organizations'
                        checkbox.value = organizations[i].name;
                        checkboxesContainer.appendChild(checkbox);
                        checkbox.addEventListener('change', handleCheckboxonChange);
                        checkboxesContainer.appendChild(checkboxLabel);
                        checkboxesContainer.appendChild(document.createElement('br'));
                    }
                })
            }

        }

        else {
            var checkboxesContainer = document.getElementById('organizationsrow')
            checkboxesContainer.innerHTML = ""
            checkboxesContainer.style.visibility='false'
        }


    }, [page])


    // set content to return according to selected role

    let content;

   
        content =
            <>
                <form className="row g-3" onSubmit={handleHospitalSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Hospital Name</label>
                        <input onChange={handleInputonChange} required='true' type="text" className="form-control" name='name' id="name" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input onChange={handleInputonChange} required='true' type="email" className="form-control" name='email' id="email" />
                    </div>

                    <div className="col-12">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onChange={handleInputonChange} required='true' type="password" className="form-control" name="password" id="password" />
                    </div>



                    <div className="col-12">
                        <label htmlFor="Address" className="form-label">Address </label>
                        <input onChange={handleInputonChange} required='true' type="text" className="form-control" name='address' id="inputAonChange={handleInputonChange} ddress" placeholder="Apartment, studio, or floor" />
                    </div>


                    <div className="col-12" id='organizationsrow'>

                    </div>


                    <div className="col-12">
                        <button onClick={() => { }} type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </>


return (
    <>
        <Navbar />

        <div className="register">

            <div className="image">
                <img id='bd' src={bd} alt="" />
            </div>


            <div className="form">
                <p>Already have an account? <Link to="/login">Log In</Link></p>
                <div className="qn">
                    <h5>Register as: </h5>

                    <label htmlhtmlFor="">Donor </label>
                    <input required='true' type="radio" id="donor" name="role" value="donor" checked={page === 'donor'} onChange={Pagesetter} />
                    <label htmlhtmlFor="">Hospital </label>
                    <input required='true' type="radio" id="hospital" name="role" value="hospital" onChange={Pagesetter} />
                    <label htmlhtmlFor="">Organization </label>
                    <input required='true' type="radio" id="organization" name="role" value="organization" onChange={Pagesetter} />
                    <label htmlhtmlFor="">Admin </label>
                    <input required='true' type="radio" id="admin" name="role" value="admin" onChange={Pagesetter} />
                    <br />
                </div>
                <br />

                {/* based on radio selection */}
                {content}



            </div>
        </div>
    </>
)

}






    



export default HospitalRegister
