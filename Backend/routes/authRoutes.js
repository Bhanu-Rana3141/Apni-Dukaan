const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../users.json');

// Ensure users.json file exists
const ensureUsersFile = () => {
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, JSON.stringify([]));
    }
};

// Register route
router.post('/register', (req, res) => {
    ensureUsersFile();
    const { name, phone, email, password } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

    // Check if email already exists
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Add new user
    users.push({ name, phone, email, password });
    fs.writeFileSync(usersFilePath, JSON.stringify(users));
    res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', (req, res) => {
    ensureUsersFile();
    const { email, password } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

    // Validate user
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

module.exports = router;
