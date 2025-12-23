const db = require('../db');

// Get all hostels
exports.getAllHostels = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Hostel');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single hostel
exports.getHostel = async (req, res) => {
  const { hosid } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Hostel WHERE hosID = ?', [hosid]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Unpaid Mess Bills
exports.getUnpaidMess = async (req, res) => {
  const { hosid } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT s.CMSID, s.studentName, s.roomNo, m.Amount, m.Status
       FROM Student s
       JOIN MessBill m ON s.CMSID = m.CMSID
       WHERE s.hosID = ? AND m.Status = 'Unpaid'`,
      [hosid]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Pending Cleaning Requests
exports.getPendingCleaning = async (req, res) => {
  const { hosid } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT c.recordID, c.CMSID, s.studentName, c.ServiceName, c.RequestDate, c.Status
       FROM CleaningRecord c
       JOIN Student s ON c.CMSID = s.CMSID
       WHERE s.hosID = ? AND c.Status = 'Pending'`,
      [hosid]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Students of hostel
exports.getStudentsOfHostel = async (req, res) => {
  const { hosid } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT CMSID, studentName, roomNo, Semester, Major FROM Student WHERE hosID = ?',
      [hosid]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Violations of hostel
exports.getViolationsOfHostel = async (req, res) => {
  const { hosid } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT v.ViolationID, v.CMSID, s.studentName, v.ViolationDate, v.Detail, v.Fine
       FROM Violation v
       JOIN Student s ON v.CMSID = s.CMSID
       WHERE s.hosID = ?`,
      [hosid]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Complaints of hostel
exports.getComplaintsOfHostel = async (req, res) => {
  const { hosid } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT c.complaintID, c.CMSID, s.studentName, c.complaintDate, c.complaintTime, c.complaintText, c.status
       FROM Complaints c
       JOIN Student s ON c.CMSID = s.CMSID
       WHERE s.hosID = ?`,
      [hosid]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { hosID, hostelName, managerName, managerContact } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO Hostel (hosID, hostelName, managerName, managerContact) VALUES (?, ?, ?, ?)",
      [hosID, hostelName, managerName, managerContact]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insert failed" });
  }
};

exports.remove = async (req, res) => {
  const { hosid } = req.params;
  try {
    const [result] = await db.query(
      "DELETE FROM Hostel WHERE hosID = ?",
      [hosid]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
};