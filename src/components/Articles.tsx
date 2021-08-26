import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Article } from "../types";
import "../styles.css";

interface ArticleProps {
  articles: Article[];
  page: number;
  onChangePage: { (pageFromInput: number): void };
}

const Articles: FC<ArticleProps> = (props: ArticleProps) => {
  const { articles, page, onChangePage } = props;

  const [artPage, setArtPage] = useState<number | string>("");

  useEffect(() => {
    setArtPage(page);
  }, [page]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const regexp = /\d+/;
    const matchedValue = value.match(regexp);
    if (matchedValue) {
      const newValue = +matchedValue[0];
      onChangePage(newValue);
      setArtPage(newValue);
    } else {
      setArtPage("");
    }
  };

  return (
    <div>
      {articles.length ? (
        <div>
          <table style={{ border: "1px solid #555" }}>
            <tr style={{ border: "1px solid #888" }}>
              <td className="header_table">Title</td>
              <td className="header_table">Author</td>
              <td className="header_table">Published at</td>
              <td className="header_table">Image</td>
            </tr>
            {articles.map(
              ({ author, title, publishedAt, urlToImage }, index: number) => {
                return (
                  <tr key={index}>
                    <td className="title">{title}</td>
                    <td className="author">{author}</td>
                    <td className="date">{publishedAt}</td>
                    <td>
                      <img className="picture" src={urlToImage} alt={title} />
                    </td>
                  </tr>
                );
              }
            )}
          </table>
          <div className="str">
            <div className="nomstr_text">
              Введите номер нужной страницы и отправьте запрос ещё раз:
            </div>
            <input
              type="text"
              className="nom_str"
              value={artPage}
              onChange={handleChange}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Articles;
