const db = require('../config/db');

//Register entry
exports.registerEntry = async (req, res) => {
    const {license_plate, vehicle_type } = req.body;
    try {
        const [existing] = await db.query('SELECT * FROM parking_records WHERE license_plate = ? AND exit_time IS NULL', [license_plate]);

        if(existing.length > 0){
            return res.status(400).json({ message: "The vehicle is already inside the parking lot"});
        } 
        await db.query('INSERT INTO parking_records (license_plate, vehicle_type, entry_time) VALUES (?, ?, NOW())', [license_plate, vehicle_type]);
        res.status(201).json({ message: "Entry recorder correctly"});
    } catch (e) {
        res.status(500).json({ error: e.message});
    }
}

//Register exit
exports.registerExit = async (req, res) => {
    const {license_plate} = req.params;
    try {
        const [records] = await db.query('SELECT * FROM parking_records WHERE license_plate = ? AND exit_time IS NULL', [license_plate]);
        if(records.length === 0 ) return res.status(404).json({ message: 'Vehicle not found or already outside'});

        const record = records[0];
        const entry_time = new Date(record.entry_time);
        const exit_time = new Date();
        const totalMinutes = Math.ceil((exit_time - entry_time)/ 60000);

        let amount = 0;

        if(record.vehicle_type === "residente"){
            amount = totalMinutes * 1;
        } else if (record.vehicle_type === "no_residente"){
            amount = totalMinutes * 3;
        }

        await db.query('UPDATE parking_records SET exit_time = NOW(), total_time_minutes = ?, total_amount = ? WHERE id = ?', [totalMinutes, amount, record.id]);
        res.json({ message: 'Exit registered succesfully', totalMinutes, amount});

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

//Create report
exports.getReport = async (req, res) => {
    const {from, to} = req.query;
    try {
        const [report] = await db.query('SELECT license_plate, vehicle_type, total_time_minutes, total_amount, entry_time, exit_time FROM parking_records WHERE entry_time BETWEEN ? AND ?', [from, to]);
        res.json(report);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}