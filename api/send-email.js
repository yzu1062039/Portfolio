import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  const emailData = {
    from: `Portfolio Contact <mailgun@${process.env.MAILGUN_DOMAIN}>`,
    to: [process.env.TO_EMAIL_ADDRESS],
    subject: `New Message from ${name}`,
    text: `You have a new message from your portfolio contact form.\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Message:\n${message}`,
    html: `<h3>New Message from Portfolio</h3>` +
          `<p><strong>Name:</strong> ${name}</p>` +
          `<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>` +
          `<p><strong>Message:</strong></p>` +
          `<p>${message.replace(/\n/g, '<br>')}</p>`,
  };

  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, emailData);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email. Please try again later.' });
  }
} 