const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./Routes/User.routes");
const PropertyRouter = require('./Routes/Property.routes')
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/properties", PropertyRouter);
// import cors from "cors";

app.use(
  cors({
    origin: "https://real-estate-web-client-juh1iviov-imsaquib-webs-projects.vercel.app/",
    credentials: true,
  })
);


app.get("/", (req, res) => {
  res.send("runningggggggg.......");
});

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    msg: "Internal Server Error",
    error: err.message,
  });
});

const PORT = process.env.PORT || 6060;
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is runnig on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB not connected...", err);
  });
