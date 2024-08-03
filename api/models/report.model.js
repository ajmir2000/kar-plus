import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      default: "",
    },
    report: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
