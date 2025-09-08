// routes/players.js
import express from "express";
import supabase from "../supabaseClient.js";

const router = express.Router();

// 9. Get players in a session
router.get("/sessions/:sessionId/players", async (req, res) => {
  const { sessionId } = req.params;
  const { data, error } = await supabase
    .from("session_players")
    .select("*")
    .eq("session_id", sessionId);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 10. Add player
router.post("/sessions/:sessionId/players", async (req, res) => {
  const { sessionId } = req.params;
  const { name, level, plays_count, available } = req.body;
  const { data, error } = await supabase
    .from("session_players")
    .insert([{ session_id: sessionId, name, level, plays_count, available }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// 11. Edit player
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const { data, error } = await supabase
    .from("session_players")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// 12. Delete player
router.delete("/players/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from("session_players")
    .delete()
    .eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;
