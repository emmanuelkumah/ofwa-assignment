import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import apiRouter from "./routes/apiRouter.js";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/galamsay", apiRouter);

// Logging middleware for development environments
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 3000;

//connect to database
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
