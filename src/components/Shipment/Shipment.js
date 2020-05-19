import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useAuth } from '../useAuth';
import { getDatabaseCart, processOrder, clearLocalShoppingCart } from '../../utilities/databaseManager';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';


const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const [shipInfo, setShipInfo] = useState(null);
    const [orderId, setOrderId] = useState(null);

    const auth = useAuth();

    const stripePromise = loadStripe('pk_test_U73DpHC24PS8PO907MQIyFYc00E1Ihg7Gg');

    const onSubmit = data => {
        setShipInfo(data);
    }

    const handlePlaceOrder = (payment) => {
        const savedCart = getDatabaseCart();
        const orderDetails = {
            email: auth.user.email,
            cart: savedCart,
            shipment: shipInfo,
            payment: payment
        };
        fetch('https://serene-reaches-66590.herokuapp.com/placeOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(order => {
                setOrderId(order._id);
                clearLocalShoppingCart()
            })
    }
    return (
        <div >
            <div style={{ display: shipInfo && 'none' }}>
                < form className="ship-form" onSubmit={handleSubmit(onSubmit)} >
                    {< input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="name" />}
                    {errors.name && <span className="error">Name is required</span>}
                    {< input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="email" />}
                    {errors.email && <span className="error">Email is required</span>}
                    < input name="addressLine1" ref={register({ required: true })} placeholder="addressLine1" />
                    {errors.addressLine1 && <span className="error">AddressLine1 is required</span>}
                    < input name="addressLine2" ref={register} placeholder="addressLine2" />
                    < input name="city" ref={register({ required: true })} placeholder="city" />
                    {errors.city && <span className="error">City is required</span>}
                    < input name="country" ref={register({ required: true })} placeholder="country" />
                    {errors.country && <span className="error">Country is required</span>}
                    < input name="zipCode" ref={register({ required: true })} placeholder="Zip code" />
                    {errors.zipCode && <span className="error">Zip code is required</span>}

                    <input type="submit" />
                </form >
            </div>
            <div style={{ marginTop: '200px', display: shipInfo ? 'block' : 'none' }} >


                <Elements stripe={stripePromise}>
                    <CheckoutForm handlePlaceOrder={handlePlaceOrder} />
                </Elements>
                {
                    orderId && <div>
                        <h3>Thank you for shopping with us</h3>
                        <p>Your order id is: {orderId}</p>
                    </div>
                }

            </div>
        </div>
    )
};

export default Shipment;