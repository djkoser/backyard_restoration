const bcrypt = require("bcryptjs");
const { getGrowingParams } = require("../growingCalculations.js");
module.exports = {
  newUser: async (req, res) => {

    const { email, password, first_name, last_name, street, city, state, zipcode } = req.body;
    const db = req.app.get('db');
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const { hardinessZone, firstGDD35, averageSeasonLength } = await getGrowingParams(zipcode, street, city, state, db);

      db.user.newUser(email, first_name, last_name, street, city, state, zipcode, hash, averageSeasonLength, firstGDD35, hardinessZone)
    } catch (err) {
      return res.sendStatus(500)
    }
  },
  login: async (req, res) => {
    const db = req.app.get('db')
  },
  logout: async (req, res) => {

  },
  getInfo: async (req, res) => {
    const db = req.app.get('db')
  }
};

