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
      required: true,
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
    experienceLevel: {
      type: String,
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
      type: [String],
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
    provinces: {
      type: String,
      required: [true, "Please provide a city name."],
    },
    location: {
      type: String,
      required: [true, "Please provide location."],
      minLength: [20, "Location must contain at least 20 characters!"],
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
      type: Number,
      default: "Not Specified",
    },
    probationPeriod: {
      type: Number,
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
    functionalArea: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
