import express from "express";
import * as weatherController from "../controllers/weather.js";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from 'url';

// __dirname'i tanımlamak için
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 416, // max 416 requests each one hour
    message: "Too many requests, please try again later."
});

// React uygulamanızın build edilmiş dosyalarını sunmak için statik dosya yolu belirtin
const buildPath = path.join(__dirname, '../../client/build');  // build klasörünüz artık proje kök dizininde
router.use(express.static(buildPath));

// Diğer API rotalarınızı buraya ekleyin
router.route("/api/weather").get(limiter, weatherController.getWeather);

// Sadece "/" rotasına gidildiğinde React uygulamasının ana sayfasını döndür
router.get("/", (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Diğer tüm rotalar için NotFound sayfasını döndürün
router.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html')); // React uygulaması NotFound.js ile durumu yönetecek
});

export default router;
