import express from 'express';

const appy = express();

appy.use(express.json());

const PORT = process.env.PORT || 5000;

const accountSid = 'ACc07fc37ddf39ef776d8fba52e2edbc51';
const authToken = '9e8fe472e1888b98f534c932b461d938';
import twilio from 'twilio';
import cors from 'cors';

const client = twilio(accountSid, authToken);

appy.use(cors());

appy.get('/test', (req, res) => {
  res.send('Server is working');
});

appy.post('/send-message', (req, res) => {
  const { body, from, to } = req.body;
  
  client.messages
      .create({
          body,
          from,
          to
      })
      .then(message => res.status(200).json({ sid: message.sid }))
      
});
    
appy.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});