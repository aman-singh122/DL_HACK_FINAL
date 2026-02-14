import runTriageAI from "../services/triage.service.js";

const triageController = async (req, res) => {
  try {
    const { symptoms, age, gender } = req.body || {};


    if (!symptoms || !age || !gender) {
      return res.status(400).json({
        success: false,
        message: "Symptoms, age, and gender are required.",
      });
    }

    const result = await runTriageAI({ symptoms, age, gender });

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("Triage Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "AI triage failed",
    });
  }
};

export default triageController;
