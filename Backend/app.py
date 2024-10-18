from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# Database configuration
db_config = {
    'user': 'root',
    'password': 'nirmal2002',  # Update with your MySQL password
    'host': 'localhost',
    'database': 'dbname'  # Replace with your actual database name
}

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    id = data.get('id')
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    photo = data.get('photo')

    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM user WHERE email = %s", (email,))
    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        connection.close()
        return jsonify({"message": "Email already exists."}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    cursor.execute("INSERT INTO user (id, name, email, password, photo) VALUES (%s, %s, %s, %s, %s)",
                   (id, name, email, hashed_password, photo))
    connection.commit()
    cursor.close()
    connection.close()
    
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM user WHERE email = %s", (email,))
    user = cursor.fetchone()

    if user and bcrypt.check_password_hash(user[3], password):  # Assuming password is the 4th column
        cursor.close()
        connection.close()
        return jsonify({"message": "Login successful", "user": {"id": user[0], "name": user[1], "email": user[2], "photo": user[4]}}), 200
    
    cursor.close()
    connection.close()
    return jsonify({"message": "Incorrect email or password."}), 401

@app.route('/api/dashboard', methods=['GET'])
def dashboard():
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    cursor.execute("SELECT id, name, email, photo FROM user")
    users = cursor.fetchall()
    cursor.close()
    connection.close()

    user_list = [{"id": user[0], "name": user[1], "email": user[2], "photo": user[3]} for user in users]
    return jsonify(user_list), 200

@app.route("/", methods=['GET'])
def home():
    return "Hello Flask", 200

if __name__ == '__main__':
    app.run(port=5000)
