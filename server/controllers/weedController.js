module.exports = {
  weedsByTypeKw: async (req, res) => {
    const db = req.app.get('db')
    if (req.query.vegType && req.query.keyword) {
      try {
        const { vegType, keyword } = req.query;
        const weeds = await db.weed.weedsByTypeKw(vegType, decodeURI(keyword));
        res.status(200).send(weeds);
      } catch (err) { console.log(err) }
    } else if (req.query.vegType) {
      try {
        const { vegType } = req.query;
        const weeds = await db.weed.getWeedsByType(vegType);
        res.status(200).send(weeds);
      } catch (err) { console.log(err) }
    } else { return res.sendStatus(400) };
  },
  weedDetails: async (req, res) => {
    const db = req.app.get('db')
    if (req.params.weedID) {
      try {
        const { weedID } = req.params;
        const weeds = await db.weed.weedDetails(weedID);
        res.status(200).send(weeds);
      } catch (err) { console.log(err) }
    } else { return res.sendStatus(400) };
  }
}