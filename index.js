import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import feedbackRoutes from "./routes/feedback.js";
import heroParallaxRoutes from "./routes/hero_parallax_images.js";
import sessionsRoutes from "./routes/sessions.js";
import matchesRoutes from "./routes/matches.js";
import playersRoutes from "./routes/players.js";

dotenv.config();
const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:3001",
  "https://badmintoons.pages.dev",
  "https://badmintoons-admin.pages.dev",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or curl)
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        const msg = `❌ CORS policy does not allow access from ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Routes — now consistent with /api prefix
app.use("/api/feedback", feedbackRoutes);
app.use("/api/hero-parallax", heroParallaxRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/api/matches", matchesRoutes);
app.use("/api/players", playersRoutes);

// Health check
app.get("/api", (req, res) => {
  res.json({ message: "🚀 API is running locally with Express + Supabase" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
