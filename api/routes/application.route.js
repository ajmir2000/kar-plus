import express from "express";
import {
  AcceptApplication,
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
  RejcetApplication,
} from "../controllers/application.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/post", postApplication);
router.get("/employer/getall", verifyToken, employerGetAllApplications);
router.get("/jobseeker/getall", verifyToken, jobseekerGetAllApplications);
router.delete("/delete/:id", verifyToken, jobseekerDeleteApplication);
router.post("/accept", verifyToken, AcceptApplication);
router.post("/reject", verifyToken, RejcetApplication);

export default router;
