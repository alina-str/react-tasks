import React from "react";
import "../styles.css";
import PropTypes from "prop-types";
import Search from "./Search";
import Cards from "./Cards";

const App = (props) => {
  const { countries } = props;
  return (
    <div>
      <Search />
      <div className="cards-container">
        {countries.map((item) => (
          <Cards element={item} key={item.country} />
        ))}
      </div>
    </div>
  );
};
App.defaultProps = {
  countries: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
};
App.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
};

export default App;
