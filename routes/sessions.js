// routes/sessions.js
import express from "express";
import supabase from "../supabaseClient.js";

const router = express.Router();

// 1. Get sessions list
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("sessions")
    .select("id, name, date, location")
    .order("date", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 2. Create new session
router.post("/", async (req, res) => {
  const { name, date, location } = req.body;
  const { data, error } = await supabase
    .from("sessions")
    .insert([{ name, date, location }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// 3. Edit session
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body; // only fields provided will be updated

  const { data, error } = await supabase
    .from("sessions")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// 4. Delete session
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("sessions").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;
