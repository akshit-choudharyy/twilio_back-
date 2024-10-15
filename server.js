const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Twilio Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Route to send WhatsApp message
app.post('/send-message', (req, res) => {
  const { name, message } = req.body;
 
//   +18777804236
  client.messages
    .create({
      from: 'whatsapp:+14155238886', // This is Twilio's Sandbox number
      to: 'whatsapp:+919027176496',  // Replace with your own WhatsApp number
      body: `Name: ${name}\nMessage: ${message}`
    })
    .then((message) => {
      console.log('Message sent:', message.sid);
      res.status(200).send('Message sent!');
    })
    .catch((err) => {
      console.error('Error sending message:', err);
      res.status(500).send('Failed to send message');
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
