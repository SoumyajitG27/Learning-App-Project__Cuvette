import { async } from '@firebase/util'
import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
import pic from "../Images/lock.png"
import pic2 from "../Images/login.jpg"
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {signUp} = useUserAuth();
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");
        try{
            await signUp(email, password);
            navigate("/login");
        }catch(err){
            setError(err.message);
        }
    };
    return (
        <div>
            <Container fluid='md' className='mt-5'>
                <Row>
                    <Col lg={3} md={6} sm={12} className="justify-content-center">
                        <Image className='mb-5 pb-3 mt-5' fluid src={pic} alt="icon" />
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary btn-block" size="md" type="submit">
                                    <strong>Sign Up</strong>
                                </Button>
                                <Container className='p-3 mb-5 justify-content-center'>
                                    Already have an account? Please <Link to="/login">Login</Link>
                                </Container>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SignUp