import React, { useState } from 'react';
import Login from './Login';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import AddCategory from './AddCategory';
import ShoppingCart from './ShoppingCart';
import Checkout from './Checkout';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [shoppingCart, setShoppingCart] = useState([]);

    const handleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <p>Welcome, User!</p>
                    <ProductList cart={shoppingCart} setCart={setShoppingCart} />
                    <AddProduct />
                    <AddCategory />
                    <ShoppingCart items={shoppingCart} />
                    <Checkout cart={shoppingCart} setCart={setShoppingCart} />
                </div>
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;