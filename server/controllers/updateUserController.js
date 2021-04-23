const bcrypt = require("bcryptjs");

const { getGrowingParams } = require('../growingCalculations');
module.exports = {
  chgUserAddress: async (req, res) => {
    const db = req.app.get('db')
    const { street, city, state, zipcode } = req.body;
    const user_id = req.session.user.user_id;
    try {
      const { hardiness_zone, first_gdd35, last_gdd35, growing_season_length } = await getGrowingParams(zipcode, street, city, state, db);
      await db.updateUser.chgUserAddress(user_id, street, city, state, zipcode, growing_season_length, first_gdd35, last_gdd35, hardiness_zone);
      req.session.user = { ...req.session.user, street, city, state, zipcode, growing_season_length, first_gdd35, last_gdd35, hardiness_zone };
      res.status(200).send(req.session.user);
    } catch (err) { console.log(err) }
  },
  chgUserEmail: async (req, res) => {
    const db = req.app.get('db')
    const { email } = req.body;
    const storedUser = await db.user.getUserCredentials(email.toLowerCase());
    if (!storedUser.length) {
      const user_id = req.session.user.user_id;
      try {
        await db.updateUser.chgUserEmail(user_id, email);
        req.session.user = { ...req.session.user, email };
        res.status(200).send(req.session.user);
      } catch (err) { console.log(err) }
    } else {
      res.sendStatus(403);
    }
  },
  chgUserPassword: async (req, res) => {
    const db = req.app.get('db')
    const { password } = req.body;
    const user_id = req.session.user.user_id;
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      await db.updateUser.chgUserPassword(user_id, hash);
      req.session.user = { ...req.session.user, hash };
      res.status(200).send(req.session.user);
    } catch (err) { console.log(err) }
  },
  chgUserName: async (req, res) => {
    const db = req.app.get('db')
    const { first_name, last_name } = req.body;
    const user_id = req.session.user.user_id;
    try {
      await db.updateUser.chgUserName(user_id, first_name, last_name);
      req.session.user = { ...req.session.user, first_name, last_name };
      res.status(200).send(req.session.user);
    } catch (err) { console.log(err) }
  }
}