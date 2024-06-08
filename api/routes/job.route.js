import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createJob } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/create-job", createJob);
// router.post('/update/:id', verifyToken, func)
// router.delete('/delete/:id', verifyToken, func)

export default router;
