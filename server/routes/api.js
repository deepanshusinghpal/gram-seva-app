// server/routes/api.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// --- Public Routes ---
// (Services, Products, News, Contact routes are correct and remain unchanged)

router.get('/services', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM services');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/products', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM products ORDER BY product_id ASC');
        const productsWithFullUrls = result.rows.map(product => {
            if (product.image_url && !product.image_url.startsWith('http')) {
                return {
                    ...product,
                    image_url: `http://localhost:5000/images/${product.image_url}`
                };
            }
            return product;
        });
        res.json(productsWithFullUrls);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/news', (req, res) => {
    const news = [
        { id: 1, headline: "New Government Scheme Launched for Farmers in Andhra Pradesh" },
        { id: 2, headline: "Local Health Camp in Kurnool to be Organized Next Sunday" },
        { id: 3, headline: "Digital Literacy Program Sees High Turnout in Rural Areas" }
    ];
    res.json(news);
});

router.post('/contact', async (req, res) => {
    const { name, message } = req.body;
    try {
        await db.query("INSERT INTO contact_submissions (name, message) VALUES ($1, $2)", [name, message]);
        res.status(201).json({ success: "Message received!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --- Authentication Routes ---
// (Register and Login routes are correct and remain unchanged)

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        const newUser = await db.query(
            "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, username",
            [username, email, password_hash]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error("REGISTRATION FAILED:", err.message);
        res.status(500).json({ error: "Email or Username already exists." });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userResult.rows.length === 0) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const payload = { user: { id: user.user_id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --- Protected Routes ---

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const result = await db.query("SELECT user_id, username, email, phone_number FROM users WHERE user_id = $1", [req.user.id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// This is the old route, not used by the cart, but we fix it for consistency.
router.post('/bookings', verifyToken, async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const result = await db.query(
            "INSERT INTO bookings (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
            [req.user.id, productId, quantity]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ▼▼▼ THIS IS THE CORRECTED DASHBOARD FETCH LOGIC ▼▼▼
router.get('/bookings', verifyToken, async (req, res) => {
    try {
        // We now correctly name the result object
        const result = await db.query(
            `SELECT b.booking_id, p.product_name, p.price, b.quantity, b.status, b.booking_date 
             FROM bookings b
             JOIN products p ON b.product_id = p.product_id
             WHERE b.user_id = $1
             ORDER BY b.booking_date DESC`,
            [req.user.id]
        );
        // And we send the .rows property
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ▼▼▼ THE CHECKOUT ROUTE IS CORRECT, NO CHANGES NEEDED HERE ▼▼▼
router.post('/checkout', verifyToken, async (req, res) => {
    const cartItems = req.body;
    const userId = req.user.id;

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
    }
    const client = await db.connect();
    try {
        await client.query('BEGIN');
        const bookingPromises = cartItems.map(item => {
            const queryText = 'INSERT INTO bookings (user_id, product_id, quantity) VALUES ($1, $2, $3)';
            const queryValues = [userId, item.product_id, item.quantity];
            return client.query(queryText, queryValues);
        });
        await Promise.all(bookingPromises);
        await client.query('COMMIT');
        res.status(201).json({ success: 'Checkout successful, bookings created.' });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Checkout Error:', err);
        res.status(500).json({ error: 'Server error during checkout.' });
    } finally {
        client.release();
    }
});

module.exports = router;