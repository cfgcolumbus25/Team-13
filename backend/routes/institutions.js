const express = require("express");
const router = express.Router();
const supabase = require("../middleware/supabaseClient");
const { getInstitutionsNearby } = require("../services/nearbyInstitutions");

// Get All Current Institituions
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("institutions").select("*");

    if (error) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(data || []);
  } catch (error) {
    return res.status(500).json({ error: err.message});
  }
});

// Get Nearby Constitutions based off zipcode
router.get("/nearby/:zipcode", async (req, res) => {
  try {
    const { zipcode } = req.params;
    const radius = parseFloat(req.query.radius) || 10;

    const { nearbyZips, institutions } = await getInstitutionsNearby(
      zipcode,
      radius
    );
    res.status(200).json({
      baseZip: zipcode,
      radius,
      nearbyZips,
      count: institutions.length,
      institutions,

    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
