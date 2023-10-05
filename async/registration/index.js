const DAPR_HOST = process.env.DAPR_HOST || "http://localhost";
const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT || "3511";
const PUBSUB_COMPONENT = process.env.PUBSUB_COMPONENT || "studentpubsub";
const PUBSUB_TOPIC = process.env.PUBSUB_TOPIC || "newstudents";

const express = require('express');
const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
  const registrationMessage = `Registration received for ${req.body.name}`
  console.log(registrationMessage);
  const paymentData = { "email": req.body.email, "cost": req.body.cost };
  const response = await fetch(`${DAPR_HOST}:${DAPR_HTTP_PORT}/v1.0/publish/${PUBSUB_COMPONENT}/${PUBSUB_TOPIC}`, {
    method: "POST",
    body: JSON.stringify(paymentData),
  });
  if (!response.ok) {
    console.error(`Error publishing message: ${response.status} ${response.statusText}`);
  }
  res.send(registrationMessage);
});

const PORT = process.env.PORT || 5511;
app.listen(PORT, () => {
  console.log(`Registration service listening on port ${PORT}...`);
});