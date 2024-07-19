import { errorHandler } from "../utils/error.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
// import Stripe from "stripe";

export const createOrder = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    // I will add a condition to prevent send order more than one time
    // const orders = await Order.find(buyerId: req.user.id);

    if (req.user.id === gig.userId) {
      return next(
        errorHandler(401, "You Are Owner Of Gig, You Can't Orederd ")
      );
    }

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.user.id,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: "temporary",
      fullName: req.body.fullName,
      companyName: req.body.companyName,
      country: req.body.country,
      city: req.body.city,
      details: req.body.details,
    });

    await newOrder.save();
    
    res.status(201).json({ acknowledged: true });
  } catch (err) {
    next(err);
    
  }
};

// export const intent = async (req, res, next) => {
//   const stripe = new Stripe(process.env.STRIPE);

//   const gig = await Gig.findById(req.params.id);

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: gig.price * 100,
//     currency: "usd",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   const newOrder = new Order({
//     gigId: gig._id,
//     img: gig.cover,
//     title: gig.title,
//     buyerId: req.user.id,
//     sellerId: gig.userId,
//     price: gig.price,
//     payment_intent: paymentIntent.id,
//   });

//   await newOrder.save();

//   res.status(200).send({
//     clientSecret: paymentIntent.client_secret,
//   });
// };

export const getOrders = async (req, res, next) => {
  try {

    console.log(req.user.isSeller)
    console.log(req.user.id)

    // console.log(req.user.isSeller)
    // const orders = await Order.find({
    //   ...(req.user.isSeller
    //     ? { sellerId: req.user.id }
    //     : { buyerId: req.user.id }),
    //     isCompleted: true,
    //   });
      const orders = await Order.find({
        ...(req.user.isSeller
          ? { sellerId: req.user.id }
          : { buyerId: req.user.id }),
          isCompleted: true,
        });
      console.log("getOrders");
      console.log(orders)

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};


export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};
