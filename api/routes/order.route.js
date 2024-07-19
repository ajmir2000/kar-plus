import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  getOrders,
  confirm,
  createOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

// router.post("/create-payment-intent/:id", verifyToken, intent);
router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.put("/", verifyToken, confirm);

export default router;
