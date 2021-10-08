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
  publishedAt = "publishedAt"
}
export default GET200Articles;
