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
app.get("/api/v1/highest", async (req, res) => {
  const data = await readCSV("galamsay_data.csv");

  const regionHighestGalamsay = data.reduce(
    (previousRegion, currentRegion) => {
      const numberOfGalamsaySites = Number(
        currentRegion.Number_of_Galamsay_Sites
      );
      if (
        typeof numberOfGalamsaySites === "number" &&
        numberOfGalamsaySites > previousRegion.Number_of_Galamsay_Sites
      ) {
        return currentRegion;
      }
      return previousRegion;
    },
    { City: "", Region: "", Number_of_Galamsay_Sites: 0 }
  );
  res.json(regionHighestGalamsay);
});

app.get("/api/v1/exceeds", async (req, res) => {
  const data = await readCSV("galamsay_data.csv");
  const threshold = 10;
  const exceedsMin = data.filter(
    (site) => Number(site.Number_of_Galamsay_Sites) > threshold
  );
  res.json(exceedsMin);
});

app.get("/api/v1/average", async (req, res) => {
  const data = await readCSV("galamsay_data.csv");
  // Create an object to store regional totals and counts
  const regionalStats = {};

  // Aggregate data by region
  data.forEach((site) => {
    const region = site.Region;
    const sites = parseInt(site.Number_of_Galamsay_Sites);

    if (!regionalStats[region]) {
      regionalStats[region] = {
        totalSites: 0,
        cityCount: 0,
      };
    }

    regionalStats[region].totalSites += sites;
    regionalStats[region].cityCount += 1;
  });

  // Calculate averages and format results
  const averages = Object.entries(regionalStats).map(([region, stats]) => ({
    region,
    average: (stats.totalSites / stats.cityCount).toFixed(2),
    totalSites: stats.totalSites,
    cityCount: stats.cityCount,
  }));

  // Sort by average in descending order
  const result = averages.sort((a, b) => b.average - a.average);
  res.json(result);
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on port ${port}!`);
});
