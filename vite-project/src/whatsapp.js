import twilio from 'twilio';

const accountSid = 'ACc07fc37ddf39ef776d8fba52e2edbc51'; // Your Account SID from www.twilio.com/console
const authToken = '9e8fe472e1888b98f534c932b461d938';   // Your Auth Token from www.twilio.com/console

const client = twilio(accountSid, authToken);

export const sendWhatsAppMessage = async (to, message) => {
  try {
    const messageResponse = await client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // Your Twilio sandbox WhatsApp number
      to: `whatsapp:${+917347336055}` // The destination WhatsApp number
    });
    console.log('Message sent:', messageResponse.sid);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};


