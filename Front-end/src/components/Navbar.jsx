
import { Search } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
height: 70px;
align-items: center;
`
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Left = styled.div`
flex: 1;
display: flex; 
align-items: center;
justify-content: flex-start;
`

const Center = styled.div`
flex: 1;
text-align: center;
`

const Right = styled.div`flex:1;
display: flex;
align-items: center;
justify-content: flex-end
`

const SearchContainer = styled.div`
  border: 0.5px solid lightgrey; 
  display: flex; 
  align-items: center;
  margin-left: 10px;
  padding: 5px;
`

const Logo = styled.h1`
font-weight: bold;`

const Input = styled.input`
  border: none;
`
const MenuItem = styled.div`
  font-size: 14;
  cursor: pointer;
  margin-left: 25px;
`

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input />
            <Search style={{ color: "grey", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>E-Learn</Logo>
        </Center>
        <Right>
          <Link to="/register" style={{textDecoration: 'none', color: 'black'}}>
            <MenuItem>Register</MenuItem>
          </Link>
          <Link to="/login" style={{textDecoration: 'none', color: 'black'}}>
            <MenuItem>Log In</MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar