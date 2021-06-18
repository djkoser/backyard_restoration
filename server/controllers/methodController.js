
// eslint-disable-next-line no-undef
module.exports = {
  getMethods: async (req, res) => {
    const db = req.app.get('db');
    try {
      const { user_id } = req.session.user;
      const methods = await db.method.getMethods(user_id);
      res.status(200).send(methods);
    } catch (err) { console.log(err); }
  },
  toggleMethod: async (req, res) => {
    // Methods Endpoints
    const db = req.app.get('db');
    try {
      const { user_id } = req.session.user;
      const { ctlID } = req.params;
      let methods = await db.method.getMethods(user_id);
      // Adds protection in the event that user ID is not available on session.
      if (user_id) {
        if (!methods.reduce((acc, el) => Number.parseInt(ctlID) === el.method_id ? ++acc : acc, 0)) {
          await db.method.addMethod(user_id, ctlID);
          methods = await db.method.getMethods(user_id);
          res.status(200).send(methods);
        } else if (methods.reduce((acc, el) => Number.parseInt(ctlID) === el.method_id ? ++acc : acc, 0)) {
          await db.method.removeMethod(user_id, ctlID);
          methods = await db.method.getMethods(user_id);
          res.status(200).send(methods);
        } else { res.sendStatus(400); }
      } else {
        res.sendStatus(403);
      }
    } catch (err) { console.log(err); }
  }
};


