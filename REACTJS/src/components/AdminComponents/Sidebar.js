import React from 'react'
import { Link } from 'react-router-dom';
import {Nav, NavDropdown} from 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
var Diamond = require('../../asset/image/logo.png');
const Sidebar = ({ isLoggedIn, userInfo, handleLogout }) => {
  return (
    <div className="bg-white">
        <div className='m-3'>
          <img src={Diamond} alt=""/>
        </div>
        <hr className='text-dark' />
        <div className="list-group list-group-flush tex">
            <a className='list-group-item py-2'>
            <i class="bi bi-speedometer2 fs-4 me-3"></i>
                <span className='fs-5'>Dashboard</span>
            </a>
            <a className='list-group-item py-2 d-flex'>
                <i className='bi bi-house fs-4 me-3'></i>
                <span className='fs-5'><Nav.Link class="nav-link active  responsive_none" as={NavLink} to="/admin/home" aria-current="page">Home</Nav.Link></span>
            </a>
            <a className='list-group-item py-2 d-flex'>
                <i className='bi bi-table fs-5 me-3'></i>
                <span className='fs-5'><Nav.Link class="nav-link active  responsive_none" as={NavLink} to="/admin/products" aria-current="page">Product</Nav.Link></span>
            </a>
            <a className='list-group-item py-2'>
                <i className='bi bi-clipboard-data fs-5 me-3'></i>
                <span className='fs-5'>Report</span>
            </a>
            <a className='list-group-item py-2 d-flex'>
                <i className='bi bi-people fs-5 me-3'></i>
                <span className='fs-5'><Nav.Link class="nav-link active  responsive_none" as={NavLink} to="/admin/users" aria-current="page">User</Nav.Link></span>
            </a>
            <a className='list-group-item py-2 d-flex'>
                <i className='bi bi-lock fs-5 me-3'></i>
                <span className='fs-5'>{isLoggedIn ? (
                            <NavDropdown title={userInfo?.first_name || 'User'}>
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <NavDropdown title="Setting">
                                <NavDropdown.Item href="/logins">Login</NavDropdown.Item>
                            </NavDropdown>
                        )}</span>
            </a>
        </div>
    </div>
  )
}

export default Sidebar
