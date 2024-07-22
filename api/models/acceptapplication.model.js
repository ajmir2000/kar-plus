import mongoose from "mongoose";
import validator from "validator";

const acceptapplicationSchema = new mongoose.Schema(
  {
    attachment: {
      type: String,
      required: [true, "Please upload your attachment !"],
    },
    applicationID: {
      type: String,
      required: [true, "Please upload your  applicationID!"],
    },
    desc: {
      type: String,
      required: [true, "Please upload your attachment !"],
    },
    hrName: {
      type: String,
      required: true,
    },
    jobID: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    jobSeekerID: {
      type: String,
      required: true,
    },
    jobSeekerEmail: {
      type: String,
      required: [true, "Please enter your Email!"],
      validate: [validator.isEmail, "Please provide a valid Email!"],
    },
    employerID: {
      type: String,
      required: true,
    },
    employerEmail: {
      type: String,
      required: [true, "Please enter your Email!"],
      validate: [validator.isEmail, "Please provide a valid Email!"],
    },
    allDataApplication: {
      type: Object,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const acceptApplication = mongoose.model(
  "acceptApplication",
  acceptapplicationSchema
);
export default acceptApplication;
