import React from "react";
import Layout from "./components/UI/Layout";
import { Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader";

import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/signup" exact component={SignUpPage} />
        <Route path="/user/:id" exact component={UserPage} />
      </Switch>
    </Layout>
  );
}

export default hot(module)(App);
