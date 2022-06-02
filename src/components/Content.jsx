import React from 'react'
import styled from 'styled-components'
import pic from "../Images/image_c.png"
import { Button } from 'react-bootstrap'

const Container = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    background-color: #e0d918;
    justify-content: center;
    align-items: center;
    position: relative;
`
const Image = styled.img`
    height: 70%;
    justify-content: center;  
    position: absolute;
    left: 200px;
`
const BtnContainer = styled.div`
    flex: 1;
    justify-content: flex-end;
    position: absolute;
    right: 200px;
`

const Content = () => {
  return (
    <Container>
        <Image src={pic} />
        <BtnContainer>
            <Button type="submit" variant="outline-dark" size="lg">
                Browse Courses
            </Button>
        </BtnContainer>
    </Container>
  )
}

export default Content