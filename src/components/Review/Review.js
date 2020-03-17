import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import greetingImage from '../../images/giphy.gif';
const Review = (props) => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);


    const removeProduct = (productKey) => {
        const newCart = cart.filter(x => x.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder()
    }

    useEffect(() => {
        const saveCart = getDatabaseCart();
        //console.log(saveCart);
        const productKey = Object.keys(saveCart);
        //console.log(productKey);
        const cartProducts = productKey.map(key => {
            const product = fakeData.find(y => y.key === key);
            product.quantity = saveCart[key];
            return product;
        })
        setCart(cartProducts);
    }, [])

    let greetings;
    if (orderPlaced) {
        greetings = <img src={greetingImage} alt="" />
    }

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
                {greetings}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button onClick={() => handlePlaceOrder()} className='call-to-action'>Place Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;