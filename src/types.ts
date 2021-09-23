export interface Article {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  urlToImage: string;
}

interface GET200Articles {
  articles: Article[];
  totalResults: number;
}

export enum SortType {
  relevancy = "relevancy",
  popularity = "popularity",
  publishedAt = "publishedAt",
}

export interface SearchInterface {
  pageSize: number;
  sortBy: string;
  searchValue: string;
  page: number;
  artPage: number;
  arts: Array<Article>;
  kolvoResults: number;
  data: Array<Article>;
}

export default GET200Articles;
