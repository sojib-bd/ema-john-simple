import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';

const Review = () => {
    const [cart, setCart] = useState([]);

    const removeProduct = (productKey) => {
        const newCart = cart.filter(x => x.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
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
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Review;