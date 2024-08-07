import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.css";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest.js";
import { useSelector } from "react-redux";
const Orders = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);
  const [errorUser, setErrorUser] = useState(null);
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  // console.log(data.sellerId);

  // console.log(error);

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    // console.log(order.sellerId);
    // console.log(order.buyerId);
    // console.log(currentUser.isSeller);
    console.log(order);
    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser._id === sellerId ? buyerId : sellerId,
          showIsSellerOrBuyer:
            currentUser._id === sellerId ? "seller" : "buyer",
          sellerId,
          buyerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  return (
    <div className="orders bg-white">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container p-3">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Buyer</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Contact</th>
            </tr>
            {data?.map((order) => (
              <tr key={order._id}>
                <td>{order.buyerName}</td>
                <td>
                  <img className="image" src={order.img} alt="" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  <img
                    className="message"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
