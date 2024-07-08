import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.route.js";
//Talent Part
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";

import cookieParser from "cookie-parser";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
// this package get the cookie from local PC of user
app.use(cookieParser());

app.listen(3000, () => {
  console.log("server is running on port 3000 !!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);
// Talent part
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
