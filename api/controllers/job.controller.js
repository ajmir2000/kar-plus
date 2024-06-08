import Job from "../models/job.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createJob = async (req, res, next) => {
  const {
    companyLogo,
    companyName,
    description,
    employmentType,
    experienceLevel,
    jobLocation,
    jobTitle,
    maxPrice,
    minPrice,
    postedBy,
    postingDate,
    salaryType,
    skills,
  } = req.body;

  const newJob = new Job({
    companyLogo,
    companyName,
    description,
    employmentType,
    experienceLevel,
    jobLocation,
    jobTitle,
    maxPrice,
    minPrice,
    postedBy,
    postingDate,
    salaryType,
    skills,
  });

  try {
    await newJob.save();
    res.status(201).json("Job created successfully!");
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};
