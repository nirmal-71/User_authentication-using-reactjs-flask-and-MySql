# User_authentication-using-reactjs-flask-and-MySql

This application provides a full-stack user authentication system, allowing users to register, log in, and view their personal dashboard. It consists of a backend built with Flask and a frontend developed using React.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Overview

The application consists of a backend API that handles user registration, login, and data retrieval, and a frontend interface where users can interact with these features.

## Features

- User registration with validation
- Secure login with hashed passwords
- User dashboard displaying personal information
- JWT token-based authentication
- Responsive and user-friendly interface

## Installation

### Prerequisites

- Python 3.x
- Node.js and npm
- MySQL

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nirmal-71/user-auth-system.git
   cd user-auth-system
   ```

2. **Backend Setup:**
   - Navigate to the backend folder
   - Create a virtual environment and activate it
   - Install the necessary Python packages:
     ```bash
     pip install -r requirements.txt
     ```
   - Set up environment variables (e.g., database URI, secret key)

3. **Run the backend:**
   ```bash
   python app.py
   ```

4. **Frontend Setup:**
   - Navigate to the frontend folder
   - Install the dependencies:
     ```bash
     npm install express cors body-parser mysql2 bcrypt nodemon
     ```
   - Run the frontend application:
     ```bash
     npm start
     ```

## Usage

1. Open the application in a web browser at `http://localhost:3000`.
2. Use the registration form to create a new user account.
3. Log in using the registered credentials.
4. After logging in, you'll be redirected to the dashboard displaying your information.
5. Use the logout button to end your session.

## API Endpoints

- **POST** `/api/register` - Register a new user
- **POST** `/api/login` - Log in a user
- **GET** `/api/dashboard` - Retrieve user data (requires authentication)

## Components

### Main Application (`App.js`)
- Manages routing and overall application state
- Handles user authentication status

### Registration Component (`Register.js`)
- Allows users to enter their details for registration
- Validates input and communicates with the backend for registration

### Login Component (`Login.js`)
- Users input their email and password to log in
- Handles login validation and stores the JWT token

### Dashboard Component (`Dashboard.js`)
- Displays user information after a successful login
- Provides a logout button to end the session

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
