import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import MyAccount from "./components/MyAccount";
import Register from "./components/Register";
import WeedPage from "./components/WeedPage";
import WeedSearch from "./components/WeedSearch";

export default (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/dash' component={Dashboard} />
    <Route path='/account' component={MyAccount} />
    <Route path='/register' component={Register} />
    <Route path='/weed/:id' component={WeedPage} />
    <Route path='/search/:vegType' component={WeedSearch} />
  </Switch>
)