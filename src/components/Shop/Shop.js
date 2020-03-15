import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    //console.log(fakeData)
    const firstTen = fakeData.slice(0, 10);
    const [products, setProduct] = useState(firstTen);
    const [cart, setCart] = useState([]);

    const addProductCount = (product) => {
        //console.log(product);
        const newCart = [...cart, product];
        setCart(newCart)
    }
    return (
        <div className="shop-container">
            <div className="product-container">

                {products.map(x =>
                    <Product product={x} addProductCount={addProductCount} showAddToCart={true}></Product>)}

            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;