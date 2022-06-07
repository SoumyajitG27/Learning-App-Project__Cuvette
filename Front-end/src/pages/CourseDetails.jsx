import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react'
import { Col, Row, Dropdown, DropdownButton, ListGroup, Button, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import NavbarCart from '../components/NavbarCart';
import { Store } from '../Store';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, course: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};


const CourseDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { slug } = params;

    const [{ loading, error, course }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        course: []
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/courses/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        fetchData();
    }, [slug]);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { courseStore } = state;
    const addToStoreHandler = () => {
        const existItem = courseStore.storeItems.find((x) =>
            x._id === course._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        if (quantity > 1) {
            window.alert('You have already added this course to your cart');
            return;
        }
        ctxDispatch({
            type: 'STORE_ADD_ITEM',
            payload: { ...course, quantity }
        })
        navigate('/cart');
    }
    return (
        loading ? <div><Loading /></div>
            : error ? <div><MessageBox variant="danger">{error}</MessageBox> </div>
                : <div>
                    <NavbarCart />
                    <Row>
                        <Col md={6} sm={12}>
                            <h1 style={{ paddingTop: 20 }}>Course Content</h1>
                            <ListGroup>
                                {
                                    course.sections.map((section) =>
                                    (
                                        <ListGroup.Item style={{ backgroundColor: '#FFF3B0' }}>
                                            <DropdownButton className='.menu-width' id="dropdown-basic-button" title={section} variant='info'>
                                                <Dropdown.Item href="#/action-1">SubSection 1</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">SubSection 2</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">SubSection 3</Dropdown.Item>
                                            </DropdownButton>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </Col>
                        <Col md={6} sm={12}>
                            <div style={{ textAlign: 'center', backgroundColor: 'pink' }}>
                                <iframe width="500" height="300" src={course.video} alt="Course video" />
                                <h4><strong>{course.description}</strong></h4>
                                <p>Instructor: {course.instructor}</p>
                                <Row style={{ textAlign: 'left', paddingLeft: '6em' }}>
                                    <Col><ul><li>Certificate upon completion</li>
                                        <li>Full lifetime access</li>
                                        <li>Rating: {course.rating}</li></ul></Col>
                                    <Col><ul>
                                        <li>Language: {course.language}</li>
                                        <li>Enrolled students: {course.noOfStudents}</li>
                                        <li>{course.numReviews} reviews</li></ul>
                                    </Col>
                                </Row>
                                <Button onClick={addToStoreHandler} variant='warning' size='lg' style={{ color: 'white' }}>Buy course @{course.price} Rs</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
    )
}

export default CourseDetails