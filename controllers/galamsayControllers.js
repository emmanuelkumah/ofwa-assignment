import { readCSV } from "../analyzeData.js";
import GalamsaySiteModel from "../model/GalamsaySiteModel.js";

export const getAllData = async (req, res) => {
  // connect to the MongoDB database and retrieve all documents in the collection
  const galamsaySitesData = await GalamsaySiteModel.find({});
  res.json({ galamsaySitesData });
};

export const getTotalGalamsaySites = async (req, res) => {
  const galamsaySitesData = await GalamsaySiteModel.find({});

  /*
   * Iterate over the galamsaySitesData and get the total number of galamsay sites
   * Convert the value of Number_of_Galamsay_Sites to a number
   * Ignore the values that are not valid numbers
   * Sum and return the total number of galamsay sites
   */
  const totalGalamsaySites = galamsaySitesData.reduce((total, currValue) => {
    const numberOfGalamsaySites = Number(currValue.Number_of_Galamsay_Sites);
    if (!isNaN(numberOfGalamsaySites) && numberOfGalamsaySites > 0) {
      return total + numberOfGalamsaySites;
    } else {
      console.warn(
        `Invalid number of galamsay site for cite: ${currValue.City}`
      );
      return total;
    }
  }, 0);
  res.json({ totalGalamsaySites });
};

export const getAverageSitePerRegion = async (req, res) => {
  const galamsaySitesData = await GalamsaySiteModel.find({});
  //Calculate the average number of galamsay sites per region by dividing the totalSites by cityCount for each region

  const regionalStats = {};

  // Aggregate data by region
  galamsaySitesData.forEach((site) => {
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
    averageGalamsaySites: (stats.totalSites / stats.cityCount).toFixed(2),
  }));

  // Sort by average in descending order
  const result = averages.sort(
    (a, b) => b.averageGalamsaySites - a.averageGalamsaySites
  );
  res.json(result);
};

export const getRegionWithHighestGalamsaySites = async (req, res) => {
  const galamsaySitesData = await GalamsaySiteModel.find({});
  // if  number of galamsay sites for the current region is greater than previous return the current region
  const regionHighestGalamsay = galamsaySitesData.reduce(
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
};

export const getCitiesWithSitesGreaterThanTen = async (req, res) => {
  const galamsaySitesData = await GalamsaySiteModel.find({});
  const threshold = 10;
  //filter galamsaySites with number of sites greater than 10
  const exceedsMin = galamsaySitesData.filter(
    (data) => Number(data.Number_of_Galamsay_Sites) > threshold
  );
  res.json(exceedsMin);
};
