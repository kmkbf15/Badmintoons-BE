// routes/matches.js
import express from "express";
import supabase from "../supabaseClient.js";

const router = express.Router();

// 5. Get matches list in a session
router.get("/sessions/:sessionId/matches", async (req, res) => {
  const { sessionId } = req.params;
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .eq("session_id", sessionId);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 6. Create new match in a session
router.post("/sessions/:sessionId/matches", async (req, res) => {
  const { sessionId } = req.params;
  const { team1, team2, score1, score2 } = req.body;
  const { data, error } = await supabase
    .from("matches")
    .insert([{ session_id: sessionId, team1, team2, score1, score2 }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// 7. Edit match
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const { data, error } = await supabase
    .from("matches")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// 8. Delete match
router.delete("/matches/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("matches").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;
