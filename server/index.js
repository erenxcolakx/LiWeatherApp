import express from "express";
import router from "./routes/weatherRoutes.js";
const app = express();
const port =  process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

app.use(router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
