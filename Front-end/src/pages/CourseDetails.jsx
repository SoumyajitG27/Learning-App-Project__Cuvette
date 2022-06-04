import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'

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


const CourseDetails = () => {
    const params = useParams();
    const { slug } = params;

    const [{ loading, error, course }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        courses: []
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
        <div>
            <h1>{slug}</h1>
        </div>
    )
}

export default CourseDetails