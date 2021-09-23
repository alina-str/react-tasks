import React, { FC, Suspense } from "react";

import { Switch, Route, Redirect, useLocation, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Details from "./components/Details";
import Header from "./components/Header";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NoMatch from "./pages/NoMatch";
import "./styles.css";

const navData = [
  {
    Component: <Dashboard />,
    path: "/"
  },
  {
    Component: <About />,
    path: "/about"
  },
  {
    Component: <Details />,
    path: "/details/:id"
  },
  {
    Component: <NoMatch />,
    path: "*"
  }
];
const App = ({location}:any) => {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <TransitionGroup>
          <CSSTransition timeout={300} classNames="fade" key={location.key}>
            <Switch location={location}>
              {navData.map(({ Component, path }): JSX.Element => {
                return (
                  <Route exact path={path} key={path.toString()}>
                    {Component}
                  </Route>
                );
              })}
              <Redirect to="/" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Suspense>
    </div>
  );
};

export default withRouter(App);
