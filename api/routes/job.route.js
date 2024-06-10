import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  myJobs,
} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/create-job", createJob);
router.get("/all-job", getAllJobs);
router.get("/my-job/:email", myJobs);
router.delete("/delete/:id", deleteJob);
// router.post('/update/:id', verifyToken, func)

export default router;
