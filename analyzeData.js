import csv from "csv-parser";
import { createReadStream } from "node:fs";

// Function to read CSV file and return a promise with the results
export const readCSV = async (filePath) => {
  const results = [];

  try {
    // Create a promise to handle the async CSV parsing
    const promise = new Promise((resolve, reject) => {
      createReadStream(filePath)
        .on("error", (error) => {
          reject(new Error(`Error reading file: ${error.message}`));
        })
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          resolve(results);
        })
        .on("error", (error) => {
          reject(new Error(`Error parsing CSV: ${error.message}`));
        });
    });

    // Wait for the CSV to be fully parsed
    const data = await promise;
    return data;
  } catch (error) {
    throw error;
  }
};
