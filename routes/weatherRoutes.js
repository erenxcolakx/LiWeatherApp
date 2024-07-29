import express from "express";
import * as weatherController from "../controllers/weather.js";
import rateLimit from "express-rate-limit";

const router = express.Router();
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 416, // max 100 requests each one hour
    message: "Too many requests, please try again later."
  });

router.route("/").get(weatherController.getSearchPage);
router.route("/weather").get(limiter, weatherController.getWeather);

export default router;