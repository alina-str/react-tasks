import { Provider } from "react-redux";
import { createStore } from "redux";
import React from "react";
import { render,waitFor, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import setSearchReducer from "../redux/reducers/reducer_search";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

function renderWithRedux(
  component,
  { initialState, store = createStore(setSearchReducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}><BrowserRouter>{component}</BrowserRouter></Provider>)
  };
}
const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui);
  };

test("full app rendering", () => {
  renderWithRedux(<App />);
  expect(screen.getByText(/Поиск/i)).toBeInTheDocument;
});
test("app changing settings page size", async () => {
  renderWithRedux(<App />);
  fireEvent.click(screen.findByText(/relevancy/i));
  await waitFor(() =>
  screen
  .getByTestId(/relevancy/i).checked
  );
  expect(
    screen
    .getByTestId(/relevancy/i).checked.toBeInTheDocument);
  });
test("app navigating to about", () => {
  renderWithRouter(<BrowserRouter><App /></BrowserRouter>, { route: "/about" });
  expect(screen.findByText("Lorem")).toBeInTheDocument;
});
test("landing on a bad page", () => {
  renderWithRouter(<BrowserRouter><App /></BrowserRouter>, { route: "/something-that-does-not-match" });
  expect(screen.findByText(/404/i)).toBeInTheDocument;
  });
