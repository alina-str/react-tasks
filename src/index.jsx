import "./styles.css";
import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import objects from "./Data";

render(<App countries={objects} />, document.querySelector(".wrapper"));
