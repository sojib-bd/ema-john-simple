import React, { useState, useEffect } from 'react';

import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {


    const [products, setProduct] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4200/products')
            .then(res => res.json())
            .then(data => {

                setProduct(data)
            })
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if (products.length > 0) {
            const previousCart = productKeys.map(existingKey => {
                const product = products.find(pd => pd.key === existingKey);
                product.quantity = savedCart[existingKey];
                return product;
            })
            setCart(previousCart)
        }
    }, [products])

    const addProductCount = (product) => {
        //console.log(product);

        const sameProduct = cart.find(x => x.key === product.key);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = sameProduct.quantity + 1;
            const others = cart.filter(x => x.key !== product.key);
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }

        setCart(newCart)
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className="shop-container">
            <div className="product-container">

                {products.map(x =>
                    <Product product={x} addProductCount={addProductCount} showAddToCart={true} key={x.key}></Product>)}

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className='call-to-action'>Review Order</button>
                    </Link>

                </Cart>
            </div>
        </div>
    );
};

export default Shop;