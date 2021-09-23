import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Articles from "../components/Articles";
import {
  setPageSize,
  setSearchValue,
  setSort
} from "../redux/actions/action_search";
import asyncGetArticles from "../redux/asyncActions/asyncActions";
import "../styles.css";
import { SearchInterface, SortType } from "../types";

export const API_KEY = "d7d00558af544539b8a92768e90c3a61";

const Dashboard: FC = () => {
  const kolvoArts = useSelector((state: SearchInterface) => state.pageSize);
  const sortBy = useSelector((state: SearchInterface) => state.sortBy);
  const arts = useSelector((state: SearchInterface) => state.arts);
  const kolvoResults = useSelector(
    (state: SearchInterface) => state.kolvoResults
  );
  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: SearchInterface) => state.searchValue
  );
  const page = useSelector((state: SearchInterface) => state.page);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (kolvoArts !== 0 && searchValue !== "") {
      dispatch(
        asyncGetArticles(searchValue, sortBy, kolvoArts, page, setIsLoading)
      );
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    dispatch(setSearchValue(value));
  };

  useEffect(() => {
    dispatch(setPageSize(kolvoArts));
  }, [dispatch, kolvoArts]);

  const handleCh = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const regexp = /\d+/;
    const matchedValue = value.match(regexp);
    if (matchedValue) {
      const newValue = +matchedValue[0];
      dispatch(setPageSize(newValue));
    } else {
      dispatch(setPageSize(1));
    }
  };

  return (
    <div className="page-wrap">
      <form className="search-gr" onSubmit={handleSubmit}>
        <label htmlFor="search" className="search">
          <div className="search_text">Поиск:</div>
          <input
            id="search"
            type="text"
            value={searchValue}
            onChange={(e) => handleChange(e)}
            className="input__search"
          />
        </label>
        <div className="sort">
          <div className="sort_text">Сортировать по:</div>
          <div className="radios">
            <label>
              <input
                data-testid={SortType.relevancy}
                type="radio"
                value={SortType.relevancy}
                checked={sortBy === SortType.relevancy}
                onChange={() => dispatch(setSort(SortType.relevancy))}
              />{" "}
              relevancy
            </label>
            <label>
              <input
                type="radio"
                value={SortType.popularity}
                checked={sortBy === SortType.popularity}
                onChange={() => dispatch(setSort(SortType.popularity))}
              />{" "}
              popularity
            </label>
            <label>
              <input
                type="radio"
                value={SortType.publishedAt}
                checked={sortBy === SortType.publishedAt}
                onChange={() => dispatch(setSort(SortType.publishedAt))}
              />{" "}
              published at
            </label>
          </div>
        </div>
        <div className="kolvoarts">
          <div className="kolvoarts_text">Количество артиклей на странице:</div>
          <input
            type="text"
            className="kolvoarts_input"
            value={kolvoArts}
            onChange={handleCh}
          />
        </div>
        <div className="button">
          <button type="submit" className="button_search" disabled={isLoading}>
            {isLoading ? "Loading..." : "Search"}
          </button>
        </div>
      </form>
      <Articles articles={arts} />
      {kolvoResults !== 0 ? (
        <div className="kolvostr">
          Всего страниц {Math.floor(kolvoResults / Number(kolvoArts))}
        </div>
      ) : null}
    </div>
  );
};
export default Dashboard;
