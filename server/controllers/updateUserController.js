// eslint-disable-next-line no-undef
const bcrypt = require("bcryptjs");

// eslint-disable-next-line no-undef
const { getGrowingParams } = require("../growingCalculations");

const growingSeasonLengthCalc = (firstGDD35, lastGDD35) => {
  // normalize to current year
  const currentDate = new Date();
  const firstGDD35Date = new Date(currentDate.getFullYear(), Number.parseInt(firstGDD35.match(/\d\d/)), Number.parseInt(firstGDD35.substring(3, 5).match(/\d\d/)));
  const lastGDD35Date = new Date(currentDate.getFullYear(), Number.parseInt(lastGDD35.match(/\d\d/)), Number.parseInt(lastGDD35.substring(3, 5).match(/\d\d/)));

  // convert to milleseconds
  const millesecondsFirst = firstGDD35Date.getTime();
  const millesecondsLast = lastGDD35Date.getTime();

  // Calculate the difference between start and end dates for each year
  const difference = millesecondsLast - millesecondsFirst;
  // Convert each difference into days
  return difference / 1000 / 60 / 60 / 24;
};


// eslint-disable-next-line no-undef
module.exports = {
  chgUserAddress: async (req, res) => {
    const db = req.app.get("db");
    const { street, city, state, zipcode } = req.body;
    const user_id = req.session.user.user_id;
    try {
      const { hardiness_zone, first_gdd35, last_gdd35, growing_season_length } = await getGrowingParams(zipcode, street, city, state, db);
      await db.updateUser.chgUserAddress(user_id, street, city, state, zipcode, growing_season_length, first_gdd35, last_gdd35, hardiness_zone);
      req.session.user = { ...req.session.user, street, city, state, zipcode, growing_season_length, first_gdd35, last_gdd35, hardiness_zone };
      res.status(200).send(req.session.user);
    } catch (err) {
      await db.updateUser.chgUserAddress(user_id, street, city, state, zipcode, null, null, null, null);
      res.status(500).send("Manual Entry");
    }
  },
  chgUserEmail: async (req, res) => {
    const db = req.app.get("db");
    const { email } = req.body;
    const emailFiltered = email.toLowerCase().replace(/\s/g, "");
    const storedUser = await db.user.getUserCredentials(emailFiltered);
    if (storedUser.length === 0) {
      const user_id = req.session.user.user_id;
      try {
        await db.updateUser.chgUserEmail(user_id, emailFiltered);
        req.session.user = { ...req.session.user, email: emailFiltered };
        res.status(200).send(req.session.user);
      } catch (err) { console.log(err); }
    } else {
      res.sendStatus(403);
    }
  },
  chgUserPassword: async (req, res) => {
    const db = req.app.get("db");
    const { password } = req.body;
    const user_id = req.session.user.user_id;
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      await db.updateUser.chgUserPassword(user_id, hash);
      res.status(200).send(req.session.user);
    } catch (err) { console.log(err); }
  },
  chgUserName: async (req, res) => {
    const db = req.app.get("db");
    const { first_name, last_name } = req.body;
    const user_id = req.session.user.user_id;
    try {
      await db.updateUser.chgUserName(user_id, first_name, last_name);
      req.session.user = { ...req.session.user, first_name, last_name };
      res.status(200).send(req.session.user);
    } catch (err) { console.log(err); }
  },
  changeGrowingInfo: async (req, res) => {
    const db = req.app.get("db");
    const { first_gdd35, last_gdd35, hardiness_zone } = req.body;
    const firstGDD35Filtered = first_gdd35.replace(/\s/g).substring(0, 5);
    const lastGDD35Filtered = last_gdd35.replace(/\s/g).substring(0, 5);

    if (Number.parseInt(firstGDD35Filtered.match(/\d\d/)) <= 12 && Number.parseInt(firstGDD35Filtered.substring(3, 5).match(/\d\d/)) <= 31 && Number.parseInt(lastGDD35Filtered.match(/\d\d/)) <= 12 && Number.parseInt(lastGDD35Filtered.substring(3, 5).match(/\d\d/)) <= 31) {
      const user_id = req.session.user.user_id;
      const growingSeasonLength = growingSeasonLengthCalc(firstGDD35Filtered, lastGDD35Filtered);
      try {
        await db.updateUser.chgGrowingInfo(user_id, firstGDD35Filtered, lastGDD35Filtered, hardiness_zone, growingSeasonLength);
        req.session.user = { ...req.session.user, first_gdd35: firstGDD35Filtered, last_gdd35: lastGDD35Filtered, hardiness_zone, growing_season_length: Math.round(growingSeasonLength) };
        res.status(200).send(req.session.user);
      } catch (err) { console.log(err); }
    } else {
      res.sendStatus(400);
    }
  },
  deleteUser: async (req, res) => {
    const db = req.app.get("db");
    const user_id = req.session.user.user_id;
    db.updateUser.deleteUser(user_id);
    req.session.destroy();
    res.sendStatus(200);
  }
};