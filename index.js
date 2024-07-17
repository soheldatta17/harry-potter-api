const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const characters = require('./info'); // Import using require

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Route to handle GET requests at '/'
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Backend Server</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .container {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #666;
                    margin: 10px 0;
                }
                .code {
                    background-color: #f4f4f4;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 10px;
                    font-family: 'Courier New', Courier, monospace;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Sohel's Backend Server</h1>
                <p>In order to search characters use:</p>
                <p class="code">"/search?name=Harry"</p>
                <p>In order to generate all characters use:</p>
                <p class="code">"/characters"</p>
            </div>
        </body>
        </html>
    `);
});


// Route to handle GET requests at '/hello'
app.get('/hello', (req, res) => {
    res.send('You are a noob Mr. Hello World"');
});

// Route to handle GET requests at '/characters'
app.get('/characters', (req, res) => {
    res.json({ characters });
});

// Route to handle GET requests at '/search' with query parameter 'name'
app.get('/search', (req, res) => {
    const nameQuery = req.query.name.toLowerCase();
    const filteredCharacters = characters.filter(character => 
        character.name.toLowerCase().includes(nameQuery)
    );
    res.json({ characters: filteredCharacters });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
