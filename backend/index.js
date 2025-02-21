const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Enable CORS to allow requests from your Vite frontend
app.use(cors());

// BFHL processing endpoint
app.post('/api/bfhl', (req, res) => {
    console.log('Updated endpoint hit!');
  const { data } = req.body;

  // Validate the incoming data
  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Data should be an array.' });
  }

  // Example processing: separate numbers and alphabets
  const numbers = data.filter(item => /^\d+$/.test(item));
  const alphabets = data.filter(item => /^[a-zA-Z]+$/.test(item));

  // Example: determine the highest alphabet (you can change this logic)
  const highest_alphabet = alphabets.length
    ? [alphabets.sort().reverse()[0]]
    : [];

  // Created a response object
  const response = {
    is_success: true,
    user_id: 'Ridam_Adtiya_Sinha_18062004',
    email: '22BCT10107@cuchd.in',
    roll_number: '22BCT10107',
    numbers,
    alphabets,
    highest_alphabet,
  };

  return res.json(response);
});

// Status endpoint
app.get('/api/bfhl', (req, res) => {
  res.json({ operation_code: 200 });
});

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'client')));

// Fallback to index.html for any route not starting with /api
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
  });

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
