import React from 'react'
import Announcement from '../components/Announcement'
import Content from '../components/Content'
import Navbar from '../components/Navbar'
import Login from './Login'


const Home = () => {
  return (
    <div>
        <Announcement />
        <Navbar />
        <Content />
    </div>
  )
}

export default Home
