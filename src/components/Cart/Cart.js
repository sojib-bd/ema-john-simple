import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, product) => total + product.price * product.quantity, 0);

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99
    }
    else if (total > 0) {
        shipping = 12.00
    }

    let tax = Math.round(total / 10);
    let digitFixing = (value) => {
        return value.toFixed(2);
    }
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items ordered: {cart.length}</p>
            <p><small>Items Price: {digitFixing(total)}</small></p>
            <p>Shipping & Handling: {shipping}</p>
            <p>Tax + VAT : {tax}</p>
            <p>Total Price: {digitFixing(total + shipping + tax)}</p>
            <br />
            {props.children}
        </div>
    );
};

export default Cart;