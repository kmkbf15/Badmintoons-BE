import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import feedbackRoutes from "./routes/feedback.js";
import hero_parallax_imagesRoutes from "./routes/hero_parallax_images.js";
import sessionsRoutes from "./routes/sessions.js";
import matchesRoutes from "./routes/matches.js";
import playersRoutes from "./routes/players.js";

dotenv.config();
const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:3000", // your frontend dev
  "https://your-frontend-domain.com", // your deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
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

// Routes
app.use("/feedback", feedbackRoutes);
app.use("/hero_parallax_images", hero_parallax_imagesRoutes);
app.use("/sessions", sessionsRoutes);
app.use("/matches", matchesRoutes);
app.use("/players", playersRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express + Supabase backend!" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
