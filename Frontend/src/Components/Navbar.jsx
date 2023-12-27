import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
const Navbar = () => {
    return (
        <div>
            
            <nav className="navbar navbar-expand-lg "  style={{backgroundColor: "rgb(141, 46, 46)"}}>
                <div className="container-fluid">
                    <a className="navbar-brand color hover" href="/">BloodBond</a>
                   
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        

                            <li className="nav-item">
                                <Link className="nav-link color hover active" to='/Signup' >SignUp/LogIn</Link>
                            </li>
                        </ul>
                       
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
