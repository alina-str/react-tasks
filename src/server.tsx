import express from "express";

import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { createStore } from "redux";
import fetchDataByUrl from "./fetchData";

import renderApp from "./renderApp";
import renderTemplate from "./template";

const app = express();

app.use(express.static("dist"));

app.get("*", async (req, res) => {
  const context = {};
  const data = await fetchDataByUrl(req.url);
  const store = createStore((state: any) => state, data);
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        {renderApp()}
      </StaticRouter>
    </Provider>
  );

  res.send(
    renderTemplate({
      cssPath: "main.css",
      jsPath: "main.js",
      content,
      data: JSON.stringify(store.getState()),
    })
  );
});

app.listen(8000, () => {
  console.log(`Server is listening on port: 8000`);
});
