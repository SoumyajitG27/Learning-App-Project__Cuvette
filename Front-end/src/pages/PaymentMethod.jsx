import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { Store } from '../Store'


const PaymentMethod = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        courseStore: { paymentMethod }
    } = state

    const [paymentMethodName, setPaymentMethod] = useState(
        paymentMethod || 'Stripe'
    )

    // const {user} = useContext(UserAuth)

    //     useEffect(() => {
    //         if(!user){
    //             navigate('/login')
    //         }
    //     }, [user, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
        localStorage.setItem('paymentMethod', paymentMethodName)
        navigate('/placeorder')
    }

    return (
        <div className='container small-container'>
            <h1 className='my-3'>Choose Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <div className='mb-3'>
                    <Form.Check
                        type='radio'
                        id='Paytm'
                        label='Paytm'
                        value='Paytm'
                        checked={paymentMethodName === 'Paytm'}
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
            </Form>
        </div>
    )
}

export default PaymentMethod