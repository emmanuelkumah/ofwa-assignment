import mongoose from "mongoose";

//Define a Mongoose schema and model for the Galamsay sites
const GalamsaySiteSchema = new mongoose.Schema({
  City: String,
  Region: String,
  Number_of_Galamsay_Sites: String,
});

export default mongoose.model("GalamsaySite", GalamsaySiteSchema);
