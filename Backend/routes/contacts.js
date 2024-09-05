const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/', (req, res) => {
    const { name, email, phone, description } = req.body;

    const newMessage = { name, email, phone, description};

    const filePath = path.join(__dirname, '../userMessages.json');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        let messages = [];
        if (!err && data) {
            messages = JSON.parse(data); 
        }

        messages.push(newMessage);

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
