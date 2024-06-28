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
    // console.log(jobDetails);
    // console.log(name, address, coverletter, resume, jobSeekerId, phone, role);
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
    });
    res.status(200).json({
      success: true,
      message: "Application Submitted!",
      application,
    });
  } catch (error) {
    next(error);
    // console.log(error);
  }
};

export const employerGetAllApplications = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        errorHandler(400, "Job Seeker not allowed to access this resource.")
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

export const jobseekerGetAllApplications = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        errorHandler(400, "Employer not allowed to access this resource.")
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

export const jobseekerDeleteApplication = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        errorHandler(400, "Employer not allowed to access this resource.")
      );
    }
    const { id } = req.params;
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
