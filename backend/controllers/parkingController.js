const { registerEntry, registerExit, getReport } = require('../models/parkingModel');

// Register entry
exports.registerEntry = async (req, res) => {
    const { license_plate, vehicle_type } = req.body;
    try {
        await registerEntry(license_plate, vehicle_type);
        res.status(201).json({ message: "Entry recorded correctly" });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// Register exit
exports.registerExit = async (req, res) => {
    const { license_plate } = req.params;
    try {
        const { totalMinutes, amount } = await registerExit(license_plate);
        res.json({ message: 'Exit registered successfully', totalMinutes, amount });
    } catch (e) {
        res.status(404).json({ error: e.message });
    }
};

// Get report
exports.getReport = async (req, res) => {
    const { from, to } = req.query;
    try {
        const report = await getReport(from, to);
        res.json(report);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
