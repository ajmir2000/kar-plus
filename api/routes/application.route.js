import express from "express";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
} from "../controllers/application.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/post", verifyToken, postApplication);
router.get("/employer/getall", verifyToken, employerGetAllApplications);
router.get("/jobseeker/getall", verifyToken, jobseekerGetAllApplications);
router.delete("/delete/:id", verifyToken, jobseekerDeleteApplication);

export default router;
