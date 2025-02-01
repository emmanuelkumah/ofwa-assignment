import mongoose from "mongoose";
import request from "supertest";
import app from "../server";
import * as dotenv from "dotenv";
dotenv.config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /api/galamsay", () => {
  it("should return all galamsay sites data", async () => {
    const response = await request(app).get("/api/v1/galamsay");
    expect(response.status).toBe(200);
  });
});

describe("GET /api/galamsay/total-sites", () => {
  it("should return the total galamsay sites", async () => {
    const response = await request(app).get("/api/v1/galamsay/total-sites");
    expect(response.status).toBe(200);
    expect(response._body.totalGalamsaySites).toBe(2198);
  });
});

describe("GET /api/galamsay/highest-region", () => {
  it("should return the region with the highest galamsay sites", async () => {
    const response = await request(app).get("/api/v1/galamsay/highest-region");
    expect(response.status).toBe(200);
    expect(response._body.Number_of_Galamsay_Sites).toBe("1000");
  });
});

describe("GET /api/galamsay/average", () => {
  it("should return the average number of galamsay site per region", async () => {
    const response = await request(app).get("/api/v1/galamsay/average");
    expect(response.status).toBe(200);
  });
});

describe("GET /api/galamsay/sites-exceeds-threshold", () => {
  it("should return region with galamsay sites exceeding 10", async () => {
    const response = await request(app).get(
      "/api/v1/galamsay/sites-exceeds-threshold"
    );
    expect(response.status).toBe(200);
  });
});
