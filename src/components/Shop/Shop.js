import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    //console.log(fakeData)
    const firstTen = fakeData.slice(0, 10);
    const [products, setProduct] = useState(firstTen);
    const [cart, setCart] = useState([]);

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