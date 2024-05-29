import nodemailer from 'nodemailer';

function sendEmail(distributionConfig, address, title, message) {
  const transport = nodemailer.createTransport({
    service: distributionConfig.service,
    auth: {
      user: distributionConfig.email,
      pass: distributionConfig.password
    }
  });

  const mailOptions = {
    from: `${distributionConfig.email}@${distributionConfig.service}.com`,
    to: address,
    subject: title,
    text: message
  };
  console.log('Sending email');
  console.log(mailOptions);

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Email send: ${info.response}`);
    }
  })
}

export default sendEmail;
