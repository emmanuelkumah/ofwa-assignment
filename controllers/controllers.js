import { readCSV } from "../analyzeData";

export const getTotalGalamsaySites = async (req, res) => {
  const data = await readCSV("galamsay_data.csv");
  console.log(data);
  const totalGalamsaySites = data.reduce((total, currValue) => {
    return total + Number(currValue.Number_of_Galamsay_Sites);
  }, 0);

  res.json({ totalGalamsaySites });
};
export const getTotalSites = async (req, res) => {
  res.json({ msg: "Show all sites" });
};
