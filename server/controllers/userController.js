const bcrypt = require("bcryptjs");
const { getGrowingParams } = require("../growingCalculations.js");

module.exports = {
  newUser: async (req, res) => {
    const { email, password, first_name, last_name, street, city, state, zipcode } = req.body;
    const db = req.app.get('db');
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const storedUser = await db.user.getUserCredentials(email.toLowerCase());
      if (!storedUser.length) {
        // @ts-ignore
        const { hardinessZone, firstGDD35, averageSeasonLength } = await getGrowingParams(zipcode, street, city, state, db);
        const newUser = await db.user.newUser(email, first_name, last_name, street, city, state, zipcode, hash, averageSeasonLength, firstGDD35, hardinessZone);
        req.session.user = newUser[0];
        return res.status(200).send(newUser);
      } else {
        return res.sendStatus(403);
      }
    } catch (err) { console.log(err) }
  },
  login: async (req, res) => {
    const db = req.app.get('db');
    const { email, password } = req.body;
    try {
      const storedUser = await db.user.getUserCredentials(email.toLowerCase());
      if (storedUser.length) {
        if (await bcrypt.compare(password, storedUser[0].hash)) {
          req.session.user = { user_id: storedUser[0].user_id };
          return res.status(200).send(await db.user.getInfo(storedUser[0].user_id));
        } else { return res.sendStatus(401) }
      } else { return res.sendStatus(404) }
    } catch (err) { console.log(err) }
  },

  logout: async (req, res) => {
    req.session.destroy();
    return res.status(200).send('You have been logged out.')
  },

  getInfo: async (req, res) => {
    const db = req.app.get('db');
    try {
      typeof req.session.user === 'object' ? res.status(200).send(await db.user.getInfo(req.session.user.user_id)) : res.sendStatus(403);
    } catch (err) { console.log(err) }
  }
};

