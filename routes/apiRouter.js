import { Router } from "express";
const router = Router();

import {
  getAllData,
  getAverageSitePerRegion,
  getTotalGalamsaySites,
  getRegionWithHighestGalamsaySites,
  getCitiesWithSitesGreaterThanTen,
} from "../controllers/galamsayControllers.js";

router.route("/").get(getAllData);
router.route("/average").get(getAverageSitePerRegion);
router.route("/total-sites").get(getTotalGalamsaySites);
router.route("/highest-region").get(getRegionWithHighestGalamsaySites);
router.route("/sites-exceeds-threshold").get(getCitiesWithSitesGreaterThanTen);

export default router;
