import Job from "../models/job.model.js";
import { errorHandler } from "../utils/error.js";
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
    res.status(201).json({ acknowledged: true });
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

export const myJobs = async (req, res, next) => {
  const email = req.params.email;

  try {
    const jobs = await Job.find({ postedBy: email });

    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ acknowledged: true });
  } catch (error) {
    next(error);
  }
};
