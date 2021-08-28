import React from "react";
import { NavLink } from "react-router-dom";
import "../styles.css";

const Header = (): JSX.Element => {
  return (
    <div className="head_spisok">
      <NavLink exact activeClassName="active_head" to={`/`}>
        Home
      </NavLink>
      <NavLink exact activeClassName="active_head" to={`/about`}>
        About
      </NavLink>
    </div>
  );
};

export default Header;
