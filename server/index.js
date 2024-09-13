const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Example of a GET route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Example of a POST route
app.post('/data', (req, res) => {
  const { name, age } = req.body;
  res.send(`Received data: Name - ${name}, Age - ${age}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
