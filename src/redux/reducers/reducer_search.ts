import { Article, SearchInterface } from "../../types";

export const initialState = {
  pageSize: 10,
  sortBy: "popularity",
  searchValue: "",
  page: 1,
  artPage: 1,
  arts: [] as Article[],
  kolvoResults: 0,
  data: [] as Article[],
};

export default function setSearchReducer(
  state = {
    pageSize: 10,
    sortBy: "popularity",
    searchValue: "",
    page: 1,
    artPage: 1,
    arts: [] as Article[],
    kolvoResults: 0,
    data: [] as Article[],
  },
  action: { type: string; payload: string | number | Array<Article> }
): SearchInterface {
  switch (action.type) {
    case "SET_ARTS_ON_PAGE":
      return { ...state, pageSize: action.payload as number };
    case "SET_SORT": {
      return { ...state, sortBy: action.payload as string };
    }
    case "SET_SEARCH_VALUE": {
      return { ...state, searchValue: action.payload as string };
    }
    case "SET_PAGE": {
      return { ...state, page: action.payload as number };
    }
    case "SET_ART_PAGE": {
      return { ...state, artPage: action.payload as number };
    }
    case "SET_ARTS": {
      return { ...state, arts: action.payload as Array<Article> };
    }
    case "SET_KOLVO_RESULTS": {
      return { ...state, kolvoResults: action.payload as number };
    }
    case "SET_DATA": {
      return { ...state, data: action.payload as Array<Article> };
    }
    default:
      return state;
  }
}
