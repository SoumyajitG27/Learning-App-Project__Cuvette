import React, { useReducer } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { Store } from '../Store'
import axios from 'axios'
import { auth } from '../firebase'
import Loading from '../components/Loading'
import { onAuthStateChanged } from 'firebase/auth'

const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loading: true }
        case 'CREATE_SUCCESS':
            return { ...state, loading: false }
        case 'CREATE_FAIL':
            return { ...state, loading: false }
        default:
            return state
    }
}

const PaymentMethod = () => {
    const navigate = useNavigate();
    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false
    })
    const { user } = useContext(UserAuth)
    const [errMsg, setErrMsg] = useState("");
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        courseStore: { paymentMethod, storeItems }
    } = state
    const [paymentMethodName, setPaymentMethod] = useState(
        paymentMethod || 'Stripe'
    )
    const itemsPrice = storeItems.reduce((a, c) => a + c.quantity * c.price, 0)
    // const {user} = useContext(UserAuth)

    //     useEffect(() => {
    //         if(!user){
    //             navigate('/login')
    //         }
    //     }, [user, navigate])

    const submitHandler = async (e) => {
        e.preventDefault()
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
        localStorage.setItem('paymentMethod', paymentMethodName)
        // const newToken = user && (await user.getIdToken());
        // setToken(newToken)
        // console.log(token);
        // user.getIdToken().then((token) => {
        //     console.log(token);
        //     setToken(token)
        // }).catch(e)
        // {
        //     console.log(e);
        // }
        setErrMsg("")
        try {
            dispatch({ type: 'CREATE_REQUEST' })
            const token = await user.getIdToken()
            console.log(token);
            const { data } = await axios.post(
                '/api/orders',
                {
                    orderItems: storeItems,
                    paymentMethod: localStorage.getItem('paymentMethod'),
                    itemsPrice: itemsPrice,
                    // user: {}
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            ctxDispatch({ type: 'STORE_CLEAR' });
            dispatch({ type: 'CREATE_SUCCESS' });
            localStorage.removeItem('storeItems');
            navigate(`/order/${data.order._id}`);
        } catch (err) {
            dispatch({ type: 'CREATE_FAIL' })
            setErrMsg(err.message)
        }
    }

    return (
        <div className='container small-container'>
            <h1 className='my-3'>Choose Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <div className='mb-3'>
                    <Form.Check
                        type='radio'
                        id='PayPal'
                        label='PayPal'
                        value='PayPal'
                        checked={paymentMethodName === 'PayPal'}
                        onChange={(e) => setPaymentMethod(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <Form.Check
                        type='radio'
                        id='Stripe'
                        label='Stripe'
                        value='Stripe'
                        checked={paymentMethodName === 'Stripe'}
                        onChange={(e) => setPaymentMethod(e.target.value)} />
                </div>
                <div className="mb-3">
                    <Button type="submit">Continue</Button>
                </div>
                {loading && <Loading></Loading>}
            </Form>
            {errMsg && <Alert variant='danger'>{errMsg}</Alert>}
        </div>
    )
}

export default PaymentMethod