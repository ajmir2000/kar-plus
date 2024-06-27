import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    aboutCompany: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    companyLogo: {
      type: String,
      required: true,
    },
    salaryFrom: {
      type: String,
    },
    salaryTo: {
      type: String,
    },
    companySalary: {
      type: String,
    },
    // salaryType: {
    //   type: String,
    //   enum: ["Hourly", "Monthly", "Yearly"],
    //   required: true,
    // },
    postingDate: {
      type: Date,
      required: true,
    },

    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time"],
      required: true,
    },
    jobSummary: {
      type: String,
      required: true,
    },
    dutiesResponsibilities: {
      type: String,
      required: true,
    },
    jobRequirements: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      required: true,
    },
    employerEmail: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: [true, "Please provide a country name."],
    },
    province: {
      type: String,
      required: [true, "Please provide a province name."],
    },
    location: {
      type: String,
      required: [true, "Please provide location."],
      minLength: [10, "Location must contain at least 10 characters!"],
    },
    expired: {
      type: Boolean,
      default: false,
    },
    employerId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    closingDate: {
      type: Date,
      required: true,
    },
    vacancies: {
      type: Number,
      required: true,
    },
    yearsOfExperience: {
      type: String,
      default: "Not Specified",
    },
    probationPeriod: {
      type: String,
      default: "Not Specified",
    },
    contractType: {
      type: String,
      default: "Not Specified",
    },
    contractDuration: {
      type: String,
      default: "Not Specified",
    },
    contractExtensible: {
      type: String,
      required: true,
    },
    minimumEducation: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    jobVisitors: {
      type: Number,
      default: 0,
    },
    bookmark: {
      type: Boolean,
      default: false,
    },
    physicalRequirements: {
      type: String,
      default: "",
    },
    workingConditions: {
      type: String,
      default: "",
    },
    submissionGuideline: {
      type: String,
      default:
        "To apply for this vacancy, please use the following link: Kindly use Google Chrome Browser for smooth access. For further information please contact us at ",
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
