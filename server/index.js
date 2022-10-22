/* eslint-disable no-undef */
//@ts-nocheck
const massive = require('massive');
const express = require('express');
const app = express();
const session = require('express-session');
const methodsCtl = require('./controllers/methodController');
const userCtl = require('./controllers/userController');
const weedCtl = require('./controllers/weedController');
const updUserCtl = require('./controllers/updateUserController');
const { authorize } = require('./middleware/authMiddleware');
const passwordReset = require('./controllers/passwordReset');
const stripeController = require('./controllers/stripeController');
const nativeController = require('./controllers/nativePlantsController');

const { SESSION_SECRET, PORT, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_USER, POSTGRES_DATABASE } = process.env;

app.use(express.static(`${__dirname}/../build`));

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  })
);

massive({
  host: POSTGRES_HOST,
  port: 5432,
  database: POSTGRES_DATABASE,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  ssl: false,
  poolSize: 10
}).then((dbInstance) => {
  app.set('db', dbInstance);
  app.listen(PORT, () => console.log(`DB Mounted and Server Connected on Port ${PORT}`));
});

// User Endpoints
app.post('/api/register', userCtl.newUser);
app.post('/api/login', userCtl.login);
app.get('/api/user', authorize, userCtl.getInfo);
app.delete('/api/logout', userCtl.logout);
app.get('/api/check', userCtl.checkForCookie);
// Update user Endpoints
app.put('/api/user/address', authorize, updUserCtl.chgUserAddress);
app.put('/api/user/email', authorize, updUserCtl.chgUserEmail);
app.put('/api/user/password', authorize, updUserCtl.chgUserPassword);
app.put('/api/user/name', authorize, updUserCtl.chgUserName);
app.put('/api/pwdResetReq', passwordReset.resetPwdEmail);
app.put('/api/pwdRS/:token', passwordReset.processReset);
app.delete('/api/deleteUser', authorize, updUserCtl.deleteUser);
app.put('/api/user/growingInfo', authorize, updUserCtl.changeGrowingInfo);
// Methods Endpoints
app.get('/api/wdctrl', authorize, methodsCtl.getMethods);
app.put('/api/wdctrl/:ctlID', authorize, methodsCtl.toggleMethod);
// Weeds Endpoints
app.get('/api/weeds', authorize, weedCtl.weedsByTypeKw);
app.get('/api/weeds/:weedID', authorize, weedCtl.weedDetails);
app.get('/api/weeds/methods/:weedID', authorize, weedCtl.weedMethods);
// Native Plants Endpoints
app.get('/api/native', authorize, nativeController.searchPlants);
app.get('/api/native/user', authorize, nativeController.getUserNatives);
app.put('/api/native/notes/:nativeID', authorize, nativeController.updateProjectNotes);
app.post('/api/native/add/:nativeID', authorize, nativeController.addToList);
app.delete('/api/native/delete/:nativeID', authorize, nativeController.removeFromList);
// Stripe EndPoint
app.post('/api/donate', authorize, stripeController.checkout);
