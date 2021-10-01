import React from "react";

const Search = () => {
  return (
    <form className="searchForm">
      <img src="./public/lupa.svg" alt="search image" className="searchForm__img" />
      <input
        type="text"
        placeholder="Search for ..."
        className="searchForm__input"
      />
    </form>
  );
};

export default Search;
