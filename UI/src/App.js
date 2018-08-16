import React from "react";
import { Route } from "react-router-dom";
import WelcomePage from "./welcome/Welcome";
import Dashboard from "./dashboard/Dashboard";

const App = () => (
  <div>
    <Route path="/" exact component={WelcomePage} />
    <Route path="/dashboard" exact component={Dashboard} />
  </div>
);

export default App;
