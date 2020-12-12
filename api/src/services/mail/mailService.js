const nodemailer = require('nodemailer');
const env = require('../../config/env');

// Email templates
const forgotPasswordTemplate = require('./templates/forgotPassword');
const newAccountTemplate = require('./templates/newAccountTemplate');

exports.getTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.MAIL_USER,
      pass: env.MAIL_PASSWORD,
    },
  });

  return transporter;
};

exports.getEmailSettings = (options) => {
  const { type, email } = options;
  let template;
  let subject = '';

  switch (type) {
    case 'forgotPassword':
      const { resetUrl } = options;
      template = forgotPasswordTemplate({ email, resetUrl });
      subject = 'Reset Password';
      break;
    case 'newAccount':
      template = newAccountTemplate();
      subject = 'New Account';
      break;
    case 'newOrder':
      const { flights, travelers } = options;
      template = newAccountTemplate({ flights, travelers });
      subject = 'Your Next Flight Order';
      break;
    default:
      break;
  }

  const emailSettings = {
    from: env.MAIL_USER,
    to: email,
    subject,
    html: `${template}`,
    amp: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <style amp4email-boilerplate>
        body{visibility:hidden}
        h1, p,a {
          padding: 15px;
        }
        
        a {
          text-decoration: none;
          border-radius: 4px;
          color: #FFF;
          background-color: #b366ff;
          outline: none;
        }
        </style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body>
       ${template}
      </body>
    </html>`,
  };

  return emailSettings;
};
