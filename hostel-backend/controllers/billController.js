const db = require('../db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM MessBill");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { CMSID, Amount, Status } = req.body;
  try {
    await db.query(
      "INSERT INTO MessBill (CMSID, Amount, Status) VALUES (?, ?, ?)",
      [CMSID, Amount, Status]
    );
    res.json({ message: "Bill added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { billID } = req.params;
  try {
    await db.query("DELETE FROM MessBill WHERE billID = ?", [billID]);
    res.json({ message: "Bill deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
