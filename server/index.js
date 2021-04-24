require("dotenv").config();
const massive = require("massive");
const express = require("express");
const app = express();
const session = require("express-session");
const methodsCtl = require("./controllers/methodController");
const userCtl = require("./controllers/userController");
const weedCtl = require("./controllers/weedController");
const updUserCtl = require("./controllers/updateUserController");
const { authorize } = require("./middleware/authMiddleware");
const passwordReset = require('./controllers/passwordReset');
const stripeController = require('./controllers/stripeController');

const { CONNECTION_STRING, SESSION_SECRET, PORT } = process.env;

app.use(express.static(`${__dirname}/../build`))

app.use(express.json());
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
app.post("/api/login", userCtl.login);
app.get("/api/user", authorize, userCtl.getInfo);
app.delete("/api/logout", userCtl.logout);
// Update user Endpoints
app.put("/api/user/address", authorize, updUserCtl.chgUserAddress);
app.put("/api/user/email", authorize, updUserCtl.chgUserEmail);
app.put("/api/user/password", authorize, updUserCtl.chgUserPassword);
app.put("/api/user/name", authorize, updUserCtl.chgUserName);
app.put("/api/pwdResetReq", passwordReset.resetPwdEmail);
app.put("/api/pwdRS/:token", passwordReset.processReset);
app.delete("/api/deleteUser", authorize, updUserCtl.deleteUser)
// Methods Endpoints
app.get("/api/wdctrl", authorize, methodsCtl.getMethods);
app.put("/api/wdctrl/:ctlID", authorize, methodsCtl.toggleMethod);
// Weeds Endpoints
app.get("/api/weeds", authorize, weedCtl.weedsByTypeKw);
app.get("/api/weeds/:weedID", authorize, weedCtl.weedDetails);
app.get("/api/weeds/methods/:weedID", authorize, weedCtl.weedMethods);
// Stripe EndPoint
app.post('/api/donate', authorize, stripeController.checkout);


