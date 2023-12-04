import React from 'react'
import './Navbar.css'
const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg "  style={{backgroundColor: "rgb(141, 46, 46)"}}>
                <div className="container-fluid">
                    <a className="navbar-brand color hover" href="#">BloodBond</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link color hover active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link color hover" href="#">About Us</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link color hover dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Donate Blood
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link color hover active" href='/'>Need Blood</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link color hover active" href='/' >Register</a>
                            </li>
                        </ul>
                       
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
