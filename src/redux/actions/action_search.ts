import { Article } from "../../types";

export function setPageSize(pageSize: number): {
  type: string;
  payload: number;
} {
  return { type: "SET_ARTS_ON_PAGE", payload: pageSize };
}

export function setSort(sortBy: string): {
  type: string;
  payload: string;
} {
  return { type: "SET_SORT", payload: sortBy };
}

export function setSearchValue(searchValue: string): {
  type: string;
  payload: string;
} {
  return { type: "SET_SEARCH_VALUE", payload: searchValue };
}

export function setPage(page: number): {
  type: string;
  payload: number;
} {
  return { type: "SET_PAGE", payload: page };
}

export function setArtPage(artPage: number): {
  type: string;
  payload: number;
} {
  return { type: "SET_ART_PAGE", payload: artPage };
}

export function setArts(arts: Article[]): {
  type: string;
  payload: Article[];
} {
  return { type: "SET_ARTS", payload: arts };
}

export function setKolvoResults(kolvoResults: number): {
  type: string;
  payload: number;
} {
  return { type: "SET_KOLVO_RESULTS", payload: kolvoResults };
}

export function setData(data: Article[]): {
  type: string;
  payload: Article[];
} {
  return { type: "SET_DATA", payload: data };
}
