const express = require("express");
const router = express.Router();
const supabase = require("../middleware/supabaseClient");
const { getInstitutionsNearby } = require("../services/nearbyInstitutions");

// General Get Function to Retrieve Acceptances Based on User Filtering.
// Allows for custom minimum cut score, exam_ids, and radius + zip
router.get("/", async (req, res) => {
  try {
    const { min_cut_score, exam_ids, zipcode, radius } = req.query;

    let query = supabase.from("acceptances").select(`
        *,
        institutions (
          institution_id,
          school_name,
          zipcode
        )
      `);

    // We want acceptances greater than a given score.
    if (min_cut_score) {
      query = query.gt("cut_score", Number(min_cut_score));
    }

    // Mutiple Exam Ids can be filtered for by passing in query string of multiple exam_ids, delimited by a ",".
    if (exam_ids) {
      const ids = exam_ids.split(",").map((id) => id.trim());
      query = query.in("exam_id", ids);
    }

    let { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }

    if (zipcode && radius) {
      const { institutions } = await getInstitutionsNearby(
        zipcode,
        Number(radius)
      );
      const nearbyInstitutionIds = institutions.map((i) => i.institution_id);

      // This function will filter out any institutuions not within radius list.
      data = data.filter((a) =>
        nearbyInstitutionIds.includes(a.institution_id)
      );
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Internal server error" });
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
