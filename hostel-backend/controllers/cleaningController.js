const db = require('../db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT recordID, CMSID, RequestDate, ServiceName, Status FROM CleaningRecord");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { CMSID, RequestDate, ServiceName, Status } = req.body;
  try {
    await db.query(
      "INSERT INTO CleaningRecord (CMSID, RequestDate, ServiceName, Status) VALUES (?, ?, ?, ?)",
      [CMSID, RequestDate, ServiceName, Status]
    );
    res.json({ message: "Cleaning record added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { recordID } = req.params;
  try {
    await db.query("DELETE FROM CleaningRecord WHERE recordID = ?", [recordID]);
    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
