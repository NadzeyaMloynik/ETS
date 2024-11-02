import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';
import {Button, ButtonGroup, Container, Nav, Navbar,  NavDropdown, Image} from "react-bootstrap";
import { NavLink, useNavigate} from "react-router-dom";
import logo from "../assets/penguin.png"
import { LOGIN_ROUTE,
    REGISTRATION_ROUTE
 } from '../../utils/consts';
import "../styles/NavBarStyle.css"

import { useAuth } from '../common/AuthContext';

function NavBar() {

    const { isAuthenticated, logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            logout(); 
            navigate(LOGIN_ROUTE); 
        }
    };


    return (
        <Navbar collapseOnSelect className="navbar navbar-dark">
            <Container className='main-block'>
                <Navbar.Brand>
                    <NavLink to={LOGIN_ROUTE} className="logo">
                    <h3>
                        UNI
                    </h3>
                    <Image src={logo}/>
                    <h3>   
                    TEST
                    </h3>
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav" className='links-and-buttons'>
                    <Nav className='link'>
                        <NavLink to={LOGIN_ROUTE} className="nav-link">Контакты</NavLink>
                    </Nav>
                    <Nav className='buttons'>
                        {isAuthenticated ?
                            <Button className="br-0" variant={"outline-light"} onClick={handleLogout}>Выйти</Button>
                            :
                            <ButtonGroup >
                                <Button className="br-0" variant={"outline-light"} onClick={()=>navigate(LOGIN_ROUTE)}>Войти</Button>
                                <Button className="br-0" variant={"outline-light"} onClick={()=>navigate(REGISTRATION_ROUTE) }>Регистрация</Button>
                            </ButtonGroup>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
