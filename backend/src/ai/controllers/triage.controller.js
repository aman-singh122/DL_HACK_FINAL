import runTriageAI from "../services/triage.service.js";
import { produceAIEvent } from "../../infrastructure/kafka/producers/ai.producer.js";

const triageController = async (req, res) => {
  try {
    const { symptoms, age, gender } = req.body;

    const result = await runTriageAI({ symptoms, age, gender });



    res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("Triage Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "AI triage failed",
    });
  }
};

export default triageController;
