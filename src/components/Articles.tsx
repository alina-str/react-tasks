import React, { ChangeEvent, FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Article, SearchInterface } from "../types";
import "../styles.css";
import { setArtPage, setPage } from "../redux/actions/action_search";

interface ArticleProps {
  articles: Article[];
}

const Articles: FC<ArticleProps> = (props: ArticleProps) => {
  const { articles } = props;
  const page = useSelector((state: SearchInterface) => state.page);
  const artPage = useSelector((state: SearchInterface) => state.artPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setArtPage(page));
  }, [dispatch, page]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const regexp = /\d+/;
    const matchedValue = value.match(regexp);
    if (matchedValue) {
      const newValue = +matchedValue[0];
      dispatch(setPage(newValue));
      dispatch(setArtPage(newValue));
    } else {
      dispatch(setArtPage(0));
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
                    <td className="title">
                      <Link to={`/details/${title}`}>{title}</Link>
                    </td>
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
