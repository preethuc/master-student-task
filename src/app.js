import express from "express";
import morgan from "morgan";
import userRoute from "./route/auth-user-route";
import calcRoute from "./route/calculation-route"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Middleware working");
  next();
});

app.use("/api/user", userRoute);
app.use("/api/calc", calcRoute);


module.exports = app;
