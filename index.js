import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import feedbackRoutes from "./routes/feedback.js";
import hero_parallax_imagesRoutes from "./routes/hero_parallax_images.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/feedback", feedbackRoutes);
app.use("/hero_parallax_images", hero_parallax_imagesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express + Supabase backend!" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
