import express from "express";
import * as weatherController from "../controllers/weather.js";
import rateLimit from "express-rate-limit";


const router = express.Router();

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 416, // max 416 requests each one hour
    message: "Too many requests, please try again later."
});

// API routes
router.get("/api/weather", limiter, weatherController.getWeather);

// Root route (health check or API documentation)
router.get("/", (req, res) => {
  res.send('Backend is running');
});

// Wildcard route (should be last)
router.get("*", (req, res) => {
  res.status(404).send("Not found");
});

export default router;