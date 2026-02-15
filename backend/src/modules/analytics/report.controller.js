import { generateMonthlyReport } from "./report.service.js";

const reportController = async (req, res) => {
  try {
    const userId = req.user._id;

    const report = await generateMonthlyReport(userId);

    res.json({
      success: true,
      report,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Report generation failed",
    });
  }
};

export default reportController;
