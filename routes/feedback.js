import express from "express";
import supabase from "../supabaseClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("feedback").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post("/", async (req, res) => {
  const { name, message } = req.body;
  const { data, error } = await supabase
    .from("feedback")
    .insert([{ name, message }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
