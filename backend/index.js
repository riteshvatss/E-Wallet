const express = require("express");
const app=express();
const z=require("zod");
const cors=require("cors")
const bodyParser=require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const mainRouter=require("./routes/index");

app.use("/api/v1",mainRouter);
app.listen(3000);

