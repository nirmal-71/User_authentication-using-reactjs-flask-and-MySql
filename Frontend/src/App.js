import React, { useState, useEffect } from 'react';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css'; // Import the CSS file for styling

function App() {
    const [isRegistered, setIsRegistered] = useState(false); // Start with login view
    const [user, setUser] = useState(null); // Store user data upon successful login

    useEffect(() => {
        // Check for existing user in local storage
        const existingUser = localStorage.getItem('user');
        if (existingUser) {
            setUser(JSON.parse(existingUser)); // Set the user state if a user is found
        }
    }, []);

    const toggleForm = () => {
        setIsRegistered(!isRegistered);
    };

    const handleLogin = (userData) => {
        setUser(userData); // Store user data when logged in
        console.log('Logged in user:', userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
    };

    const handleLogout = () => {
        setUser(null); // Clear user data on logout
        localStorage.removeItem('user'); // Remove user data from local storage
        console.log('User logged out');
    };

    return (
        <div className="app-container">
            <h1>User Authentication</h1>
            {user ? (
                <Dashboard user={user} onLogout={handleLogout} /> // Show dashboard if user is logged in
            ) : (
                <>
                    <Login onLogin={handleLogin} />
                    <button className="toggle-button" onClick={toggleForm}>
                        {isRegistered ? 'Registered? Go to login page' : 'Not Registered? Go to Register'}
                    </button>
                    {isRegistered && <Register onRegister={toggleForm} />}
                </>
            )}
        </div>
    );
}

export default App;
