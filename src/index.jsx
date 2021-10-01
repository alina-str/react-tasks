import "./styles.css";
import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import countryData from "./Data";

render(<App countries={countryData} />, document.querySelector(".wrapper"));
