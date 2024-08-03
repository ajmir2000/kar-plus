import express from "express";
import {
  AcceptApplication,
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
  RejcetApplication,
  sendReport,
} from "../controllers/application.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/post", postApplication);
router.get("/employer/getall", verifyToken, employerGetAllApplications);
router.get("/jobseeker/getall", verifyToken, jobseekerGetAllApplications);
router.delete("/delete/:id", verifyToken, jobseekerDeleteApplication);
// this part is for accept or reject with nodemailer
router.post("/accept", verifyToken, AcceptApplication);
router.post("/reject", verifyToken, RejcetApplication);
// this part is for users report
router.post("/report", sendReport);
export default router;
