const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFilePath = path.join(__dirname, '../data/users.json');

// Ensure the users.json file exists
const ensureUsersFile = () => {
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, JSON.stringify([]));
    }
};

// Register route
router.post('/register', (req, res) => {
    ensureUsersFile();
    const { name, email, password, phone } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = { id: users.length + 1, name, email, password, phone};
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users));
    res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', (req, res) => {
    ensureUsersFile();
    const { email, password } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
});

// Logout route
router.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;