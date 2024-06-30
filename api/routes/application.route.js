import express from "express";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
} from "../controllers/application.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/post", postApplication);
router.delete("/delete/:id", jobseekerDeleteApplication);
router.get("/employer/getall", verifyToken, employerGetAllApplications);
router.get("/jobseeker/getall", jobseekerGetAllApplications);

export default router;
