import React, { useContext } from 'react'
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { UserAuth } from '../context/AuthContext'

const NavbarCart = () => {
  const { state } = useContext(Store);
  const { courseStore } = state;
  const { user, logOut } = useContext(UserAuth)
  const navigate = useNavigate()

  const handleLogOut = async (e) => {
    e.preventDefault()
    try {
      await logOut()
      localStorage.removeItem('userInfo')
      navigate('/')
    }
    catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div>
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/dashboard">
              <Navbar.Brand>E-Learn</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/cart" className='nav-link'>
                <div>
                  <ShoppingCartOutlinedIcon />
                  {/* Cart */}
                  {
                    courseStore.storeItems.length > 0 && (
                      <Badge pill bg="warning">
                        {courseStore.storeItems.length}
                      </Badge>
                    )}
                </div>
              </Link>
              <NavDropdown title={user.email} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/yourcourses">
                  <NavDropdown.Item>Purchased Courses</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
            <Nav className="ml-auto">
              <Link to="#signout" className='nav-link' onClick={handleLogOut}>
                Logout
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
    </div>
  )
}

export default NavbarCart