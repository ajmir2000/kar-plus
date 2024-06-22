import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    companyName: {
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
    salaryType: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
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
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      require: true,
    },
    postedBy: {
      type: String,
      require: true,
      unique: true,
    },
    country: {
      type: String,
      required: [true, "Please provide a country name."],
    },
    city: {
      type: String,
      required: [true, "Please provide a city name."],
    },
    location: {
      type: String,
      required: [true, "Please provide location."],
      minLength: [20, "Location must contian at least 20 characters!"],
    },
    expired: {
      type: Boolean,
      default: false,
    },
    postedId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
