import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
//import courseData from '../Data/courseData'
//import styled from 'styled-components'
import { Button, Carousel, Container, Navbar } from 'react-bootstrap'
import axios from 'axios'
import logger from 'use-reducer-logger'
import { LinkContainer } from 'react-router-bootstrap'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, courses: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

const Courses = () => {
    const [{ loading, error, courses }, dispatch] = useReducer(logger(reducer), {
        loading: true,
        error: '',
        courses: []
    });
    // const [courses, setCourses] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/courses');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
            //setCourses(result.data);
        };
        fetchData();
    }, []);

    return (
        <div className='d-flex flex-column bg-Courses' style={{ minHeight: '100vh' }}>
            <header>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <LinkContainer to="/dashboard">
                            <Navbar.Brand>E-Learn</Navbar.Brand>
                        </LinkContainer>
                    </Container>
                </Navbar>
            </header>
            <main style={{ flex: 1 }}>
                <Container>
                    <h1 className='my-4 text-center' style={{ color: 'white' }}><b>Featured Courses</b></h1>
                    <Container style={{ textAlign: 'center' }}>
                        <Carousel style={{ width: '100%' }}>
                            {
                                loading ? <div>Loading...</div>
                                    :
                                    error ? <div>{error}</div>
                                        :
                                        courses.map((course) => (
                                            <Carousel.Item key={course.slug}>
                                                <iframe width="1000" height="500" src={course.video} alt="First slide" />
                                                <Carousel.Caption>
                                                    <h3><strong>{course.name}</strong></h3>
                                                    <p>{course.description}</p>
                                                    <Link to={`/courses/${course.slug}`}>
                                                        <Button size="lg" variant='warning'><b>Go to course</b></Button>
                                                    </Link>
                                                </Carousel.Caption>
                                            </Carousel.Item>))
                            }
                        </Carousel>
                    </Container>
                </Container>
            </main>
            <footer>
                <div className='text-center'>©2022 All rights reserved</div>
            </footer>
        </div>
    )
}

export default Courses