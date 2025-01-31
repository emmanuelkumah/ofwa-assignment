import { readCSV } from "../analyzeData.js";
import GalamsaySiteModel from "../model/GalamsaySiteModel.js";

export const getAllData = async (req, res) => {
  const galamsaySitesData = await GalamsaySiteModel.find({});
  res.json({ galamsaySitesData });
};

export const getTotalGalamsaySites = async (req, res) => {
  const galamsaySitesData = await GalamsaySiteModel.find({});
  //   const data = await readCSV("galamsay_data.csv");
  const totalGalamsaySites = galamsaySitesData.reduce((total, currValue) => {
    //check if Number_of_galamsay_sites is a number'
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
  //   const data = await readCSV("galamsay_data.csv");
  const galamsaySitesData = await GalamsaySiteModel.find({});

  // Create an object to store regional totals and counts
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
    average: (stats.totalSites / stats.cityCount).toFixed(2),
    totalSites: stats.totalSites,
    cityCount: stats.cityCount,
  }));

  // Sort by average in descending order
  const result = averages.sort((a, b) => b.average - a.average);
  res.json(result);
};

export const getRegionWithHighestGalamsaySites = async (req, res) => {
  const galamsaySitesData = await GalamsaySiteModel.find({});

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

//cities with more than 10 galamsay sites
export const getCitiesWithSitesGreaterThanTen = async (req, res) => {
  const galamsaySitesData = await GalamsaySiteModel.find({});
  const threshold = 10;
  const exceedsMin = galamsaySitesData.filter(
    (site) => Number(site.Number_of_Galamsay_Sites) > threshold
  );
  res.json(exceedsMin);
};
