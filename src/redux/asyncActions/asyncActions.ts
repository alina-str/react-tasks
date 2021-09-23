import { AxiosResponse } from "axios";
import React from "react";
import { Action } from "redux";
import { API_KEY } from "../../pages/Dashboard";
import axios from "../../services/api";
import Get200Articles from "../../types";
import { setArts, setData, setKolvoResults } from "../actions/action_search";

function asyncGetArticles(
  searchValue: string,
  sortBy: string,
  kolvoArts: number,
  page: number,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  return async (dispatch: React.Dispatch<Action>): Promise<void> => {
    setIsLoading(true);
    try {
      const response: AxiosResponse<Get200Articles> = await axios.get(
        `v2/everything?q=${searchValue}&apiKey=${API_KEY}&SortBy=${sortBy}&pageSize=${kolvoArts}&page=${page}`
      );
      dispatch(setArts(response.data.articles));
      dispatch(setKolvoResults(response.data.totalResults));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
}

export function asyncGetDetails(id: string) {
  return async (dispatch: React.Dispatch<Action>): Promise<void> => {
    try {
      const response: AxiosResponse<Get200Articles> = await axios.get(
        `v2/everything?apiKey=${API_KEY}&qInTitle=${id}`
      );
      dispatch(setData(response.data.articles));
    } catch (err) {
      console.error(err);
    }
  };
}

export default asyncGetArticles;
