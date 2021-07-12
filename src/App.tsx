import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";

import Layout from "./containers/Layout";
import Dashboard from "./containers/Dashboard";
import { useActions, useAppState } from "./store";

export default function App() {
  const state = useAppState();
  const actions = useActions();
  if (Cookies.get("UserToken")) actions.user.loggedIn(true);

  useEffect(() => {
    if (Cookies.get("UserToken")) {
      const setData = async () => await actions.user.account();
      // avoid react memory leak
      (async () => await setData())();
    }
  }, []);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}
