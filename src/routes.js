import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import MyAccount from "./components/MyAccount";
import Register from "./components/Register";
import WeedPage from "./components/WeedPage";
import WeedSearch from "./components/WeedSearch";
import ResetPassword from "./components/ResetPassword";
import RequestPasswordReset from "./components/RequestPasswordReset";
import StripeThankYou from "./components/StripeThankYou";
import Stripe from "./components/Stripe";
import NOAAHangupPage from "./components/NOAAHangupPage";
import NativeSelector from "./components/NativeSelector";

export default (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/requestReset' component={RequestPasswordReset} />
    <Route path='/resetPassword/:token' component={ResetPassword} />
    <Route path='/dash' component={Dashboard} />
    <Route path='/account' component={MyAccount} />
    <Route path='/register' component={Register} />
    <Route path='/weed/:id' component={WeedPage} />
    <Route path='/search/:vegType' component={WeedSearch} />
    <Route path='/donation/success' component={StripeThankYou} />
    <Route path='/donation' component={Stripe} />
    <Route path='/manualEntry' component={NOAAHangupPage} />
    <Route path='/nativesSelector' component={NativeSelector} />
  </Switch>
);