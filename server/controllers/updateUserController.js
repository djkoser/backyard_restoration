module.exports = {
  chgUserAddress: async (req, res) => {
    const db = req.app.get('db')
    if (typeof req.session.user === 'object') {
      req.session.user.user_id
    } else { return res.sendStatus(403) }
  },
  chgUserEmail: async (req, res) => {
    const db = req.app.get('db')
    if (typeof req.session.user === 'object') {
      req.session.user.user_id
    } else { return res.sendStatus(403) }
  },
  chgUserPassword: async (req, res) => {
    const db = req.app.get('db')
    if (typeof req.session.user === 'object') {
      req.session.user.user_id
    } else { return res.sendStatus(403) }
  },
  chgUserName: async (req, res) => {
    const db = req.app.get('db')
    if (typeof req.session.user === 'object') {
      req.session.user.user_id
    } else { return res.sendStatus(403) }
  }
}