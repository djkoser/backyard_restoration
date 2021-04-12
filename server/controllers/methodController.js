
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
      const { ctlID } = req.params.ctlID;
      const methods = await db.method.addMethod(user_id, ctlID);
      res.status(200).send(methods);
    } catch (err) { console.log(err) }
  },
  removeMethod: async (req, res) => {
    const db = req.app.get('db')
    try {
      const { user_id } = req.session.user
      const { ctlID } = req.params;
      const methods = await db.method.addMethod(user_id, ctlID);
      res.status(200).send(methods);
    } catch (err) { console.log(err) }
  }
}


