import React, { useContext } from 'react'
import { Button, Toast } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import NavbarCart from '../components/NavbarCart';
import { UserAuth } from '../context/AuthContext';
import { Store } from '../Store'

const Dashboard = () => {
    const { state } = useContext(Store);
    const { courseStore } = state;

    return (
        <div>
            <NavbarCart />
            {courseStore.storeItems.length > 0 &&
                (<h1>{courseStore.storeItems.length}</h1>)}
            <Link to='/courses'><Button variant='warning'>Browse Courses</Button></Link>
        </div>
    )
}

export default Dashboard