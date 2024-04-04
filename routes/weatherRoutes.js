import express from "express";
import * as weatherController from "../controllers/weather.js";

const router = express.Router();

router.route("/").get(weatherController.getSearchPage);
router.route("/weather").get(weatherController.getWeather);

export default router;
