import express from "express";
import morgan from "morgan";
import { readCSV } from "./analyzeData.js";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));

// Logging middleware for development environments
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//api Routes
app.get("/api/v1/total-galamsay-sites", async (req, res) => {
  const data = await readCSV("galamsay_data.csv");
  const totalGalamsaySites = data.reduce((total, currValue) => {
    //check if Number_of_galamsay_sites is a number'
    const numberOfGalamsaySites = Number(currValue.Number_of_Galamsay_Sites);
    if (!isNaN(numberOfGalamsaySites) && numberOfGalamsaySites > 0) {
      return total + numberOfGalamsaySites;
    } else {
      console.warn(
        `Invalid number of galamsay site for cite: ${currValue.City}`
      );
      return total; // Skip invalid salaries
    }
  }, 0);
  console.log(totalGalamsaySites);
  res.json({ totalGalamsaySites });
});
app.get("/api/v1/region", (req, res) => {
  res.json({ regionHighestGalamsay: "will show here" });
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on port ${port}!`);
});
