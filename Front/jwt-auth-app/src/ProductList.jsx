import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ cart, setCart }) => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/products/', {
                    params: { category: selectedCategory },
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    const handleBuy = (product) => {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            const updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    return (
        <div>
            <h2>Product List</h2>
            <div>
                <button onClick={() => setSelectedCategory(null)}>All Products</button>
                <button onClick={() => setSelectedCategory(1)}>Category 1</button>
                <button onClick={() => setSelectedCategory(2)}>Category 2</button>
                {/* Add more buttons for other categories as needed */}
            </div>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => handleBuy(product)}>Buy</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
