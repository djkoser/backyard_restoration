const { getGrowingParams } = require('../growingCalculations');
module.exports = {
  chgUserAddress: async (req, res) => {
    const db = req.app.get('db')
    if (typeof req.session.user === 'object') {
      const { street, city, state, zipcode } = req.body;
      console.log(street, city, state, zipcode)
      const user_id = req.session.user.user_id;
      try {
        // @ts-ignore
        const { hardinessZone, firstGDD35, averageSeasonLength } = await getGrowingParams(zipcode, street, city, state, db);
        // @ts-ignore
        const updatedUserInfo = await db.updateUser.chgUserAddress(user_id, street, city, state, zipcode, averageSeasonLength, firstGDD35, hardinessZone);
        req.session.user = updatedUserInfo;
      } catch (err) { console.log(err) }
    } else { return res.sendStatus(403) };
  },
  chgUserEmail: async (req, res) => {
    const db = req.app.get('db')
    if (typeof req.session.user === 'object') {
      const { } = req.body
      // @ts-ignore
      db.updateuser.chgUserEmail(user_id)
    } else { return res.sendStatus(403) }
  },
  chgUserPassword: async (req, res) => {
    const db = req.app.get('db')
    if (typeof req.session.user === 'object') {
      const { } = req.body
      // @ts-ignore
      db.updateuser.chgUserPassword(user_id)
    } else { return res.sendStatus(403) }
  },
  chgUserName: async (req, res) => {
    const db = req.app.get('db')
    if (typeof req.session.user === 'object') {
      const { } = req.body
      // @ts-ignore
      db.updateuser.chgUserName(user_id)
    } else { return res.sendStatus(403) }
  }
}