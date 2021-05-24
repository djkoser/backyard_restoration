
// eslint-disable-next-line no-undef
module.exports = {
  searchPlants: async (req, res) => {
    const db = await req.app.get("db");
    const { name, moisture, sun, minHeight, maxHeight, bloomTime } = req.query;
    let searchString = "";
    try {
      if (name) {
        searchString = `(common_name ILIKE '%${name}%') OR (botanical_name ILIKE '%${name}%')`;
      }
      if (moisture) {
        if (!searchString) {
          searchString = `moisture = '${moisture}'`;
        } else {
          searchString = searchString + ` AND moisture = '${moisture}'`;
        }
      }
      if (sun) {
        if (!searchString) {
          searchString = `sun = '${sun}'`;
        } else {
          searchString = searchString + ` AND sun = '${sun}'`;
        }
      }
      if (minHeight) {
        if (!searchString) {
          searchString = `height >= ${minHeight}`;
        } else {
          searchString = searchString + ` AND height >= ${minHeight}`;
        }
      }
      if (maxHeight) {
        if (!searchString) {
          searchString = `height <= ${maxHeight}`;
        } else {
          searchString = searchString + ` AND height <= ${maxHeight}`;
        }
      }
      if (bloomTime) {
        if (!searchString) {
          searchString = `bloom_time = '${bloomTime}'`;
        } else {
          searchString = searchString + ` AND bloom_time = '${bloomTime}'`;
        }
      }
      if (bloomTime || minHeight || maxHeight || sun || moisture || name) {
        searchString = searchString + ";";
        const results = await db.nativePlants.searchNatives(searchString);
        res.status(200).send(results);
      } else {
        const results = await db.nativePlants.getAllNatives();
        res.status(200).send(results);
      }
    } catch {
      res.sendStatus(500);
    }
  },
  addToList: async (req, res) => {
    const db = await req.app.get("db");
    const { user_id } = req.session.user;
    const { nativeID } = req.params;
    try {
      const check = await db.nativePlants.checkExistingList(user_id, nativeID);
      if (check.length === 0) {
        await db.nativePlants.addToList(user_id, nativeID);
        const newList = await db.nativePlants.getUserNatives(user_id);
        res.status(200).send(newList);
      } else {
        const newList = await db.nativePlants.getUserNatives(user_id);
        res.status(200).send(newList);
      }
    } catch {
      res.sendStatus(500);
    }
  },
  updateProjectNotes: async (req, res) => {
    const db = await req.app.get("db");
    const { user_id } = req.session.user;
    const { nativeID } = req.params;
    const { notes } = req.body;
    try {
      await db.nativePlants.updateProjectNotes(user_id, nativeID, notes);
      const newList = await db.nativePlants.getUserNatives(user_id);
      res.status(200).send(newList);
    } catch {
      res.sendStatus(500);
    }
  },
  removeFromList: async (req, res) => {
    const db = await req.app.get("db");
    const { user_id } = req.session.user;
    const { nativeID } = req.params;
    try {
      await db.nativePlants.removeFromList(user_id, nativeID);
      const newList = await db.nativePlants.getUserNatives(user_id);
      res.status(200).send(newList);
    } catch {
      res.sendStatus(500);
    }
  },
  getUserNatives: async (req, res) => {
    const db = await req.app.get("db");
    const { user_id } = req.session.user;
    try {
      const natives = await db.nativePlants.getUserNatives(user_id);
      res.status(200).send(natives);
    } catch {
      res.sendStatus(500);
    }
  }
};