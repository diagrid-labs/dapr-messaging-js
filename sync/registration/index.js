const DAPR_HOST = process.env.DAPR_HOST || "http://localhost";
const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT || "3501";

const express = require('express');
const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
  const registrationMessage = `Registration received for ${req.body.name}`
  console.log(registrationMessage);
  const paymentData = { "email": req.body.email, "cost": req.body.cost };
  const response = await fetch(`${DAPR_HOST}:${DAPR_HTTP_PORT}/pay`, {
    method: "POST",
    body: JSON.stringify(paymentData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "dapr-app-id": "payment"}
  });
  if (!response.ok) {
    console.error(`Error calling payment service: ${response.status} ${response.statusText}`);
    res.sendStatus(response.status);
  } else {
    res.send(registrationMessage);
  }
});

const PORT = process.env.PORT || 5501;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});