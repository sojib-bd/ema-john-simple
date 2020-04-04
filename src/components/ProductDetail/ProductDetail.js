import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Product from '../Product/Product';
import { useEffect } from 'react';

const ProductDetail = () => {
    const { productKey } = useParams()
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4200/product/' + productKey)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [productKey])

    return (
        <div>
            <h1>Chosen product Details.</h1>
            {product && <Product product={product} showAddToCart={false}></Product>}
        </div>
    );
};

export default ProductDetail;