import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  accept: {
    type: Boolean,
    default: false,
  },
  reject: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },

  resume: {
    type: String,
    required: [true, "Please upload your CV !"],
    // required: true,
  },
  jobID: {
    type: String,
    required: true,
  },
  vacancies: {
    type: Number,
    required: true,
  },
  closingDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: [true, "Please provide location."],
    minLength: [10, "Location must contain at least 10 characters!"],
  },
  country: {
    type: String,
    required: [true, "Please provide a country name."],
  },
  province: {
    type: String,
    required: [true, "Please provide a province name."],
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
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your Email!"],
      validate: [validator.isEmail, "Please provide a valid Email!"],
    },
  },
  employerID: {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your Email!"],
      validate: [validator.isEmail, "Please provide a valid Email!"],
    },
  },
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
