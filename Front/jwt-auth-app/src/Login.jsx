import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/token/', {
                username,
                password,
            });

            const token = response.data.access;

            // Store the token in session storage
            sessionStorage.setItem('jwtToken', token);

            // Call the onLogin prop to update the parent component state
            onLogin();
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
