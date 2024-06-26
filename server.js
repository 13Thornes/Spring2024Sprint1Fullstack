const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { newToken } = require('./token');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route to handle form submission
app.post('/generate-token', (req, res) => {
    const username = req.body.username;
    const token = newToken(username);

    try {
        res.send(`Generated token for ${username}: ${token}`);
    } catch (error) {
        res.status(500).send('An error occurred while generating the token.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});