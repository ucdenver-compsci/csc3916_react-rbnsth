import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from './login';
import Register from './register';
import { logoutUser } from '../actions/authActions';

const Authentication = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const username = useSelector(state => state.auth.username);
    const [toggleReg, setToggleReg] = useState(false);

    const showLogin = () => {
        setToggleReg(false);
    }

    const showReg = () => {
        setToggleReg(true);
    }

    const logout = () => {
        dispatch(logoutUser());
    }

    const userNotLoggedIn = (
        <div>
            <button onClick={showLogin}>Login</button><button onClick={showReg}>Register</button>
            { toggleReg ? <Register /> : <Login /> }
        </div>
    );
    const userLoggedIn = (<div>Logged in as: {username} <button onClick={logout}>Logout</button></div>);

    return (
        <div>
            {loggedIn ? userLoggedIn : userNotLoggedIn}
        </div>
    )
}

export default Authentication;