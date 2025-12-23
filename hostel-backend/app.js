const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import existing
const studentRoutes = require('./routes/students');
const hostelRoutes = require('./routes/hostels');
const messRoutes = require('./routes/messrecords');
const cleaningRoutes = require('./routes/cleaningrecords');
const billRoutes = require('./routes/messbills');
const violationRoutes = require('./routes/violations');
const complaintRoutes = require('./routes/complaints');
const staffRoutes = require('./routes/staff');
const staffLeaveRoutes = require('./routes/staffLeave');

const loginRoutes = require("./routes/login");
app.use("/login", loginRoutes);


// Use
app.use('/students', studentRoutes);
app.use('/hostels', hostelRoutes);
app.use('/messrecords', messRoutes);
app.use('/cleaningrecords', cleaningRoutes);
app.use('/messbills', billRoutes);
app.use('/violations', violationRoutes);
app.use('/complaints',complaintRoutes);
app.use('/staff', staffRoutes);
app.use('/staffLeaves', staffLeaveRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
