import React, { useState } from 'react';
import axios from 'axios';

const Checkout = ({ cart, setCart }) => {
    const [address, setAddress] = useState('');

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        const orderEndpoint = 'http://localhost:8000/api/orders/';

        try {
            const orderDetails = cart.map(item => ({
                product: item.id,
                quantity: item.quantity,
                price: item.price,
            }));

            const order = {
                order_details: orderDetails,
                address: address, // Add other fields like address if needed
                total_price: totalPrice, // Include total price in the order
            };

            const response = await axios.post(orderEndpoint, order);

            console.log('Order placed successfully:', response.data);

            setCart([]);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <label>
                Address:
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <button onClick={handleCheckout}>Place Order</button>
        </div>
    );
};

export default Checkout;
