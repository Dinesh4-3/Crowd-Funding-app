const express = require('express');
const cors = require('cors');
const { generateHash } = require('./api/payu');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/generate-hash', generateHash);

app.listen(5000, () => {
  console.log('Server running on port 5000');
}); 