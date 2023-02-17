import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    role: {
        type: String,
        enum:["student","master"]
    },
    email_id: {
      type: String,
    },
    password: {
      type: String,
    },
    logged_in: {
      type: Boolean,
      default: false,
    },
    auth_token: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
