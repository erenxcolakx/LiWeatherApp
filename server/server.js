import express from "express";
import router from "./routes/weatherRoutes.js";
import cors from 'cors'
const app = express();
const port =  process.env.PORT || 5000;
const corsOptions = {
    origin: '*', // Tüm domainlerden gelen isteklere izin verir
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  };

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
