import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    //console.log(fakeData)
    const firstTen = fakeData.slice(0, 10);
    const [products, setProduct] = useState(firstTen);
    const [cart, setCart] = useState([]);

    const addProductCount = (product) => {
        //console.log(product);
        const newCart = [...cart, product];
        setCart(newCart)
        const sameProduct = newCart.filter(x => x.key === product.key);
        const count = sameProduct.length;
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className="shop-container">
            <div className="product-container">

                {products.map(x =>
                    <Product product={x} addProductCount={addProductCount} showAddToCart={true} key={x.key}></Product>)}

            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;