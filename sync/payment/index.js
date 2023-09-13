const express = require('express');
const app = express();
app.use(express.json());

app.post('/pay', (req, res) => {
    console.log("Payment received:", req.body);
    res.send(req.body);
});

const PORT = process.env.PORT || 5502;
app.listen(PORT, () => {
  console.log(`Payment service listening on port ${PORT}...`);
});