import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import "../styles.css";
import { API_KEY } from "../pages/Dashboard";
import Get200Articles, { Article } from "../types";

const Details = (): JSX.Element => {
  const { id }: any = useParams();
  const [data, setData] = useState<Article[]>([]);
  const detailsReturn = async (): Promise<void> => {
    try {
      const response: AxiosResponse<Get200Articles> = await axios.get(
        `v2/everything?apiKey=${API_KEY}&qInTitle=${id}`
      );
      setData(response.data.articles);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    detailsReturn();
  }, []);
  return (
    <div className="details">
      {data[0] !== undefined ? (
        <div>
          <div className="title_details">{data[0].title}</div>
          <div className="description_details">
            Description: {data[0].description}
          </div>
          <div className="content_details">{data[0].content}</div>
          <div className="picture_det">
            <img
              className="img_details"
              src={data[0].urlToImage}
              alt={data[0].title}
            />
          </div>
          <div className="author_details">Author: {data[0].author}</div>
          <div className="date_details">{data[0].publishedAt}</div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default Details;
