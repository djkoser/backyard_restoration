module.exports = {
  weedsByTypeKw: async (req, res) => {
    const db = req.app.get('db')
    if (req.query.vegType && req.query.keyword) {
      try {
        const { vegType, keyword } = req.query;
        const weeds = await db.weed.weedsByTypeKw(vegType, decodeURI(keyword));
        return res.status(200).send(weeds);
      } catch (err) { console.log(err) }
    } else if (req.query.vegType) {
      try {
        const { vegType } = req.query;
        const weeds = await db.weed.getWeedsByType(vegType);
        return res.status(200).send(weeds);
      } catch (err) { console.log(err) }
    } else { return res.sendStatus(400) };
  },
  weedDetails: async (req, res) => {
    const db = req.app.get('db')
    if (req.params.weedID) {
      try {
        const { weedID } = req.params;
        const weeds = await db.weed.weedDetails(weedID);
        return res.status(200).send(weeds);
      } catch (err) { console.log(err) }
    } else { return res.sendStatus(400) };
  },
  weedMethods: async (req, res) => {
    const db = req.app.get('db')
    if (req.params.weedID) {
      try {
        const { weedID } = req.params
        const methods = await db.weed.getWeedMethods(weedID);
        return res.status(200).send(methods);
      } catch (err) { console.log(err) }
    } else { return res.sendStatus(400) };
  }
}