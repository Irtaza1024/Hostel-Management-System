const db = require('../db');

// ------------------------------
// GET ALL STAFF LEAVE RECORDS
// ------------------------------
exports.getAllLeaves = async (req, res) => {
    try {
        const sql = `
            SELECT sr.recordID, sr.staffID,
                   s.staffName, r.roleName,
                   h.hostelName,
                   sr.ArrivalDate, sr.LeavingDate, sr.Reason
            FROM staffRecord sr
            JOIN staffInfo s ON sr.staffID = s.staffID
            JOIN staffRole r ON s.roleID = r.roleID
            JOIN Hostel h ON s.hosID = h.hosID
            ORDER BY sr.recordID ASC;
        `;

        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching leave records" });
    }
};


// ------------------------------
// CREATE A STAFF LEAVE RECORD
// ------------------------------
exports.createLeave = async (req, res) => {
    const { staffID, ArrivalDate, LeavingDate, Reason } = req.body;

    try {
        const sql = `
            INSERT INTO staffRecord (staffID, ArrivalDate, LeavingDate, Reason)
            VALUES (?, ?, ?, ?)
        `;

        await db.query(sql, [staffID, ArrivalDate, LeavingDate, Reason]);

        res.json({ message: "Leave record created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating leave record" });
    }
};

// ------------------------------
// DELETE LEAVE RECORD
// ------------------------------
exports.deleteLeave = async (req, res) => {
    const { recordID } = req.params;

    try {
        const sql = `DELETE FROM staffRecord WHERE recordID = ?`;
        await db.query(sql, [recordID]);

        res.json({ message: "Leave record deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting leave record" });
    }
};
