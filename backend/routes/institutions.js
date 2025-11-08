const express = require("express");
const router = express.Router();
const supabase = require("../middleware/supabaseClient");

router.get("/", async (req, res) => {
  try {
    let query = supabase.from("institutions").select("*");

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
