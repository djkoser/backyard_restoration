require("dotenv").config();
const massive = require("massive")
const express = require("express")
const app = express()
const session = require("express-session")
app.use(express.json())

const { CONNECTION_STRING, SESSION_SECRET, PORT } = process.env;

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
)

massive({
  connectionString: CONNECTION_STRING,
  // @ts-ignore
  ssl: { rejectUnauthorized: 0 }
}).then((dbInstance) => {
  app.set("db", dbInstance)
  app.listen(PORT, () =>
    console.log(`DB Mounted and Server Connected on Port ${PORT}`)
  )
})
