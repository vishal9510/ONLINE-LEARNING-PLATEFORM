const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
// const { getMaxListeners } = require('json2csv/JSON2CSVTransform');

dotenv.config();

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email provider (Gmail, Outlook, etc.)
  auth: {
    user: "vishalsavaliya2912@gmail.com", // Your email
    pass: "vishal@123##", // Your email password or app password
  },
});

// Send reminder email function
const sendReminderEmail = (to, subject, text) => {
  const mailOptions = {
    from: "hevin@gmail.com", // Sender's email
    to, // Recipient's email
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendReminderEmail };
