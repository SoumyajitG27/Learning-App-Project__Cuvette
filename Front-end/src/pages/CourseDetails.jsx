import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { Col, Row, Dropdown, DropdownButton } from 'react-bootstrap';
import { useParams } from 'react-router-dom'

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

    return (
        loading ? <div>Loading...</div>
            : error ? <div>{error}</div>
                : <div>
                    <Row>
                        <Col md={6} sm={12}>
                            {
                                course.sections.map((section) =>
                                (<DropdownButton id="dropdown-basic-button" title={section} variant='info'>
                                    <Dropdown.Item href="#/action-1">SubSection 1</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">SubSection 2</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">SubSection 3</Dropdown.Item>
                                </DropdownButton>))
                            }
                        </Col>
                        <Col md={6} sm={12}></Col>
                    </Row>
                </div>
    )
}

export default CourseDetails