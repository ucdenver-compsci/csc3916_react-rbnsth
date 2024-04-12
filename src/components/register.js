import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitRegister } from '../actions/authActions';
import { Form, Button } from 'react-bootstrap';

const Register = () => {
    const dispatch = useDispatch();
    const [details, setDetails] = useState({
        name: '',
        username: '',
        password: ''
    });

    const updateDetails = event => {
        setDetails({
            ...details,
            [event.target.id]: event.target.value
        });
    }

    const register = event => {
        event.preventDefault();
        dispatch(submitRegister(details));
    }

    return (
        <Form className='form-horizontal' onSubmit={register}>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={updateDetails} value={details.name} type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group controlId="username">
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={updateDetails} value={details.username} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={updateDetails} value={details.password}  type="password" placeholder="Password" />
            </Form.Group>
            <Button type="submit">Register</Button>
        </Form>
    )
}

export default Register;