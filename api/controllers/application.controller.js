import { errorHandler } from "../utils/error.js";
import Application from "../models/application.model.js";
import acceptApplication from "../models/acceptapplication.model.js";
import Job from "../models/job.model.js";
import Report from "../models/report.model.js";
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
  const {
    jobID,
    jobSeekerID,
    employerID,
    jobSeekerEmail,
    desc,
    jobTitle,
    companyName,
    applicationID,
  } = req.body;
  const data = req.body;
  // console.log(data);
  const urlAttachment = req.body.attachment;

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

    const getFileType = (url) => {
      const extension = url.split("?")[0].split(".").pop();
      return extension.toLowerCase();
    };
    const fileType = getFileType(urlAttachment);
    const arra =
      fileType === "pdf"
        ? [
            {
              filename: `attachment.pdf`,
              path: urlAttachment,
              contentType: "application/pdf",
            },
          ]
        : fileType === "docx"
        ? [
            {
              filename: `attachment.docx`,
              filename: `attachment.docx`,
              path: urlAttachment,
              contentType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            },
          ]
        : fileType === "doc"
        ? [
            {
              filename: `attachment.doc`,
              path: urlAttachment,
              contentType: "application/msword",
            },
          ]
        : [];
    const acceptTrue = async () => {
      try {
        const updateApplicationID = await Application.findByIdAndUpdate(
          applicationID,
          {
            $set: {
              accept: true,
            },
          },
          { new: true }
        );
        // console.log(updateApplicationID);
      } catch (error) {
        console.log(error);
      }
    };

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

    // console.log(desc);
    const mailOptions = {
      from: { name: "KarPlus", address: process.env.USER }, // sender address
      to: jobSeekerEmail, // list of receivers
      subject: `Congratulations You Select as ${jobTitle} in ${companyName} Company`, // Subject line
      text: desc, // plain text body
      html: `<b>${desc}</b>`, // html body
      attachments: arra,
    };

    const sendMail = async (transporter, mailOptions) => {
      try {
        await transporter.sendMail(mailOptions);
        acceptTrue();
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
  const { jobSeekerEmail, jobTitle, companyName, applicationID } = req.body;
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

    const rejectTrue = async () => {
      try {
        const updateApplicationID = await Application.findByIdAndUpdate(
          applicationID,
          {
            $set: {
              reject: true,
            },
          },
          { new: true }
        );
        // console.log(updateApplicationID);
      } catch (error) {
        console.log(error);
      }
    };

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

    // console.log(desc);
    const mailOptions = {
      from: { name: "KarPlus", address: process.env.USER }, // sender address
      to: jobSeekerEmail, // list of receivers
      subject: `Unfortunately, You did NOT select as ${jobTitle} in ${companyName} Company.`, // Subject line
      text: `Dear Applicant,

We regret to inform you that your application for the position of ${jobTitle} at ${companyName} has not been selected for further consideration at this time.

While your qualifications were reviewed carefully, we have decided to move forward with candidates whose backgrounds more closely align with the specific requirements of this role.

We appreciate your interest in our company and wish you the best in your future job search endeavors.

Sincerely,
The HR Team
${companyName}`, // plain text body
      html: `<b><p>Dear Applicant, </p>

We regret to inform you that your application for the position of ${jobTitle} at ${companyName} has not been selected for further consideration at this time.

While your qualifications were reviewed carefully, we have decided to move forward with candidates whose backgrounds more closely align with the specific requirements of this role.

We appreciate your interest in our company and wish you the best in your future job search endeavors.

 <p>Sincerely,</p>
<p>The HR Team</p>
<p>${companyName}</p>
</b>`, // html body
    };

    const sendMail = async (transporter, mailOptions) => {
      try {
        await transporter.sendMail(mailOptions);
        rejectTrue();
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
// End Accept Application Process

// Start Report
export const sendReport = async (req, res, next) => {
  const { userID, report } = req.body;
  try {
    const createReport = await Report.create({
      userID,
      report,
    });
    res.status(200).json({
      success: true,
      message: "Report Submitted!",
    });
    // send email

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

    // console.log(desc);
    const mailOptions = {
      from: { name: "KarPlus", address: process.env.USER }, // sender address
      to: process.env.USER, // list of receivers
      subject: `Report from this ID ${userID}`, // Subject line
      text: report, // plain text body
      html: `<b>${report}</b>`, // html body
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
    console.log(error);
  }
};

// End Report
