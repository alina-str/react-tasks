import React, { FC, Suspense } from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./styles.css";

const navData = [
  {
    Component: <Dashboard />,
    path: "/"
  }
];
const App: FC = () => {
  return (
    <div className="App">
      <Switch>
        {navData.map(({ Component, path }): JSX.Element => {
          return (
            <Route path={path} exact key={path.toString()}>
              {Component}
            </Route>
          );
        })}
      </Switch>
    </div>
  );
};

export default App;
