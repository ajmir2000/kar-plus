import express from "express";
import { singup, singin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", singup);
router.post("/signin", singin);

export default router;
