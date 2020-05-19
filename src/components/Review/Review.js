import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, } from '../../utilities/databaseManager';

import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';

import { useAuth } from '../useAuth';
const Review = (props) => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);


    const removeProduct = (productKey) => {
        const newCart = cart.filter(x => x.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    const auth = useAuth()



    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart);

        fetch('https://serene-reaches-66590.herokuapp.com/getProductByKey', {
            method: 'POST',
            body: JSON.stringify(productKey),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(data => {

                const cartProducts = productKey.map(key => {
                    const product = data.find(y => y.key === key);
                    product.quantity = saveCart[key];
                    return product;
                })
                setCart(cartProducts);
            })
    }, [])


    return (
        <div className="shop-container">


            <div className="product-container">

                {
                    cart.map(x => <ReviewItem
                        key={x.key}
                        product={x}
                        removeProduct={removeProduct}
                    ></ReviewItem>)
                }

                {
                    !cart.length && <p>Your cart is empty.<a href="/shop"> keep shopping</a></p>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/shipment'>
                        {
                            auth.user ? <button className='call-to-action'>Process shipment</button> :
                                <button className='call-to-action'>Login to order</button>
                        }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;