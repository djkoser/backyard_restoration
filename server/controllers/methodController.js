module.exports = {
  getMethods: (req, res) => {
    const db = req.app.get('db')
  },
  addMethod: (req, res) => {
    const db = req.app.get('db')
  },
  removeMethod: (req, res) => {
    const db = req.app.get('db')
  }

}