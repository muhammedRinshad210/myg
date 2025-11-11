const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises; // Use promises for async file operations

const app = express();
const PORT = 3000;

// Middleware to enable CORS and parse JSON bodies
app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Endpoint to get all products
app.get('/api/products', async (req, res) => {
    try {
        const data = await fs.readFile('products.json', 'utf8');
        const products = JSON.parse(data);
        res.json(products);
    } catch (err) {
        console.error('Error reading products.json:', err);
        res.status(500).json({ message: 'Error retrieving products' });
    }
});

// Endpoint for user registration (simplified)
app.post('/api/register', (req, res) => {
    const { fullname, email, password } = req.body;
    // In a real application, you would save this to a database
    // and hash the password.
    // For this example, we'll just simulate a success response.
    console.log(User registered: ${fullname}, ${email});
    res.status(201).json({ message: 'User registered successfully!' });
});

// Endpoint for user login (simplified)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    // In a real application, you would check the database for the user
    // and compare the hashed password.
    // For this example, we'll just check for a hardcoded user.
    if (email === 'test@example.com' && password === 'password123') {
        res.json({ message: 'Login successful!', token: 'fake-jwt-token' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(Server is running at http:localhost:${PORT});
});