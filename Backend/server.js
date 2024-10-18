const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Database connection pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'nirmal2002', // Update this with your MySQL password
    database: 'dbname' // Replace 'dbname' with your actual database name
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/register', async (req, res) => {
    const { id, name, email, password, photo } = req.body;

    try {
        
        const sqlEmailCheck = "SELECT * FROM user WHERE email = ?";
        db.query(sqlEmailCheck, [email], async (error, results) => {
            if (error) {
                console.error("Error checking email:", error);
                return res.status(500).send("An error occurred while checking email.");
            }
            if (results.length > 0) {
                return res.status(409).send("Email already exists.");
            }

            // Hash the password for secure storage
            const hashedPassword = await bcrypt.hash(password, 10);

            
            const sqlInsert = "INSERT INTO user (id, name, email, password, photo) VALUES (?, ?, ?, ?, ?)";
            db.query(sqlInsert, [id, name, email, hashedPassword, photo], (error, result) => {
                if (error) {
                    console.error("Error registering user:", error);
                    return res.status(500).send("An error occurred while registering user.");
                }
                res.status(201).send("User registered successfully");
            });
        });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).send("An error occurred while processing your request.");
    }
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const sqlSearch = "SELECT * FROM user WHERE email = ?";
    db.query(sqlSearch, [email], async (error, result) => {
        if (error) {
            console.error("Error during login:", error);
            return res.status(500).send("An error occurred while logging in.");
        }
        if (result.length > 0) {
            const user = result[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Exclude password from the response
                const { password, ...userData } = user; // Destructure to omit password
                res.status(200).json({ message: "Login successful", user: userData });
            } else {
                res.status(401).send("Incorrect password.");
            }
        } else {
            res.status(404).send("User not found.");
        }
    });
});

// Dashboard endpoint to fetch all registered users' details
app.get('/api/dashboard', (req, res) => {
    const sqlGetUsers = "SELECT id, name, email, photo FROM user"; // Fetch id, name, email, and photo
    db.query(sqlGetUsers, (error, result) => {
        if (error) {
            console.error("Error fetching users:", error);
            return res.status(500).send("An error occurred while fetching users.");
        }
        res.send(result);
    });
});

// Default endpoint
app.get("/", (req, res) => {
    res.send("Hello Express");
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
