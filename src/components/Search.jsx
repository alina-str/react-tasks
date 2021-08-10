import React from "react";

const Search = () => {
  return (
    <form className="search_form">
      <img src="./public/lupa.svg" alt="img" className="search_img" />
      <input
        type="text"
        placeholder="Search for ..."
        className="search_input"
      />
    </form>
  );
};

export default Search;
