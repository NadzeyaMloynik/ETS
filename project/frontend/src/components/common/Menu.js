import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../styles/AdminPage.css'

function Menu() {

  const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

  return (
    <div className="menu vh-100 p-3 bg-dark text-white" style={{ width: '250px' }}>
    {profileInfo.role === "ADMIN" ?
      <Nav className="flex-column">
        <NavLink to="/" className="nav-link text-white" activeClassName="active">
          Аккаунты
        </NavLink>
      </Nav> :
      <></>
    }
    </div>
  );
}

export default Menu;
