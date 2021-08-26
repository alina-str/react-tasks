import { AxiosResponse } from "axios";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Articles from "../components/Articles";
import axios from "../services/api";
import "../styles.css";
import Get200Articles, { Article, SortType } from "../types";

const API_KEY = "d7d00558af544539b8a92768e90c3a61";

const Dashboard: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [arts, setArts] = useState<Article[]>([]);
  const [sortBy, setSortBy] = useState<SortType>(SortType.popularity);
  const [page, setPage] = useState<number>(1);
  const [kolvoArts, setKolvoArts] = useState<number | string>(10);
  const [kolvoResults, setKolvoResults] = useState<number>(0);

  const handleSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response: AxiosResponse<Get200Articles> = await axios.get(
        `v2/everything?q=${searchValue}&apiKey=${API_KEY}&SortBy=${sortBy}&pageSize=${kolvoArts}&page=${page}`
      );
      setArts(response.data.articles);
      setKolvoResults(response.data.totalResults);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearchValue(value);
  };

  useEffect(() => {
    setKolvoArts(kolvoArts);
  }, [kolvoArts]);

  const handleCh = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const regexp = /\d+/;
    const matchedValue = value.match(regexp);
    if (matchedValue) {
      const newValue = +matchedValue[0];
      setKolvoArts(newValue);
    } else {
      setKolvoArts("");
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
                type="radio"
                value={SortType.relevancy}
                checked={sortBy === SortType.relevancy}
                onChange={() => setSortBy(SortType.relevancy)}
              />{" "}
              relevancy
            </label>
            <label>
              <input
                type="radio"
                value={SortType.popularity}
                checked={sortBy === SortType.popularity}
                onChange={() => setSortBy(SortType.popularity)}
              />{" "}
              popularity
            </label>
            <label>
              <input
                type="radio"
                value={SortType.publishedAt}
                checked={sortBy === SortType.publishedAt}
                onChange={() => setSortBy(SortType.publishedAt)}
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
      <Articles
        articles={arts}
        page={page}
        onChangePage={(pageFromInput: number) => setPage(pageFromInput)}
      />
      {kolvoResults !== 0 || NaN ? (
        <div className="kolvostr">
          Всего страниц {Math.floor(kolvoResults / Number(kolvoArts))}
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
