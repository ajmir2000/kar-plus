// import React from "react";
// import "./Gig.css";
// import { Slider } from "infinite-react-carousel/lib";
// import { Link, useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../../utils/newRequest.js";
// import Reviews from "../../../components/TalentComponents/reviews/Reviews.jsx";
// import Carousel from "react-bootstrap/Carousel";
// // import ExampleCarouselImage from "components/ExampleCarouselImage";

// function Gig() {
//   const { id } = useParams();
//   console.log(id);

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["gig"],
//     queryFn: () =>
//       newRequest.get(`/gigs/single/${id}`).then((res) => {
//         return res.data;
//       }),
//   });

//   const userId = data?.userId;
//   console.log(data);

//   const {
//     isLoading: isLoadingUser,
//     error: errorUser,
//     data: dataUser,
//   } = useQuery({
//     queryKey: ["user"],
//     queryFn: () =>
//       newRequest.get(`/user/${userId}`).then((res) => {
//         return res.data;
//       }),
//     enabled: !!userId,
//   });

//   console.log(data);

//   return (
//     <div className="gig bg-white">
//       {isLoading ? (
//         "loading"
//       ) : error ? (
//         "Something went wrong!"
//       ) : (
//         <div className="container row">
//           <div className="left col-12 col-md-7 col-lg-9 w-75 ">
//             <h1>{data.title}</h1>
//             {isLoadingUser ? (
//               "loading"
//             ) : errorUser ? (
//               "Something went wrong!"
//             ) : (
//               <div className="user">
//                 <img
//                   className="pp"
//                   src={dataUser.img || "/img/noavatar.jpg"}
//                   alt=""
//                 />
//                 <span>{dataUser.username}</span>
//                 {!isNaN(data.totalStars / data.starNumber) && (
//                   <div className="stars">
//                     {Array(Math.round(data.totalStars / data.starNumber))
//                       .fill()
//                       .map((item, i) => (
//                         <img src="/img/star.png" alt="" key={i} />
//                       ))}
//                     <span>{Math.round(data.totalStars / data.starNumber)}</span>
//                   </div>
//                 )}
//               </div>
//             )}
//             <Slider slidesToShow={1} arrowsScroll={1} className="">
//               {data.images.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img}
//                   class="img-fluid"
//                   alt="Responsive image"
//                 />
//               ))}
//             </Slider>

//             <h2>About This Gig</h2>

//             <div className="text-wrap w-100 text-break">
//               <p>{data.desc}</p>
//             </div>
//             {isLoadingUser ? (
//               "loading"
//             ) : errorUser ? (
//               "Something went wrong!"
//             ) : (
//               <div className="seller">
//                 <h2>About The Seller</h2>
//                 <div className="user">
//                   <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
//                   <div className="info">
//                     <span>{dataUser.username}</span>
//                     {!isNaN(data.totalStars / data.starNumber) && (
//                       <div className="stars">
//                         {Array(Math.round(data.totalStars / data.starNumber))
//                           .fill()
//                           .map((item, i) => (
//                             <img src="/img/star.png" alt="" key={i} />
//                           ))}
//                         <span>
//                           {Math.round(data.totalStars / data.starNumber)}
//                         </span>
//                       </div>
//                     )}
//                     {/* <button>Contact Me</button> */}
//                   </div>
//                 </div>
//                 {/* <div className="box">
//                   <div className="items">
//                     <div className="item">
//                       <span className="title">From</span>
//                       <span className="desc">{dataUser.country}</span>
//                     </div>
//                     <div className="item">
//                       <span className="title">Member since</span>
//                       <span className="desc">Aug 2022</span>
//                     </div>
//                     <div className="item">
//                       <span className="title">Avg. response time</span>
//                       <span className="desc">4 hours</span>
//                     </div>
//                     <div className="item">
//                       <span className="title">Last delivery</span>
//                       <span className="desc">1 day</span>
//                     </div>
//                     <div className="item">
//                       <span className="title">Languages</span>
//                       <span className="desc">English</span>
//                     </div>
//                   </div>
//                   <hr />
//                   <p>{dataUser.desc}</p>
//                 </div> */}
//               </div>
//             )}
//             <Reviews gigId={id} />
//           </div>
//           <div className="right col-12 col-md-5 col-lg-3  w-75">
//             <div className="price">
//               <h3>{data.shortTitle}</h3>
//               <h2>&#1547;{data.price}</h2>
//             </div>
//             <div className="text-wrap w-100 text-break">
//               <p>{data.shortDesc}</p>
//             </div>
//             <div className="details">
//               <div className="item">
//                 <img src="/img/clock.png" alt="" />
//                 <span>{data.deliveryDate} Days Delivery</span>
//               </div>
//               <div className="item">
//                 <img src="/img/recycle.png" alt="" />
//                 <span>{data.revisionNumber} Revisions</span>
//               </div>
//             </div>
//             <div className="features">
//               {data.features.map((feature, index) => (
//                 <div className="item" key={index}>
//                   <img src="/img/greencheck.png" alt="" />
//                   <span>{feature.label}</span>{" "}
//                   {/* Updated to render feature.label */}
//                 </div>
//               ))}
//             </div>
//             <Link to={`/create-order/${id}`}>
//               <button>Continue</button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Gig;

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
  console.log(data);

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

  console.log(data);

  return (
    <div className="gig bg-white">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container row">
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
                  src={dataUser.img || "/img/noavatar.jpg"}
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
          <div className="right col-12 col-md-5 col-lg-3  w-75">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2 >&#1547;{data.price}</h2>
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
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
