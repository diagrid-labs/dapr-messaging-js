const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PUBSUB_COMPONENT = process.env.PUBSUB_COMPONENT || "studentpubsub";
const PUBSUB_TOPIC = process.env.PUBSUB_TOPIC || "newstudents";

app.use(bodyParser.json({ type: 'application/*+json' }));

app.get('/dapr/subscribe', (_req, res) => {
  res.json([
    { 
      pubsubname: PUBSUB_COMPONENT,
      topic: PUBSUB_TOPIC,
      route: "pay"
    }
  ]);
});

app.post('/pay', (req, res) => {
  console.log("Payment received:", req.body.data);
  const payload = JSON.parse(req.body.data);
  if (payload.email === "") {
      res.sendStatus(400);
  }
  else {
    res.sendStatus(204);
  }
});

app.post('/invalid', (req, res) => {
  console.log("Invalid message received:", req.body.data);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 5512;
app.listen(PORT, () => {
  console.log(`Payment service listening on port ${PORT}...`);
});