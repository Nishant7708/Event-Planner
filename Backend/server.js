import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect.js";

import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import rsvpRoutes from "./routes/rsvpRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/events", eventRoutes);
app.use("/rsvp", rsvpRoutes);

const port = process.env.PORT || 3000;
connectDB();

app
  .listen(port)
  .on("listening", () => {
    console.log(`Server Starts at ${port}`);
  })
  .on("error", (error) => {
    console.log(error.message);
  });
