const db = require('../db');

// ------------------------------
// GET ALL STAFF WITH ROLES
// ------------------------------
exports.getAllStaff = async (req, res) => {
    try {
        const sql = `
            SELECT s.staffID, s.staffName, h.hostelName, 
                   r.roleName
            FROM staffInfo s
            LEFT JOIN staffRole r ON s.roleID = r.roleID
            left JOIN hostel h ON s.hosID = h.hosID
            ORDER BY s.staffID ASC;
        `;

        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching staff info" });
    }
};

// ------------------------------
// CREATE STAFF MEMBER
// ------------------------------
exports.createStaff = async (req, res) => {
    const { staffID, staffName, roleID, hosID } = req.body;

    try {
        const sql = `
            INSERT INTO staffInfo (staffID, staffName, roleID, hosID)
            VALUES (?, ?, ?, ?)
        `;
        
        await db.query(sql, [staffID, staffName, roleID, hosID]);

        res.json({ message: "Staff member added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating staff member" });
    }
};

// ------------------------------
// DELETE STAFF MEMBER
// ------------------------------
exports.deleteStaff = async (req, res) => {
    const { staffID } = req.params;

    try {
        const sql = `DELETE FROM staffInfo WHERE staffID = ?`;
        await db.query(sql, [staffID]);

        res.json({ message: "Staff member deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting staff member" });
    }
};
