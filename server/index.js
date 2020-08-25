import config from "../config.js";
import Html from "./Html";
import express from "express";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, combineReducers } from "redux";
import reducer from "../src/reducers";
import { matchRoutes } from "react-router-config";
import routes from "../src/routes";
import { getParams } from "./utils";
var bodyParser = require("body-parser");

const server = express();
server.use(bodyParser.json({ limit: "256kb" })); // parse application/json

server.get(
  /^\/[a-zA-Z]+\.[js|svg|png|css|ico]*[?a-zA-Z]+$/,
  express.static(__dirname.slice(0, -6) + "public"), //for hosting in herokuapp needed slicing since __dirname differs
);
const createMockReducers = (reducers) => {
  const keys = Object.keys(reducers);
  const mockReducers = {};
  keys.forEach((key) => {
    mockReducers[key] = reducers[key]();
  });

  return mockReducers;
};
const fetchData = (branch, store, params) => {
  const promises = branch.map(({ route, match }) => {
    const { component } = route;
    console.log("debugger server", component, params);
    if (component.fetchData instanceof Function)
      return component.fetchData(match, store, { params });
  });
  return promises;
};
server.get("*", async (req, res) => {
  try {
    const { url } = req;
    console.log("req ", url);
    const rootReducer = combineReducers({
      ...createMockReducers(reducer),
    });
    const params = getParams(url);
    console.log("params", params);
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    store.runSaga = sagaMiddleware.run;
    const branch = matchRoutes(routes, req.url);

    const promises = fetchData(branch, store, params);
    const resolvedPromises = Promise.all(promises)
      .then((prmize) => {
        const html = Html({ store, url });
        res.status(200).send(html);
      })
      .catch((err) => {
        console.error("Caught in promise rejection", err);
        res.status(500).send("Internal server error");
      });
    console.log("resolvedPromises", resolvedPromises);
  } catch (err) {
    console.log("error in server side rendering .....", err);
    res.status(500).send("internal server error");
  }
});

server.listen(config.port, () => {
  console.log("Server listening on Port", config.port);
});
