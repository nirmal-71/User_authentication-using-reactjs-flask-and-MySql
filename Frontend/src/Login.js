import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Make sure to import your CSS file

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Basic validation for email and password
        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password
            });
            alert('Login successful!');
            onLogin(response.data.user); // Pass the user data to App.js
        } catch (error) {
            // Check if error response exists and handle it gracefully
            if (error.response && error.response.data) {
                alert('Login failed: ' + error.response.data);
            } else {
                alert('Login failed: ' + error.message);
            }
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
