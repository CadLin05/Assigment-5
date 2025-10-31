import express from "express";
import scoreHandler from "./Routes/highscores_r.js";

const app = express();

app.use(express.json());
app.use("/highscores", scoreHandler);

app.listen(3000, () =>{
    console.log("listening on port 3000");

});