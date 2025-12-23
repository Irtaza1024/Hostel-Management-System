const db = require('../db');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Student');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single student
exports.getStudent = async (req, res) => {
  const { cmsid } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Student WHERE CMSID = ?', [cmsid]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mess Status
exports.getMess = async (req, res) => {
  const { cmsid } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT s.CMSID, s.studentName, m.Amount, m.Status FROM Student s JOIN MessBill m ON s.CMSID = m.CMSID WHERE s.CMSID = ?',
      [cmsid]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Violations
exports.getViolations = async (req, res) => {
  const { cmsid } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT ViolationID, ViolationDate, Detail, Fine FROM Violation WHERE CMSID = ?',
      [cmsid]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Complaints
exports.getComplaints = async (req, res) => {
  const { cmsid } = req.params;
  try {
    const [rows] = await db.query("SELECT complaintID, complaintDate, complaintTime, complaintText, status FROM Complaints WHERE CMSID = ?", [cmsid]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Roommates
exports.getRoommates = async (req, res) => {
  const { cmsid } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT s2.CMSID, s2.studentName, s2.Semester FROM Student s1 JOIN Student s2 ON s1.roomNo = s2.roomNo AND s1.hosID = s2.hosID AND s1.CMSID <> s2.CMSID WHERE s1.CMSID = ?',
      [cmsid]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cleaning Records
exports.getCleaningRecords = async (req, res) => {
  const { cmsid } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT recordID, requestDate, serviceName, Status FROM CleaningRecord WHERE CMSID = ?',
      [cmsid]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mess Records
exports.getMessRecords = async (req, res) => {
  const { cmsid } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT recordID, LeavingDate, ArrivalDate FROM messrecord WHERE CMSID = ?',
      [cmsid]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessStatus = async (req, res) => {
  const { cmsid } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT billID, Amount, Status FROM MessBill WHERE CMSID = ?',
      [cmsid]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Students with no violations
exports.getNoViolations = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT s.CMSID, s.studentName, s.roomNo, s.Semester, s.Major FROM Student s LEFT JOIN Violation v ON s.CMSID = v.CMSID WHERE v.CMSID IS NULL'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
    const { CMSID, studentName, roomNo, Semester, Major, hosID } = req.body;

    try {
        await db.query(
            "INSERT INTO Student (CMSID, studentName, roomNo, Semester, Major, hosID) VALUES (?, ?, ?, ?, ?, ?)",
            [CMSID, studentName, roomNo, Semester, Major, hosID]
        );

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Insert failed" });
    }
};


exports.remove = async (req, res) => {
  const { CMSID } = req.params;

  try {
    const sql = 'DELETE FROM Student WHERE CMSID = ?';
    await db.query(sql, [CMSID]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting student record" });
  }
};