import React from "react";
import "./Gig.css";
import { Carousel } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest.js";
import Reviews from "../../../components/TalentComponents/reviews/Reviews.jsx";

function Gig() {
  const { id } = useParams();
  console.log(id);

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/user/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  console.log(dataUser);
  return (
    <div className="gig bg-white ">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container row px-2 px-md-4 py-3 gx-0 px-4">
          <div className="left col-12 col-md-7 col-lg-9 w-75 ">
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.avatar || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}

            <Carousel>
              {data.images.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={img}
                    alt={`Slide ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>

            <h2>About This Gig</h2>

            <div className="text-wrap w-100 text-break">
              <p>{data.desc}</p>
            </div>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    {/* <button>Contact Me</button> */}
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className="right col-12 col-md-5 col-lg-3  w-75  ms-md-5 ">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>&#1547;{data.price}</h2>
            </div>
            <div className="text-wrap w-100 text-break">
              <p>{data.shortDesc}</p>
            </div>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature, index) => (
                <div className="item" key={index}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature.label}</span>{" "}
                  {/* Updated to render feature.label */}
                </div>
              ))}
            </div>
            <Link to={`/create-order/${id}`}>
              <button className="mb-5">Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
