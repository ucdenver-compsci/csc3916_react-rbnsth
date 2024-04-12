import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from "../actions/authActions";

const MovieHeader = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const selectedMovie = useSelector(state => state.movie.selectedMovie);

    const logout = () => {
        dispatch(logoutUser());
    }

    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>
                    Movie App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                        <LinkContainer to="/movielist">
                            <Nav.Link disabled={!loggedIn}>Movie List</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={'/movie/' + (selectedMovie ? selectedMovie._id : '')}>
                            <Nav.Link disabled={!loggedIn}>Movie Detail</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/signin">
                            <Nav.Link>{loggedIn ? <button onClick={logout}>Logout</button> : 'Login'}</Nav.Link>
                        </LinkContainer>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default MovieHeader;