// IMPORT REACT
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// ADDITIONAL IMPORTS
import { Link } from "react-router-dom";
import * as userService from "../utilities/users-service";



// CREATE COMPONENT
const NavBar = ({ user, setUser, getMovies }) => {

    // Create a function responsible for loggin the user out
    const handleLogOut = () => {
        // Call the logout function
        userService.logOut();

        // Set the user back to null
        setUser(null);
    };

    console.log(user);
    return (
        <Navbar sticky="top" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/home" >MERNMOVIES</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/home" eventKey="link-1">Home</Nav.Link>
                    <Nav.Link as={Link} to="/shop" eventKey="link-2">Shop</Nav.Link>
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Nav.Link as={Link} onClick={() =>{
                            return handleLogOut()
                        }} to="">Signed in as: {user.newUser.name}</Nav.Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

// EXPORT COMPONENT
export default NavBar;
