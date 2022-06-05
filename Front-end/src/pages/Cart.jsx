import React, { useContext } from 'react'
import { Col, Row, Button, ListGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';

const Cart = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        courseStore: { storeItems },
    } = state;

    return (
        <div>
            <h1>Course Cart</h1>
            <Row>
                <Col md={8}>
                    {storeItems.length === 0 ? (
                        <MessageBox>
                            Cart is empty. <Link to="/courses">
                                <Button variant='warning'>Browse Courses</Button>
                            </Link>
                        </MessageBox>
                    ) : (
                        <ListGroup>
                            {storeItems.map((item) =>
                            (<ListGroup.Item keu={item._id}>
                                <Row className='align-items-center'>
                                    <Col md={4}>
                                        <img src="" alt={item.name} className="img-fluid rounded">
                                        </img> {' '}
                                        <Link to={`/courses/${item.slug}`}>{item.name}
                                        </Link>
                                    </Col>
                                    <Col md={3}>
                                        <Button variant="light">
                                            <i className="fas fa-minus-circle"></i>
                                        </Button>{' '}
                                        <span>{item.quantity}</span>{' '}
                                    </Col>
                                    <Col md={3}>Rs {item.price}</Col>
                                    <Col md={2}>
                                        <Button variant="light">
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal ({storeItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                                        items) : Rs{' '}
                                        {storeItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button
                                            type="button"
                                            variant="primary"
                                            disabled={storeItems.length === 0}>
                                            Proceed to Checkout
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Cart