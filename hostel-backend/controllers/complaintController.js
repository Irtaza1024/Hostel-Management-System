const db = require('../db');

// Get all complaints
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Complaints");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new complaint
exports.create = async (req, res) => {
  const { CMSID, hosID, complaintDate, complaintTime, complaintText, status } = req.body;
  try {
    await db.query(
      `INSERT INTO Complaints 
       (CMSID, hosID, complaintDate, complaintTime, complaintText, status) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [CMSID, hosID, complaintDate, complaintTime, complaintText, status || 'Pending']
    );
    res.json({ message: "Complaint added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a complaint by ID
exports.remove = async (req, res) => {
  const { complaintID } = req.params;
  try {
    await db.query("DELETE FROM Complaints WHERE complaintID = ?", [complaintID]);
    res.json({ message: "Complaint deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


