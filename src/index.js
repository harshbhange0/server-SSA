import express from "express";
import cors from "cors";
import connectionMongoDB from "./db/DBConnect.js";
import { Router } from "./routes/index.routes.js"
import dotenv from "dotenv"
dotenv.config()
const app = express()
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    status: "working",
  });
});

app.use("/api/v1",Router)

connectionMongoDB();
const port = process.env.PORT || 5111;
app.listen(port, () => {
  console.log(`Listen on port ${port}`); //5000
});
