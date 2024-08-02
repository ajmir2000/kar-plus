import React from "react";
import "./GigCard.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest.js";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/user/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  console.log(item);

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard card mb-4">
        <img src={item.cover} className="card-img-top" alt="" />
        <div className="card-body d-flex flex-column justify-content-between">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Something went wrong!</div>
          ) : (
            <div className="user d-flex align-items-center gap-2 mb-3">
              <img
                src={data.img || "/img/noavatar.jpg"}
                className="rounded-circle"
                alt=""
              />
              <span>{data.username}</span>
            </div>
          )}

          <p className="card-text">{item.shortDesc}</p>
          <div className="star d-flex align-items-center justify-content-between">
            <div>
              <img src="./img/star.png" alt="" />
              <span>
                {!isNaN(item.totalStars / item.starNumber) &&
                  Math.round(item.totalStars / item.starNumber)}
              </span>
            </div>

            <div className="price text-end">
              <span className="text-muted px-2">STARTING AT</span>
              <h2 className="mt-2"> {item.price} &#1547;</h2>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
