import React from "react";
import PropTypes from "prop-types";

const Cards = (props) => {
  const { element } = props;
  return (
    <div className="card">
      <img className="country__picture" src={element.photo} alt="Country" />
      <div className="container">
        <h2>{element.country}</h2>
        <p>Welcome to this country!</p>
      </div>
    </div>
  );
};

Cards.defaultProps = {
  element: PropTypes.objectOf(PropTypes.string)
};
Cards.propTypes = {
  element: PropTypes.objectOf(PropTypes.string)
};

export default Cards;
