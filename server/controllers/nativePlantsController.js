
module.exports = {
  searchPlants: async (req, res) => {
    const db = await req.app.get('db');
    const { name, moisture, sun, minHeight, maxHeight, bloomTime } = req.query;
    let searchString = '';
    try {
      if (name) {
        searchString = `(common_name ILIKE '%${name}%') OR (botanical_name ILIKE '%${name}%')`
      };
      if (moisture) {
        if (!searchString) {
          searchString = `moisture = ${moisture}`
        } else {
          searchString = searchString + ` AND moisture = '${moisture}'`
        }
      };
      if (sun) {
        if (!searchString) {
          searchString = `sun = ${sun}`
        } else {
          searchString = searchString + ` AND sun = '${sun}'`
        }
      };
      if (minHeight) {
        if (!searchString) {
          searchString = `height >= ${minHeight}`
        } else {
          searchString = searchString + ` AND height >= '${minHeight}'`
        }
      };
      if (maxHeight) {
        if (!searchString) {
          searchString = `height >= ${maxHeight}`
        } else {
          searchString = searchString + ` AND height <= '${maxHeight}'`
        }
      };
      if (bloomTime) {
        if (!searchString) {
          searchString = `bloom_time = '${bloomTime}'`
        } else {
          searchString = searchString + ` AND bloom_time = '${bloomTime}'`
        }
      };
      if (bloomTime || minHeight || maxHeight || sun || moisture || name) {
        searchString = searchString + ";";
        const results = await db.nativePlants.searchNatives(searchString);
        res.status(200).send(results);
      } else {
        res.sendStatus(200);
      }
    } catch {
      res.sendStatus(500);
    }
  },
  addToList: async (req, res) => {
    const db = await req.app.get('db');


  },
  updateProjectNotes: async (req, res) => {
    const db = await req.app.get('db');

  },
  removeFromList: async (req, res) => {
    const db = await req.app.get('db');

  }
}