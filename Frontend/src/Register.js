import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Make sure to import your CSS file

function Register({ onRegister }) {
    const [id, setId] = useState(''); // ID state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState('');

    const handleRegister = async () => {
        if (!id || !name || !email || !password || !photo) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/register', {
                id, // Include ID in the request
                name,
                email,
                password,
                photo
            });
            alert('Registration successful! Please log in.');
            onRegister(); // Call onRegister to switch to Login
        } catch (error) {
            // Check if error response exists and handle it gracefully
            if (error.response && error.response.data) {
                alert('Registration failed: ' + error.response.data);
            } else {
                alert('Registration failed: ' + error.message);
            }
        }
    };

    return (
        <div className="register-form">
            <h2>Register</h2>
            <input
                type="text"
                placeholder="ID (unique number)"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
            <input
                type="text"
                placeholder="Photo URL"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
            />
            <button type="button" onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
