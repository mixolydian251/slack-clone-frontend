import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import HomePage from "../components/HomePage";
import Login from "../components/Login";
import Register from "../components/Register";
import CreateTeam from "../components/CreateTeam";
import Dashboard from "../components/Dashboard/Dashboard";
import PageNotFound from "../components/PageNotFound";

import PrivateRoute from "./PrivateRoute";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/createTeam" component={CreateTeam} />
        <PrivateRoute path="/dashboard/:teamId?/:channelId?" component={Dashboard} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;