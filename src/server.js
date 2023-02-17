import app from "./app";
import mongoose from "mongoose";
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Database Connected");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on the Port ${PORT}`);
});
