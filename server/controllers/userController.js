/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const bcrypt = require("bcryptjs");
const { getGrowingParams } = require("../growingCalculations.js");

module.exports = {
  newUser: async (req, res) => {
    const { email, password, first_name, last_name, street, city, state, zipcode } = req.body;
    const emailFiltered = email.toLowerCase().replace(/\s/g, "");
    const db = req.app.get("db");
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const storedUser = await db.user.getUserCredentials(emailFiltered);
      if (storedUser.length === 0) {
        try {
          const { hardiness_zone, first_gdd35, last_gdd35, growing_season_length } = await getGrowingParams(zipcode, street, city, state, db);
          const user_id = await db.user.newUser(emailFiltered, first_name, last_name, street, city, state, zipcode, hash, growing_season_length, first_gdd35, last_gdd35, hardiness_zone);
          const newUser = { user_id: user_id[0].user_id, email: emailFiltered, first_name, last_name, street, city, state, zipcode, growing_season_length, first_gdd35, last_gdd35, hardiness_zone };
          req.session.user = newUser;
          return res.status(200).send(newUser);
        } catch (err) {
          const user_id = await db.user.newUser(emailFiltered, first_name, last_name, street, city, state, zipcode, null, null, null, null);
          const newUser = { user_id: user_id[0].user_id, email: emailFiltered, first_name, last_name, street, city, state, zipcode, growing_season_length: null, first_gdd35: null, last_gdd35: null, hardiness_zone: null };
          req.session.user = newUser;
          return res.status(400).send("Manual Entry");
        }
      } else {
        return res.sendStatus(403);
      }
    } catch (err) { console.log(err); }
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    const emailFiltered = email.toLowerCase().replace(/\s/g, "");
    try {
      const storedUser = await db.user.getUserCredentials(emailFiltered);
      const hash = await db.user.getUserHash(emailFiltered);
      if (storedUser.length !== 0) {
        if (await bcrypt.compare(password, hash[0].hash)) {
          req.session.user = storedUser[0];
          return res.status(200).send(req.session.user);
        } else {
          req.session.destroy();
          return res.sendStatus(401);
        }
      } else { return res.sendStatus(404); }
    } catch (err) { console.log(err); }
  },

  logout: async (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
  },

  getInfo: async (req, res) => {
    res.status(200).send(req.session.user);
  }
};

