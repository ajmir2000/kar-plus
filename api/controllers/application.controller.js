import { errorHandler } from "../utils/error.js";
import Application from "../models/application.model.js";
import acceptApplication from "../models/acceptapplication.model.js";
import Job from "../models/job.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
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

// Start Accept Application Process

export const AcceptApplication = async (req, res, next) => {
  const userID = req.user.id;
  const { jobID, jobSeekerID, employerID } = req.body;
  const data = req.body;
  // console.log(data);

  try {
    if (!userID) {
      return next(errorHandler(400, "User Not Found."));
    }
    // const existingAcceptApp = await acceptApplication.findOne({
    //   jobID,
    //   jobSeekerID,
    //   employerID,
    // });

    // if (existingAcceptApp) {
    //   return next(
    //     errorHandler(
    //       400,
    //       "You have already send accept application for this Job Seeker."
    //     )
    //   );
    // }
    const acceptApp = await acceptApplication.create({ ...data });
    res.status(200).json({
      success: true,
      message: "Accept Application Submitted!",
      acceptApp,
    });

    // Start nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      // port: 587,
      port: 456,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.USER, // Sender gmail address
        pass: process.env.APP_PASSWORD, // App passwoed from Gmail Account
      },
    });

    const mailOptions = {
      from: { name: "KarPlus", address: process.env.USER }, // sender address
      to: "ajmerfaqiri14.af@gmail.com", // list of receivers
      subject: "Congratulations You Select of this Job", // Subject line
      text: "Hello world? Congratulations You Select of this Job Congratulations You Select of this Job", // plain text body
      html: "<b>Hello world?Congratulations You Select of this JobCongratulations You Select of this JobCongratulations You Select of this Job</b>", // html body
      attachments: [
        {
          filename: "test1.pdf",
          path: "https://firebasestorage.googleapis.com/v0/b/karplus-b0704.appspot.com/o/acceptApplicationFiles%2F1721669051511Motor-Vehicle-Repair-Garage-License.pdf?alt=media&token=490d1c64-e849-40d6-9f6b-f402836248d7",
          contentType: "application/pdf",
        },
        // {
        //   filename: "test1.doc",
        //   path: "https://firebasestorage.googleapis.com/v0/b/karplus-b0704.appspot.com/o/acceptApplicationFiles%2F1721669051511Motor-Vehicle-Repair-Garage-License.pdf?alt=media&token=490d1c64-e849-40d6-9f6b-f402836248d7",contentType:"application/pdf"
        // },
      ],
    };

    const sendMail = async (transporter, mailOptions) => {
      try {
        await transporter.sendMail(mailOptions);
        console.log("Email has been sent");
      } catch (error) {
        console.log(error);
        console.error(error);
      }
    };
    sendMail(transporter, mailOptions);
  } catch (error) {
    next(error);
  }
};

export const RejcetApplication = async (req, res, next) => {
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
// End Accept Application Process
