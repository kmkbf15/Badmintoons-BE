// api/index.js
import express from "express";

// Import your existing routes
import feedbackRoutes from "../routes/feedback.js";
import heroParallaxRoutes from "../routes/hero_parallax_images.js";
import sessionsRoutes from "../routes/sessions.js";
import matchesRoutes from "../routes/matches.js";
import playersRoutes from "../routes/players.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS if needed
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Use your existing routes
app.use("/api/feedback", feedbackRoutes);
app.use("/api/hero-parallax", heroParallaxRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/api/matches", matchesRoutes);
app.use("/api/players", playersRoutes);

// Health check endpoint
app.get("/api", (req, res) => {
  res.json({ message: "API is running!" });
});

// Export for Vercel (ES6 style)
export default app;
