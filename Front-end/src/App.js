import './App.css';
import Home from './pages/Home';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp'; import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails'
import Cart from './pages/Cart';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/courses/:slug' element={<CourseDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
