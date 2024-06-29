import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createJob,
  deleteJob,
  editJob,
  getAllJobs,
  getJobById,
  myJobs,
} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/create-job", createJob);
router.get("/all-job", getAllJobs);
router.get("/my-job/:id", myJobs);
router.delete("/delete/:id", deleteJob);
// get single job using id
router.get("/all-job/:id", getJobById);
// edit job using id
router.post("/edit-job/:id", editJob);

export default router;
