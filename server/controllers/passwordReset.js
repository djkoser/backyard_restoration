/* eslint-disable no-undef */
const crypto = require('crypto');
const { GMAIL_ADDRESS, GMAIL_PASSWORD } = process.env;
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../../utilities/sendEmail');

module.exports = {
  resetPwdEmail: async (req, res) => {
    const db = req.app.get('db');
    if (req.body.email === '') {
      res.sendStatus(400);
    } else {
      const rtvdCreds = await db.user.getUserCredentials(
        req.body.email.toLowerCase().replace(/\s/g, '')
      );
      if (rtvdCreds.length > 0) {
        let expDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
        const token = crypto.randomBytes(16).toString('hex');
        db.updateUser.pwdReset(rtvdCreds[0].user_id, token, expDate);
        console.log(rtvdCreds);
        // Will send the appropriate response directly from this function
        await sendEmail(
          rtvdCreds[0].email,
          token,
          GMAIL_ADDRESS,
          GMAIL_PASSWORD,
          res
        );
      } else {
        res.sendStatus(400);
      }
    }
  },
  processReset: async (req, res) => {
    const db = req.app.get('db');
    if (req.params.token) {
      const userCreds = await db.updateUser.getCredsByResetToken(
        req.params.token
      );
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
          } catch (err) {
            console.log(err);
          }
        } else {
          res.sendStatus(403);
        }
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  }
};
