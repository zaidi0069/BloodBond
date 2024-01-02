import React from 'react'
import Navbar from '../Components/Navbar'
import bd from '../assets/blooddrop1.png'
import './Register.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Login = () => {

    const navigate = useNavigate();
    const [page, setpage] = useState('donor')

    const [formData, setFormData] = useState({
        password: '',
        email: '',
    });

    const [loginAPI, setloginAPI] = useState('http://localhost:3001/donorlogin')


    const handleInputonChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {

        try {
            e.preventDefault()
            fetch(loginAPI, {
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
                                let x= document.getElementById('error')
                                x.innerText=data.err
                            })
                    }
                    else
                    { 
                        return res.json();
                        let x= document.getElementById('error')
                        x.innerText=""
                    }

                })
                .then((data) => {

                  
                    const id = data.id


                    localStorage.setItem(`authToken_${id}`, data.token);


                    if (page == 'donor')
                        navigate("/donor", { state: { id: id } });

                    else if (page == 'organization')
                        navigate("/organization", { state: { id: id } });

                    else if (page == 'hospital')
                        navigate("/hospital", { state: { id: id } });

                    else if (page == 'admin')
                        navigate("/admin", { state: { id: id } });

                })
                .catch((error) => {
                    console.error('Errorrrr:', error.err);
                    
                });
        } catch (e) {

        }

    }





    function apisetter(e) {
        // e.preventDefault();

        if (e.target.value === 'donor') {
            setloginAPI('http://localhost:3001/donorlogin')
            setpage('donor')
           
        }


        else if (e.target.value === 'organization') {
            setpage('organization')
            setloginAPI('http://localhost:3001/organizationlogin')
         
        }

        else if (e.target.value === 'hospital') {
            setpage('hospital')
            setloginAPI('http://localhost:3001/hospitallogin')
         
        }
        


        else if (e.target.value === 'admin') {
            setpage('admin')
            setloginAPI('http://localhost:3001/adminlogin')
        }

    }








    return (
        <>
            <Navbar />

            <div className="register">

                <div className="image">
                    <img id='bd' src={bd} alt="" />
                </div>


                <div className="form">

                    <div className="qn">
                        <h5>Login as: </h5>
                        <label htmlhtmlFor="">Donor </label>
                        <input required='true' type="radio" id="donor" name="role" value="donor" checked={loginAPI === 'http://localhost:3001/donorlogin'} onChange={apisetter} />
                        <label htmlhtmlFor="">Hospital </label>
                        <input required='true' type="radio" id="hospital" name="role" value="hospital" onChange={apisetter} />
                       
                        <label htmlhtmlFor="">Organization </label>
                        <input required='true' type="radio" id="organization" name="role" value="organization" onChange={apisetter} />
                        <label htmlhtmlFor="">Admin </label>
                        <input required='true' type="radio" id="admin" name="role" value="admin" onChange={apisetter} />
                        <br />
                    </div>
                    <br />


                    <form onSubmit={handleSubmit} className="row g-3 container" >


                        <div className="col-12">
                            <label htmlFor="email" className="form-label ">Email</label>
                            <input onChange={handleInputonChange} required='true' type="email" className="form-control" name='email' id="email" />
                        </div>

                        <div className="col-12">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input onChange={handleInputonChange} required='true' type="password" className="form-control" name="password" id="password" />
                        </div>


                        <div className="col-12">
                            <button type='submit' className="btn btn-primary">Log In</button>
                        </div>


                        <p style={{color:'white'}} id='error'></p>
                    </form>




                </div>
            </div>
        </>
    )
}

export default Login
