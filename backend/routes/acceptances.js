const express = require("express");
const router = express.Router();
const supabase = require("../middleware/supabaseClient");

router.get("/", async (req, res) => {
  try {
    const { zipcode, exam_id, cut_score } = req.query;

    let query = supabase.from("acceptances").select("*");

    if (zipcode) query = query.eq("zipcode", zipcode);
    if (exam_id) query = query.eq("exam_id", exam_id);
    if (cut_score) query = query.eq("cut_score", cut_score);

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
