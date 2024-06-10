import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  myJobs,
  updateJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/create-job", createJob);
router.get("/all-job", getAllJobs);
router.get("/my-job/:email", myJobs);
router.delete("/delete/:id", deleteJob);
// get single job using id
router.get("/all-job/:id", updateJob);

export default router;
