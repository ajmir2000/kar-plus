import express from "express";
import {
  deleteUser,
  getUser,
  getUserWithoutID,
  test,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.post("/get-user", getUserWithoutID);

export default router;
