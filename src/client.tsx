import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import setSearchReducer from "./redux/reducers/reducer_search";
import renderApp from "./renderApp";
import restoreDataOnClient from "./restoreData";
import "./styles.css";

function run(store: any): void {
  hydrate(
    <Provider store={store}>
      <BrowserRouter>{renderApp()}</BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
}

const store = createStore(
  setSearchReducer,
  restoreDataOnClient(),
  composeWithDevTools(applyMiddleware(thunk))
);

run(store);
