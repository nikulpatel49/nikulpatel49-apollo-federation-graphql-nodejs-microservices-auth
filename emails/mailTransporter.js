require('dotenv').config();

const nodemailer = require("nodemailer");
const mailTransporter = nodemailer.createTransport({ 
  service: process.env.MAIL_HOST, 
  auth: { 
    user: process.env.MAIL_USERNAME, 
    pass: process.env.MAIL_PASSWORD
  } 
});

const sendEmail = async ({to, subject, html}) => {
	return  await mailTransporter.sendMail({
    from: "Shoping App <nikulphp@gmail.com>", 
    to: to,
    subject: subject, 
    text: "", 
    html: html,  
  });
}

module.exports = sendEmail;
