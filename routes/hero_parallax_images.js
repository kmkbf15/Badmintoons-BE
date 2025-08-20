import express from "express";
import supabase from "../supabaseClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("hero_parallax_images")
    .select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
