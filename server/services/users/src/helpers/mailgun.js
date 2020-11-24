const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({
  apiKey: api_key,
  domain,
});

function sendEmail(data_object) {
  mailgun.messages().send(data_object, (error, body) => {
    if (error) {
      console.log(error);
    } else {
      console.log(body);
    }
  });
}

module.exports = sendEmail;
