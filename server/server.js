import express from "express";
import path from "path";
import mongoose from "mongoose";
import auth from "./routes/auth";
import dotenv from "dotenv";
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
dotenv.config();

mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true }
);

app.use("/api", auth);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => console.log(`running on port ${port}`));
