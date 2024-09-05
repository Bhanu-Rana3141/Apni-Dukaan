const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// POST request to /contact
router.post('/', (req, res) => {
    const { name, email, phone, description } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !description) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new message object
    const newMessage = { name, email, phone, description, date: new Date().toISOString() };

    // Define file path
    const filePath = path.join(__dirname, '../userMessages.json');

    // Read the current data from the file (or create an empty array if the file doesn't exist)
    fs.readFile(filePath, 'utf-8', (err, data) => {
        let messages = [];
        if (!err && data) {
            messages = JSON.parse(data); // Parse the existing data if the file exists
        }

        // Add the new message to the array
        messages.push(newMessage);

        // Write the updated messages array back to the file
        fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).json({ message: 'Failed to store message.' });
            }
            res.status(200).json({ message: 'Your message has been stored successfully!' });
        });
    });
});

module.exports = router;
