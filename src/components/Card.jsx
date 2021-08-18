import React from "react";
import PropTypes from "prop-types";

const Card = (props) => {
  const { item } = props;
  return (
    <div className="card">
      <div className="container">
        <p className="card__text">Name: {item.firstName}</p>
        <p className="card__text">Surname: {item.lastName}</p>
        <p className="card__text">Birth date: {item.birthDate}</p>
        <p className="card__text">Country: {item.country}</p>
        {item.checkedIdentity ? (
          <p className="card__text">Female</p>
        ) : (
          <p className="card__text">Male</p>
        )}
      </div>
    </div>
  );
};

Card.defaultProps = {
  item: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  )
};
Card.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  )
};

export default Card;
