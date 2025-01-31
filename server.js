import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import apiRouter from "./routes/apiRouter.js";
import { readCSV } from "./analyzeData.js";
import GalamsaySiteModel from "./model/GalamsaySiteModel.js";
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

//handle not resource not found errors
app.use("*", (req, res) => {
  res.status(404).json({ msg: "page not found" });
});
const port = process.env.PORT || 3000;

//connect to database
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  //insert read data to database
  //   const data = await readCSV("galamsay_data.csv");
  //   const result = await GalamsaySiteModel.insertMany(data);
} catch (error) {
  console.log(error);
  process.exit(1);
}

export default app; // Use ES module export
