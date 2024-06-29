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
    location,
    country,
    province,
    jobTitle,
    employerEmail,
    postingDate,
    skills,
    employerId,
    aboutCompany,
    salaryType,
    salaryFrom,
    salaryTo,
    companySalary,
    jobSummary,
    dutiesResponsibilities,
    jobRequirements,
    provinces,
    closingDate,
    vacancies,
    yearsOfExperience,
    probationPeriod,
    contractType,
    contractDuration,
    contractExtensible,
    minimumEducation,
    gender,
    jobVisitors,
    bookmark,
    physicalRequirements,
    workingConditions,
    submissionGuideline,
    employerID,
  } = req.body;
  // if (
  //   !companyLogo ||
  //   !companyName ||
  //   !description ||
  //   !employmentType ||
  //   !experienceLevel ||
  //   !location ||
  //   !country ||
  //   !province ||
  //   !jobTitle ||
  //   !maxPrice ||
  //   !minPrice ||
  //   !employerEmail ||
  //   !postingDate ||
  //   !salaryType ||
  //   !skills ||
  //   !employerId
  // ) {
  //   return next(errorHandler(404, "Please fill all filed"));
  // }
  console.log(employerId);
  const newJob = new Job({
    companyLogo,
    companyName,
    description,
    employmentType,
    experienceLevel,
    location,
    country,
    province,
    jobTitle,
    employerEmail,
    postingDate,
    skills,
    employerId,
    aboutCompany,
    salaryType,
    salaryFrom,
    salaryTo,
    companySalary,
    jobSummary,
    dutiesResponsibilities,
    jobRequirements,
    provinces,
    closingDate,
    vacancies,
    yearsOfExperience,
    probationPeriod,
    contractType,
    contractDuration,
    contractExtensible,
    minimumEducation,
    gender,
    jobVisitors,
    bookmark,
    physicalRequirements,
    workingConditions,
    submissionGuideline,
    employerID,
  });

  try {
    await newJob.save();
    res.status(201).json({ acknowledged: true });
  } catch (error) {
    next(error);
    console.log(error);
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
  const userID = req.params.id;
  console.log(userID);
  try {
    // const jobs = await Job.find({ postedBy: email }).sort({ createdAt: -1 });
    const jobs = await Job.find({ employerID: userID }).sort({
      createdAt: -1,
    });
    // console.log(jobs);
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
    // console.log(error);
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

export const getJobById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

export const editJob = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (updatedJob) {
      res.json({ acknowledged: true, job: updatedJob });
    } else {
      res.status(404).json({ acknowledged: false, message: "Job not found" });
    }
  } catch (error) {
    next(error);
  }
};
