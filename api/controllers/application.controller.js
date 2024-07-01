import { errorHandler } from "../utils/error.js";
import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const postApplication = async (req, res, next) => {
  const {
    username,
    emailJobSeeker,
    address,
    coverLetter,
    resume,
    jobSeekerId,
    phone,
    role,
    jobID,
  } = await req.body;
  // console.log(jobID);
  // console.log(role)
  console.log(resume);
  try {
    if (role === "Employer") {
      return next(
        errorHandler(400, "Employer not allowed to access this resource.")
      );
    }

    if (!jobID) {
      return next(errorHandler(404, "Job not found!"));
    }

    const jobDetails = await Job.findById(jobID);

    if (!jobDetails) {
      return next(errorHandler(404, "Job Details not found!"));
    }
    const existingApplication = await Application.findOne({
      jobID,
      "jobSeekerID.userID": jobSeekerId,
    });

    if (existingApplication) {
      return next(errorHandler(400, "You have already applied for this job."));
    }

    const employerID = {
      userID: jobDetails.employerId,
      email: jobDetails.employerEmail,
      role: "Employer",
    };
    const jobSeekerID = {
      userID: jobSeekerId,
      email: emailJobSeeker,
      role: "Job Seeker",
    };
    const {
      vacancies,
      closingDate,
      location,
      country,
      province,
      jobTitle,
      companyName,
    } = jobDetails;

    // if (
    //   !name ||
    //   !email ||
    //   !coverLetter ||
    //   !phone ||
    //   !address ||
    //   !applicantID ||
    //   !employerID ||
    //   !resume
    // ) {
    //   return next(errorHandler(400, "Please fill all fields."));
    // }
    console.log(resume);
    const application = await Application.create({
      username,
      emailJobSeeker,
      jobSeekerID,
      address,
      coverLetter,
      resume,
      jobSeekerId,
      phone,
      role,
      jobID,
      employerID,
      vacancies,
      closingDate,
      location,
      country,
      province,
      jobTitle,
      companyName,
    });
    res.status(200).json({
      success: true,
      message: "Application Submitted!",
      application,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const employerGetAllApplications = async (req, res, next) => {
  const _id = req.user.id;

  try {
    if (!_id) {
      return next(errorHandler(404, "User not Found."));
    }
    // const jobDetails = await Job.find({ employerID: _id });
    const applications = await Application.find({ "employerID.userID": _id });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const jobseekerGetAllApplications = async (req, res, next) => {
  const _id = req.user.id;

  try {
    if (!_id) {
      return next(errorHandler(400, "User not Found."));
    }

    const applications = await Application.find({ "jobSeekerID.userID": _id });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

export const jobseekerDeleteApplication = async (req, res, next) => {
  const userID = req.user.id;
  const { id } = req.params;

  try {
    if (!userID) {
      return next(errorHandler(400, "User Not Found."));
    }
    const application = await Application.findById(id);
    if (!application) {
      return next(errorHandler(404, "Application not found!"));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  } catch (error) {
    next(error);
  }
};
