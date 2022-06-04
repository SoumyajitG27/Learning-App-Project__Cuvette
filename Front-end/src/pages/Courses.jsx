import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//import courseData from '../Data/courseData'
//import styled from 'styled-components'
import { Button, Carousel, Container } from 'react-bootstrap'
import axios from 'axios'

const Courses = () => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/courses');
            setCourses(result.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <header>
                <Link to="/dashboard">Dashboard</Link>
            </header>
            <main>
                <h1><b>Featured Courses</b></h1>
                <Container style={{ textAlign: 'center' }}>
                    <Carousel style={{ width: '100%' }}>
                        {
                            courses.map((course) => (
                                <Carousel.Item key={course.slug}>
                                    <iframe width="1000" height="550" src={course.video} alt="First slide" />
                                    <Carousel.Caption>
                                        <h3><strong>{course.name}</strong></h3>
                                        <p>{course.description}</p>
                                        <Link to={`/courses/${course.slug}`}>
                                            <Button>Go to course</Button>
                                        </Link>
                                    </Carousel.Caption>
                                </Carousel.Item>))
                        }
                    </Carousel>
                </Container>
            </main>
        </div>
    )
}

export default Courses