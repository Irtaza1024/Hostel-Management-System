const db = require('../db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT recordID, CMSID, LeavingDate, ArrivalDate FROM Messrecord"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.create = async (req, res) => {
  const { CMSID, ArrivalDate, LeavingDate } = req.body;
  try {
    await db.query(
      "INSERT INTO MessRecord (CMSID, ArrivalDate, LeavingDate) VALUES (?, ?, ?)",
      [CMSID, ArrivalDate, LeavingDate]
    );
    res.json({ message: "Mess record added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { recordID } = req.params;
  try {
    await db.query("DELETE FROM MessRecord WHERE recordID = ?", [recordID]);
    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
