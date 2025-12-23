const express = require("express");
const router = express.Router();
const db = require("../db"); // adjust if your db file is elsewhere

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    const [rows] = await db.query(
        "SELECT role FROM users WHERE username = ? AND password = ?",
        [username, password]
    );

    if (rows.length === 0) {
        return res.json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true, role: rows[0].role });
});

module.exports = router;
