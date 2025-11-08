const express = require("express");
const router = express.Router();
const supabase = require("../middleware/supabaseClient");

// Get Specific Acceptances ; Can pass in addiitonal query parameters such as zipcode, exam_id, and cut_score
router.get("/", async (req, res) => {
  try {
    const { zipcode, exam_id, cut_score } = req.query;

    let query = supabase.from("acceptances").select("*");

    if (zipcode) query = query.eq("zipcode", zipcode);
    if (exam_id) query = query.eq("exam_id", exam_id);
    if (cut_score) query = query.eq("cut_score", cut_score);

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error (GET /acceptances):", error.message);
      return res.status(500).json({ error: "Failed to fetch acceptances." });
    }

    return res.status(200).json(data || []);
  } catch (err) {
    console.error("Server error (GET /acceptances):", err.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// API Endpoint to update acceptance entry depending on acceptance_id passed in
router.patch("/:id", async (req, res) => {
  try {
    const acceptanceId = req.params.id;
    const updates = req.body || {};

    if (!Object.keys(updates).length) {
      return res.status(400).json({ error: "No fields to update." });
    }

    const { data, error } = await supabase
      .from("acceptances")
      .update(updates)
      .eq("id", acceptanceId)
      .select("*");

    if (error) {
      return res.status(500).json({ error: "Failed to update acceptance." });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Acceptance not found." });
    }

    return res.status(200).json(data[0]);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
