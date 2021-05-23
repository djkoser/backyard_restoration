/* eslint-disable no-undef */
const crypto = require("crypto");
const { GMAIL_ADDRESS, GMAIL_PASSWORD } = process.env;
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

module.exports = {
  resetPwdEmail: async (req, res) => {
    const db = req.app.get("db");
    if (req.body.email === "") {
      res.sendStatus(400);
    } else {
      const rtvdCreds = await db.user.getUserCredentials(req.body.email.toLowerCase().replace(/\s/g, ""));
      if (rtvdCreds.length > 0) {
        let expDate = new Date(Date.now() + (1000 * 60 * 60 * 24));
        const token = crypto.randomBytes(16).toString("hex");
        db.updateUser.pwdReset(rtvdCreds[0].user_id, token, expDate);

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: `${GMAIL_ADDRESS}`,
            pass: `${GMAIL_PASSWORD}`
          }
        });

        const mailOptions = {
          from: "${GMAIL_ADDRESS]",
          to: `${rtvdCreds[0].email}`,
          subject: "Password Reset",
          html:
            `<h1 style='font-size: 18pt'>Hello,<h1>
          <main>
            <p  style='font-size: 14pt'>You, or someone with access to your account, has requested a password reset with BackyardRestoration.net.</p>            
            <p  style='font-size: 14pt'>If this request was not made by you, please reset your password immediately using the "Reset Password" link on our login page.</p>
            <p  style='font-size: 14pt'>Otherwise, please click on the following link within 24 hours to reset your password.</p>
          </main>
          <a href="https://backyardrestoration.net/#/resetPassword/${token}"> Reset Password </a>`
        };

        transporter.sendMail(mailOptions, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            res.sendStatus(200);
          }
        });
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    }
  },
  processReset: async (req, res) => {
    const db = req.app.get("db");
    if (req.params.token) {
      const userCreds = await db.updateUser.getCredsByResetToken(req.params.token);
      if (userCreds.length > 0) {
        if (userCreds[0].reset_password_expiration.getTime() >= Date.now()) {
          const { newPassword } = req.body;
          try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(newPassword, salt);
            await db.updateUser.chgUserPassword(userCreds[0].user_id, hash);
            req.session.user = { ...userCreds[0] };
            await db.updateUser.removeResetToken(userCreds[0].user_id);
            res.status(200).send(req.session.user);
          } catch (err) { console.log(err); }
        } else {
          res.sendStatus(403);
        }
      }
    }
  }
};
