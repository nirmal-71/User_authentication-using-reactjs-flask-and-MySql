import React from 'react';

function Dashboard({ user, onLogout }) {
    return (
        <div>
            <h2>Dashboard</h2>
            <h3>Welcome, {user.name}!</h3>
            <h4>email:{user.email}</h4>
            {user.photo && (
                <div>
                    
    
                    <img src={user.photo} alt={user.name} style={{ width: '500px', height: '500px' }} />
                </div>
            )}
            <button onClick={onLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;
