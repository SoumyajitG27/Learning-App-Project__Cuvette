import React, { useContext } from 'react'
import { Button, Toast } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { Store } from '../Store'

const Dashboard = () => {
    const { logOut } = useContext(UserAuth)
    const { state } = useContext(Store);
    const { courseStore } = state;
    const navigate = useNavigate()

    const handleLogOut = async (e) => {
        e.preventDefault()
        try {
            await logOut()
            navigate('/')
        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div>
            {courseStore.storeItems.length > 0 &&
                (<h1>{courseStore.storeItems.length}</h1>)}
            <Button onClick={handleLogOut} variant="primary">Logout</Button>
            <Link to='/courses'><Button variant='warning'>Browse Courses</Button></Link>
        </div>
    )
}

export default Dashboard