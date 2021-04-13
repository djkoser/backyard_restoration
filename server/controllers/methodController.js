
module.exports = {
  getMethods: async (req, res) => {
    const db = req.app.get('db')
    try {
      const { user_id } = req.session.user
      const methods = await db.method.getMethods(user_id);
      res.status(200).send(methods);
    } catch (err) { console.log(err) }
  },
  addMethod: async (req, res) => {
    // Methods Endpoints
    const db = req.app.get('db')
    try {
      const { user_id } = req.session.user
      const { ctlID } = req.params;
      let methods = await db.method.getMethods(user_id);
      if (!methods.reduce((acc, el) => Number.parseInt(ctlID) === el.method_id ? acc += 1 : acc, 0)) {
        await db.method.addMethod(user_id, ctlID);
        methods = await db.method.getMethods(user_id);
        res.status(200).send(methods);
      } else { res.sendStatus(409) }
    } catch (err) { console.log(err) }
  },
  removeMethod: async (req, res) => {
    const db = req.app.get('db')
    try {
      const { user_id } = req.session.user
      const { ctlID } = req.params;
      await db.method.removeMethod(user_id, ctlID);
      const methods = await db.method.getMethods(user_id);
      res.status(200).send(methods);
    } catch (err) { console.log(err) }
  }
}


