import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { auth } from '../firebase'
import pic from "../Images/lock.png"
import pic2 from "../Images/login.jpg"
const Login = () => {
    const { signIn, user } = useContext(UserAuth)
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
            await signIn(values.email, values.pass)
            localStorage.setItem('userInfo', JSON.stringify(user));
            navigate("/dashboard");
        } catch (err) {
            setErrMsg(err.message);
        }
        // signIn(values.email, values.pass)
        //     .then(() => {
        //         navigate("/dashboard");
        //     })
        //     .catch((err) => {
        //         setErrMsg(err.message);
        //     });
    };

    useEffect(() => {
        if (localStorage.getItem('userInfo')) {
            navigate("/dashboard")
        }
    }, [navigate])

    return (
        <div>
            <Container fluid='md' className='mt-5'>
                <Row>
                    <Col lg={3} md={6} sm={12}>
                        <Image className='mb-5 pb-3 mt-5' fluid src={pic} alt="icon" />
                        {errMsg && <Alert variant='danger'>{errMsg}</Alert>}
                        <Form onSubmit={handleSubmission}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"
                                    onChange={(e) =>
                                        setValues((prev) => ({ ...prev, email: e.target.value }))} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                    onChange={(e) =>
                                        setValues((prev) => ({ ...prev, pass: e.target.value }))} />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary btn-block" size="md" type="Submit">
                                    <strong>Log In</strong>
                                </Button>
                                <Container className='justify-content-center'>
                                    <GoogleButton type='light'>
                                    </GoogleButton>
                                </Container>
                                <Container className='p-2 mb-5 justify-content-center'>
                                    Do not have an account? Please <Link to="/register">Sign Up</Link>
                                </Container>
                            </div>
                        </Form>
                    </Col>
                    <Col lg={9} md={6} sm={12}>
                        <Image className='w-100 p-5 m-5' src={pic2} alt='loginpic' />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login