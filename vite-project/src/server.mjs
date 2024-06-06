import express from 'express';

const appy = express();

appy.use(express.json());

const PORT = process.env.PORT || 5000;

const accountSid = 'ACc07fc37ddf39ef776d8fba52e2edbc51';
const authToken = '636168dd514b2414725d0ff29f52c266';
import twilio from 'twilio';
import cors from 'cors';

const client = twilio(accountSid, authToken);

appy.use(cors());

appy.get('/test', (req, res) => {
  res.send('Server is working');
});

appy.post('/send-message', (req, res) => {
  const { body, from, to ,sendAt , scheduleType , messagingServiceSid } = req.body;
  
  client.messages
      .create({
          body,
          from,
          sendAt,
          scheduleType,
          messagingServiceSid,
          to
      })
      .then(message => res.status(200).json({ sid: message.sid }))
      
});
    
appy.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});