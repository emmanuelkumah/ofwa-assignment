import express from "express";
import { readCSV } from "./analyzeData.js";

import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));

//dummy data
const data = [
  {
    id: 1,
    city: "Germiston",
    region: "MM-07",
    numberOfSites: 58,
  },
  {
    id: 2,
    city: "Františkovy Lázně",
    region: "CM-LT",
    numberOfSites: 4,
  },
  {
    id: 3,
    city: "Lunas",
    region: "US-HI",
    numberOfSites: 6,
  },
  {
    id: 4,
    city: "Rędziny",
    region: "CA-ON",
    numberOfSites: 19,
  },
  {
    id: 5,
    city: "Edinburgh of the Seven Seas",
    region: "IT-57",
    numberOfSites: 53,
  },
  {
    id: 6,
    city: "Shepetivka",
    region: "DE-BY",
    numberOfSites: 70,
  },
  {
    id: 7,
    city: "Raglan",
    region: "MP-U-A",
    numberOfSites: 47,
  },
  {
    id: 8,
    city: "Xianyan",
    region: "US-CA",
    numberOfSites: 76,
  },
  {
    id: 9,
    city: "Ibirama",
    region: "BS-AC",
    numberOfSites: 21,
  },
  {
    id: 10,
    city: "Varnávas",
    region: "AU-QLD",
    numberOfSites: 28,
  },
];

// Logging middleware for development environments
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//api Routes
app.get("/api/v1/total-galamsey-sites", async (req, res) => {
  const data = await readCSV("galamsay_data.csv");
  console.log(data);
  res.json({ msg: `Total galamsey sites` });
});
app.get("/test", (req, res) => {
  res.json({ msg: "This is a test endpoint" }); // This will be logged in the console
});

app.post("/", (req, res) => {
  const { name, age } = req.body;
  res.json({ message: `Hello, ${name}! You are ${age} years old.` });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on port ${port}!`);
});
