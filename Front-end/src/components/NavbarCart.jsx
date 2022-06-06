import React, { useContext } from 'react'
import { Badge, Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Store } from '../Store'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const NavbarCart = () => {
  const { state } = useContext(Store);
  const { courseStore } = state;
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
            </Nav>
            <Nav className="ml-auto">
              <Link to="/cart" className='nav-link'>
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