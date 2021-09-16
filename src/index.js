import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./pages/login.js";
import Grid from "./pages/grid.js";
import "./index.css";
import { ProvideAuth, useAuth } from "./hooks/useAuth.js";

const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
  const { isLoggedin } = useAuth();

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return isLoggedin() ? Comp : <Redirect to="/login" />;
      }}
    />
  );
};

const GuestRoute = ({ component: Comp, path, ...rest }) => {
  const { isLoggedin } = useAuth();

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return !isLoggedin() ? Comp : <Redirect to="/grid" />;
      }}
    />
  );
};

const App = () => {
  return (
    <ProvideAuth>
      <Router>
        <Redirect from="/" to="/login"></Redirect>
        <Switch>
          <GuestRoute exact path="/login" component={<Login />} />
          <ProtectedRoute exact path="/grid" component={<Grid />} />
        </Switch>
      </Router>
    </ProvideAuth>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
