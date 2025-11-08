const express = require("express");
const router = express.Router();
const supabase = require("../middleware/supabaseClient");
const { getInstitutionsNearby } = require("../services/nearbyInstitutions");

// General Get Function to Retrieve Acceptances Based on User Filtering.
// Allows for custom minimum cut score, exam_ids, and radius + zip
router.get("/", async (req, res) => {
  try {
    const { cut_score, exam_ids, zipcode, radius } = req.query;

    let query = supabase.from("acceptances").select("*");

    // Append Cut Score if Provided
    if (cut_score) {
      query = query.gt("cut_score", Number(cut_score));
    }

    // Append any exam_ids provided
    if (exam_ids) {
      const ids = exam_ids.split(",").map((id) => id.trim());
      query = query.in("exam_id", ids);
    }

    let { data, error } = await query;
    if (error) throw new Error(error.message);

    // Optional filter by nearby institutions;
    if (zipcode && radius) {
      const { institutions } = await getInstitutionsNearby(
        zipcode,
        Number(radius)
      );
      const nearbyInstitutionIds = institutions.map((i) => i.institution_id);
      data = data.filter(
        (a) =>
          a.institution_id && nearbyInstitutionIds.includes(a.institution_id)
      );
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching acceptances:", err.message);
    res.status(500).json({ error: err.message });
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
      .eq("acceptance_id", acceptanceId)
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

// Post New Acceptance Policy
router.post("/", async (req, res) => {
  try {
    const {
      institution_id,
      exam_id,
      cut_score,
      credits,
      related_course,
      school_name,
      updated_by,
    } = req.body;

    if (!institution_id) {
      return res.status(400).json({ error: "institution_id is required" });
    }

    if (!exam_id) {
      return res.status(400).json({ error: "exam_id is required" });
    }

    if (cut_score === undefined || cut_score === null || isNaN(cut_score)) {
      return res
        .status(400)
        .json({ error: "cut_score is required and must be a number" });
    }
    const newAcceptance = {
      institution_id,
      exam_id,
      cut_score: Number(cut_score),
      credits: credits ? Number(credits) : null,
      related_course: related_course || null,
      updated_by: updated_by || null,
      last_updated: new Date().toISOString().slice(0, 10),
      School_name: school_name || null,
    };

    const { data, error } = await supabase
      .from("acceptances")
      .insert([newAcceptance])
      .select("*")
      .single();

    if (error) {
      console.error("Supabase error (POST /acceptances):", error.message);
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
