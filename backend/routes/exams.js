const express = require("express");
const router = express.Router();
const supabase = require("../middleware/supabaseClient");

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("exams").select("*");

    if (error) {
      console.error("Supabase error (GET /exams):", error.message);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Server error (GET /exams):", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Add new exam entry
router.post("/", async (req, res) => {
  try {
    const { exam_name } = req.body;

    if (!exam_name || typeof exam_name !== "string") {
      return res
        .status(400)
        .json({ error: "exam_name is required and must be a string" });
    }

    const { data, error } = await supabase
      .from("exams")
      .insert([{ exam_name }])
      .select("*")
      .single();

    if (error) {
      console.error("Supabase error (POST /exams):", error.message);
      return res.status(500).json({ error: error.message });
    }

    // 201 Created
    return res.status(201).json(data);
  } catch (err) {
    console.error("Server error (POST /exams):", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Update Existing Exam
router.put("/:exam_id", async (req, res) => {
  try {
    const { exam_id } = req.params;
    const { exam_name } = req.body;

    if (!isValidUUID(exam_id)) {
      return res.status(400).json({ error: "Invalid exam_id (must be UUID)" });
    }

    if (!exam_name || typeof exam_name !== "string") {
      return res
        .status(400)
        .json({ error: "exam_name is required and must be a string" });
    }

    const { data, error } = await supabase
      .from("exams")
      .update({ exam_name })
      .eq("exam_id", exam_id)
      .select("*")
      .single();

    if (error) {
      console.error("Supabase error (PUT /exams/:exam_id):", error.message);
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: "Exam not found" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Server error (PUT /exams/:exam_id):", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Exam based off exam id.
router.delete("/:exam_id", async (req, res) => {
  try {
    const { exam_id } = req.params;

    if (!isValidUUID(exam_id)) {
      return res.status(400).json({ error: "Invalid exam_id (must be UUID)" });
    }

    const { data, error } = await supabase
      .from("exams")
      .delete()
      .eq("exam_id", exam_id)
      .select("*")
      .single();

    if (error) {
      console.error("Supabase error (DELETE /exams/:exam_id):", error.message);
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: "Exam not found" });
    }
    return res.status(200).json({
      message: "Exam deleted successfully",
      exam: data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
