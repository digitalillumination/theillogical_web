import React from "react";
import Layout from "./components/UI/Layout";
import { Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader";

import MainPage from "./pages/MainPage";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={MainPage} />
      </Switch>
    </Layout>
  );
}

export default hot(module)(App);
