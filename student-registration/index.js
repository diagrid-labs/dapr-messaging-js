const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from NodeJS!');
});

app.post('/register', (req, res) => {
    console.log("Registration received:", req.body);
    res.send(req.body);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});