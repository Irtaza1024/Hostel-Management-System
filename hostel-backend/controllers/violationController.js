const db = require('../db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Violation");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { CMSID, Detail, Fine } = req.body; // remove ViolationDate
  try {
    await db.query(
      "INSERT INTO Violation (CMSID, Detail, Fine, ViolationDate) VALUES (?, ?, ?, CURRENT_DATE)",
      [CMSID, Detail, Fine] // only 3 values
    );
    res.json({ message: "Violation added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.remove = async (req, res) => {
  const { ViolationID } = req.params;
  try {
    await db.query("DELETE FROM Violation WHERE ViolationID = ?", [ViolationID]);
    res.json({ message: "Violation deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
