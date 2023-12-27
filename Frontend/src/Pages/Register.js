import React from 'react'
import Navbar from '../Components/Navbar'
import bd from '../assets/blooddrop1.png'
import './Register.css'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom'




const Register = () => {



    const [signupAPI, setsignupAPI] = useState('http://localhost:3001/donorsignup')
    const navigate = useNavigate();
    const [page, setpage] = useState('donor')


    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
        blood_group: 'A+',
        mobile: '',
        city: '',
        age: '',
        address: '',
        donation_frequency: 'Once a year'

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


    const handleSubmit = (e) => {

        try {

            e.preventDefault()
            fetch(signupAPI, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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


                    if (page == 'donor')
                        navigate("/donor", { state: { id: id } });

                    else if (page == 'organization')
                        navigate("/organization", { state: { id: id } });

                })
                .catch((error) => {
                    console.error('Errorrrr:' + error);

                });
        } catch (e) {

        }

    }





    


    function Pagesetter(e) {

        e.preventDefault();

        if (e.target.value === 'donor') {
            setpage('donor')
            setsignupAPI('http://localhost:3001/donorsignup')
        }

        else if (e.target.value === 'organization') {
            setpage('organization')
            setsignupAPI('http://localhost:3001/organizationsignup')
        }

        else if (e.target.value === 'hospital') {
            navigate('/hospitalsignup')

        }

        else if (e.target.value === 'admin') {
            setpage('admin')
            setsignupAPI('http://localhost:3001/adminsignup')
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
                        checkboxLabel.innerText = organizations[i]
                        var checkbox = document.createElement('input');

                        checkbox.type = 'checkbox';

                        checkbox.name = 'organizations'
                        checkbox.value = organizations[i];
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

    if (page === 'donor') {

        content = <>
            <form onSubmit={handleSubmit} className="row g-3 container" >

                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Name</label>
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
                    <label htmlFor="number" className="form-label">Mobile No </label>
                    <input onChange={handleInputonChange} required='true' type="tel" className="form-control" id="number" name='mobile' placeholder="0311..." />
                </div>

                <div className="col-12">
                    <label htmlFor="Address" className="form-label">Address </label>
                    <input onChange={handleInputonChange} required='true' type="text" className="form-control" name='address' id="inputAonChange={handleInputonChange} ddress" placeholder="Apartment, studio, or floor" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputConChange={handleInputonChange} ity" className="form-label">City</label>
                    <input onChange={handleInputonChange} required='true' type="text" className="form-control" name='city' id="inputConChange={handleInputonChange} ity" />
                </div>

                <div className="col-md-6">
                    <label htmlFor="age" className="form-label">Age (years)</label>
                    <input onChange={handleInputonChange} required='true' type="number" name="age" id="age" min="18" max="55" className="form-control" />
                </div>

                <div className="col-md-6">
                    <label htmlFor="bloodgroup" className="form-label">Blood Group</label>
                    <select required='true' id="bg" onChange={handleInputonChange} className="form-select" name='blood_group'>
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>
                    </select>
                </div>


                <div className="col-md-6">
                    <label htmlFor="freq" className="form-label">Expected frequency of donation</label>
                    <select required='true' id="freq" onChange={handleInputonChange} className="form-select" name='donation_frequency'>
                        <option>Once a year</option>
                        <option>Twice a year</option>
                        <option>Thrice a year</option>
                        <option>More than thrice a year</option>
                    </select>
                </div>

                <div className="col-12" id='organizationsrow'>

                </div>
                <div className="col-12">
                    <button type='submit' className="btn btn-primary">Register</button>
                </div>
            </form>
        </>
    }

    else if (page === 'organization') {


        content =
            <>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
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
                        <label htmlFor="number" className="form-label">Mobile No </label>
                        <input onChange={handleInputonChange} required='true' type="tel" className="form-control" id="number" name='mobile' placeholder="0311..." />
                    </div>

                    <div className="col-12">
                        <label htmlFor="Address" className="form-label">Address </label>
                        <input onChange={handleInputonChange} required='true' type="text" className="form-control" name='address' id="inputAonChange={handleInputonChange} ddress" placeholder="Apartment, studio, or floor" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputConChange={handleInputonChange} ity" className="form-label">City</label>
                        <input onChange={handleInputonChange} required='true' type="text" className="form-control" name='city' id="inputConChange={handleInputonChange} ity" />
                    </div>
                    <div className="col-12" id='organizationsrow'>

                    </div>

                    <div className="col-12">
                        <button onClick={() => { }} type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </>

    }









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


export default Register
