import React, { useContext } from 'react'
import { Store } from '../Store'

const Dashboard = () => {
    const { state } = useContext(Store);
    const { courseStore } = state;
    return (
        <div>
            {courseStore.storeItems.length > 0 &&
                (<h1>{courseStore.storeItems.length}</h1>)}
        </div>
    )
}

export default Dashboard