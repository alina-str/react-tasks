import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles.css";
import { SearchInterface } from "../types";
import { asyncGetDetails } from "../redux/asyncActions/asyncActions";

const Details = (): JSX.Element => {
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state: SearchInterface) => state.data);
  useEffect(() => {
    dispatch(asyncGetDetails(id));
  }, [dispatch, id]);
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
