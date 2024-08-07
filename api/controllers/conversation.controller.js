import { errorHandler } from "../utils/error.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

// export const createConversation = async (req, res, next) => {
//   const newConversation = new Conversation({
//     id: req.user.isSeller
//       ? req.user.id + req.body.to
//       : req.body.to + req.user.id,
//     sellerId: req.user.isSeller ? req.user.id : req.body.to,
//     buyerId: req.user.isSeller ? req.body.to : req.user.id,
//     readBySeller: req.user.isSeller,
//     readByBuyer: !req.user.isSeller,
//   });

//   try {
//     const savedConversation = await newConversation.save();
//     res.status(201).send(savedConversation);
//   } catch (err) {
//     next(err);
//   }
// };

export const createConversation = async (req, res, next) => {
  // console.log(req.body.buyerId);

  try {
    const buyerData = await User.findById(req.body.buyerId);

    const sellerData = await User.findById(req.body.sellerId);
    const newConversation = new Conversation({
      id:
        req.body.showIsSellerOrBuyer === "seller"
          ? req.user.id + req.body.to
          : req.body.to + req.user.id,
      sellerId:
        req.body.showIsSellerOrBuyer === "seller" ? req.user.id : req.body.to,
      sellerName: sellerData.username,
      buyerId:
        req.body.showIsSellerOrBuyer === "seller" ? req.body.to : req.user.id,
      buyerName: buyerData.username,
      readBySeller: req.user.isSeller,
      readByBuyer: !req.user.isSeller,
    });

    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          // readBySeller: true,
          // readByBuyer: true,
          ...(req.body.showIsSellerOrBuyer === "seller"
            ? { readBySeller: true }
            : { readByBuyer: true }),
        },
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(errorHandler(404, "Not found!"));
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};

// export const getConversations = async (req, res, next) => {
//   try {
//     const conversations = await Conversation.find(
//       req.user.isSeller ? { sellerId: req.user.id } : { buyerId: req.user.id }
//     ).sort({ updatedAt: -1 });
//     res.status(200).send(conversations);
//     console.log(conversations);
//   } catch (err) {
//     next(err);
//   }
// };
export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.body.showIsSellerOrBuyer === "seller"
        ? { sellerId: req.user.id }
        : { buyerId: req.user.id }
    ).sort({ updatedAt: -1 });
    res.status(200).send(conversations);
    // console.log(conversations);
  } catch (err) {
    next(err);
  }
};
