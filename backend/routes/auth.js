const express = require("express");
const router = express.Router();
const supabase = require("../middleware/supabaseClient");

router.get("/", async (req, res) => {
  try {
    res.status(200).json({ message: "Auth endpoint" });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
