import mongoose from "mongoose";

//Define a Mongoose schema and model for the Galamsay sites
const galamsaySiteSchema = new mongoose.Schema({
  city: String,
  region: String,
  galamsaySites: Number,
});

export default mongoose.model("GalamsaySite", galamsaySiteSchema);
