const nodemailer = require('nodemailer');

module.exports = {
  sendEmail: async (emailAddress, token, gmailAddress, gmailPassword, res) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${gmailAddress}`,
        pass: `${gmailPassword}`
      }
    });

    const mailOptions = {
      from: '${gmailAddress]',
      to: `${emailAddress}`,
      subject: 'Password Reset',
      html: `<h1 style='font-size: 18pt'>Hello,<h1>
          <main>
            <p  style='font-size: 14pt'>You, or someone with access to your account, has requested a password reset with BackyardRestoration.net.</p>            
            <p  style='font-size: 14pt'>If this request was not made by you, please reset your password immediately using the "Reset Password" link on our login page.</p>
            <p  style='font-size: 14pt'>Otherwise, please click on the following link within 24 hours to reset your password.</p>
          </main>
          <a href="https://backyardrestoration.net/resetPassword/${token}"> Reset Password </a>`
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('error', err);
        res.sendStatus(500);
      } else {
        console.log('messageid', info.messageId);
        res.sendStatus(200);
      }
    });
  }
};
