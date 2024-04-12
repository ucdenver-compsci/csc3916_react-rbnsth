import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitLogin } from '../actions/authActions';
import { Form, Button } from 'react-bootstrap';

const Login = () => {
    const dispatch = useDispatch();
    const [details, setDetails] = useState({
        username: '',
        password: ''
    });

    const updateDetails = event => {
        setDetails({
            ...details,
            [event.target.id]: event.target.value
        });
    }

    const login = event => {
        event.preventDefault();
        dispatch(submitLogin(details));
    }

    return (
        <Form className='form-horizontal' onSubmit={login}>
            <Form.Group controlId="username">
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={updateDetails} value={details.username} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={updateDetails} value={details.password}  type="password" placeholder="Password" />
            </Form.Group>
            <Button type="submit">Sign in</Button>
        </Form>
    )
}

export default Login;