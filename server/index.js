require("dotenv").config();
const massive = require("massive");
const express = require("express");
const app = express();
const session = require("express-session");
app.use(express.json());
const methodsCtl = require("./controllers/methodController");
const userCtl = require("./controllers/userController");
const weedCtl = require("./controllers/weedController");
const updUserCtl = require("./controllers/updateUserController");

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

// User Endpoints
app.post("/api/register", userCtl.newUser);
app.get("/api/login", userCtl.login);
app.get("/api/user")
app.delete("/api/logout", userCtl.logout);
// Update user Endpoints
app.put("/api/user/address", updUserCtl.chgUserAddress);
app.put("/api/user/email", updUserCtl.chgUserEmail);
app.put("/api/user/password", updUserCtl.chgUserPassword);
app.put("/api/user/name", updUserCtl.chgUserName);
// Methods Endpoints
app.get("/api/wdctrl", methodsCtl.getMethods);
app.post("/api/wdctrl/:ctlID", methodsCtl.addMethod);
app.delete("/api/wdctrl/:ctlID", methodsCtl.removeMethod);
// Weeds Endpoints
app.get("/api/weeds", weedCtl.weedsByTypeKw);
app.get("/api/weeds/:weedID");

