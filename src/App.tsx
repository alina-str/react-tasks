import React from "react";

import {
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Details from "./components/Details";
import Header from "./components/Header";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NoMatch from "./pages/NoMatch";
import "./styles.css";

export const navData = [
  {
    Component: <Dashboard />,
    path: "/",
    key: "dashboard",
  },
  {
    Component: <About />,
    path: "/about",
    key: "about",
  },
  {
    Component: <Details />,
    path: "/details/:id",
    key: "details",
  },
  {
    Component: <NoMatch />,
    path: "*",
    key: "nomatch",
  },
];
const App= ({location}:any):JSX.Element=> {

  return (
    <div className="App">
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
            </Switch>
          </CSSTransition>
        </TransitionGroup>
    </div>
  );
};

export default withRouter(App);
