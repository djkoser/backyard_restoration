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
        const newUser = { email, first_name, last_name, street, city, state, zipcode, hash, averageSeasonLength, firstGDD35, hardinessZone }
        await db.user.newUser(email, first_name, last_name, street, city, state, zipcode, hash, averageSeasonLength, firstGDD35, hardinessZone);
        req.session.user = newUser;
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
          req.session.user = storedUser[0];
          return res.status(200).send(req.session.user);
        } else {
          req.session.destroy();
          return res.sendStatus(401);
        }
      } else { return res.sendStatus(404) }
    } catch (err) { console.log(err) }
  },

  logout: async (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
  },

  getInfo: async (req, res) => {
    res.status(200).send(req.session.user);
  }
};

