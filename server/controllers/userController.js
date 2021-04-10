const bcrypt = require("bcryptjs");
const { getGrowingParams } = require("../growingCalculations.js");
module.exports = {
  newUser: async (req, res) => {

    const { email, password, first_name, last_name, street, city, state, zipcode } = req.body;
    const db = req.app.get('db');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const { hardinessZone, firstGDD35, averageSeasonLength } = await getGrowingParams(zipcode, street, city, state, db);

    const testFunction = (hardinessZone, firstGDD35, averageSeasonLength) => {
      console.log(hardinessZone)
      console.log(firstGDD35)
      console.log(averageSeasonLength)
    }

    testFunction(hardinessZone, firstGDD35, averageSeasonLength)

    // db.user.newUser(email, first_name, last_name, street, city, state, zipcode, hash, growing_season_length, first_gdd32, hardiness_zone)
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

