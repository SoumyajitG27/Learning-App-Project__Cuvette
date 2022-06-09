
import { DriveEta } from '@mui/icons-material'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { Alert, Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import pic from "../Images/lock.png"
import pic2 from "../Images/bg_signup.jpg"
import { UserAuth } from '../context/AuthContext'
import axios, { Axios } from 'axios'

const SignUp = () => {
    const { createUser } = useContext(UserAuth)
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        pass: ""
    });

    const [errMsg, setErrMsg] = useState("");

    const handleSubmission = async (e) => {
        e.preventDefault();
        if (!values.email || !values.pass) {
            setErrMsg("Please fill all fields!");
            return;
        }
        setErrMsg("");
        try {
            await createUser(values.email, values.pass)
            const email = values.email;
            const pass = values.pass;
            await axios.post('/api/users/signup', {
                email,
                pass,
            });
            navigate("/login")
        } catch (err) {
            setErrMsg(err.message)
        }
        // createUser(values.email, values.pass)
        //     .then(async (res) => {
        //         const user = res.user;
        //         await updateProfile(user,
        //             { displayName: values.email });
        //         navigate("/login");
        //     })
        //     .catch((err) => {
        //         setErrMsg(err.message);
        //     });
    };

    return (
        <div className='bg-SignUp'>
            <Container fluid='md' className='mt-5' style={{ width: 400 }}>
                {/* <Row>
                    <Col lg={3} md={6} sm={12} className="justify-content-center"> */}
                <div className='text-center'>
                    <Image style={{ width: '50%' }} className='mb-3 pb-3 mt-5' fluid src={pic} alt="icon" />
                </div>
                {errMsg && <Alert variant='danger'>{errMsg}</Alert>}
                <Form onSubmit={handleSubmission}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                            onChange={(e) =>
                                setValues((prev) => ({ ...prev, email: e.target.value }))
                            } />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password"
                            onChange={(e) =>
                                setValues((prev) => ({ ...prev, pass: e.target.value }))
                            } />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary btn-block" size="md" type="Submit">
                            <strong>Sign Up</strong>
                        </Button>
                        <div className='mb-5 text-left'>
                            Already have an account? Please <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}><strong>Login</strong></Link>
                        </div>
                    </div>
                </Form>
                {/* </Col>
                </Row> */}
            </Container>
        </div >
    )
}

export default SignUp