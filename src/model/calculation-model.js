import mongoose from "mongoose";

const calculationSchema = new mongoose.Schema(
  {
    student: {
      type: String,
      required: true,
    },
    master_input: {
      type: String,
    },
    result: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const Calculation = mongoose.model("Calculation", calculationSchema);

module.exports = Calculation;
