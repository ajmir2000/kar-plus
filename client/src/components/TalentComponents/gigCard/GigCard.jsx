import React from "react";
import "./GigCard.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest.js";
// import { useSelector } from "react-redux";

const GigCard = ({ item }) => {
  // const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser._id)
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard card mb-4">
        <img src={item.cover} className="card-img-top" alt="" />
        <div className="card-body">
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
          <p className="card-text">{item.desc}</p>
          <div className="star d-flex align-items-center gap-2">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="card-body d-flex align-items-center justify-content-between">
          <img src="./img/heart.png" className="gigCard-icon" alt="" />
          <div className="price text-end">
            <span className="text-muted">STARTING AT</span>
            <h2 className="mb-0">$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
