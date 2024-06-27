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
    minPrice: {
      type: String,
      required: true,
    },
    maxPrice: {
      type: String,
      required: true,
    },
    companySalary: {
      type: String,
      require: true,
    },
    // salaryType: {
    //   type: String,
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
      require: true,
    },
    employerEmail: {
      type: String,
      require: true,
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
      minLength: [10, "Location must contian at least 20 characters!"],
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
      type: String,
      require: true,
    },
    vacancies: {
      type: Number,
      require: true,
    },
    yearsofExperience: {
      type: Number,
      require: true,
    },
    probationPeriod: {
      type: String,
      default: "Not Specified",
    },
    contractType: {
      type: String,
      require: true,
    },
    contractDuration: {
      type: String,
      default: "Not Specified",
    },
    contractExtensible: {
      type: String,
      require: true,
    },
    minimumEducation: { type: String, require: true },
    gender: {
      type: String,
      require: true,
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
        "To apply for this vacancy, please use the following link: Kindly use Google Chrome Browser for smooth access For further information please contact us at ",
    },
    functionalArea: {
      type: Array,
      require: true,
    },
  },

  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
