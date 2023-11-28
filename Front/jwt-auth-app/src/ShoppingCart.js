import React from 'react';

const ShoppingCart = ({ items }) => {
    return (
        <div>
            <h2>Shopping Cart</h2>
            <ul>
                {items && items.length > 0 ? (
                    items.map(item => (
                        <li key={item.id}>
                            {item.name} - ${item.price} - Quantity: {item.quantity}
                        </li>
                    ))
                ) : (
                    <p>Your cart is empty</p>
                )}
            </ul>
        </div>
    );
};

export default ShoppingCart;
