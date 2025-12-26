-- Create Database
CREATE DATABASE HostelManagement;
USE HostelManagement;

------------------------------------------------------
-- 1. HOSTEL TABLE
------------------------------------------------------
CREATE TABLE Hostel (
    hosID          INT AUTO_INCREMENT PRIMARY KEY,
    hostelName     VARCHAR(100) NOT NULL,
    managerName    VARCHAR(100),
    managerContact VARCHAR(20)
);

------------------------------------------------------
-- 2. STUDENT TABLE
------------------------------------------------------
CREATE TABLE Student (
    CMSID        INT PRIMARY KEY,
    studentName  VARCHAR(100) NOT NULL,
    roomNo       VARCHAR(10),
    Semester     INT,
    Major        VARCHAR(100),
    hosID        INT,

    CONSTRAINT fk_student_hostel
        FOREIGN KEY (hosID) REFERENCES Hostel(hosID)
        ON UPDATE CASCADE ON DELETE SET NULL
);

------------------------------------------------------
-- 3. MESS RECORD TABLE
------------------------------------------------------
CREATE TABLE MessRecord (
    recordID     INT AUTO_INCREMENT PRIMARY KEY,
    CMSID        INT NOT NULL,
    LeavingDate  DATE,
    ArrivalDate  DATE,

    CONSTRAINT fk_mess_student
        FOREIGN KEY (CMSID) REFERENCES Student(CMSID)
        ON UPDATE CASCADE ON DELETE CASCADE
);

------------------------------------------------------
-- 4. CLEANING RECORD TABLE
------------------------------------------------------
CREATE TABLE CleaningRecord (
    recordID     INT AUTO_INCREMENT PRIMARY KEY,
    CMSID        INT NOT NULL,
    RequestDate  DATE NOT NULL,
    ServiceName  VARCHAR(100),
    Status       ENUM('Pending', 'In-Progress', 'Completed') DEFAULT 'Pending',

    CONSTRAINT fk_cleaning_student
        FOREIGN KEY (CMSID) REFERENCES Student(CMSID)
        ON UPDATE CASCADE ON DELETE CASCADE
);

------------------------------------------------------
-- 5. MESS BILL TABLE
------------------------------------------------------
CREATE TABLE MessBill (
    billID     INT AUTO_INCREMENT PRIMARY KEY,
    CMSID      INT NOT NULL,
    Amount     DECIMAL(10,2) DEFAULT 0,
    Status     ENUM('Paid', 'Unpaid') DEFAULT 'Unpaid',

    CONSTRAINT fk_bill_student
        FOREIGN KEY (CMSID) REFERENCES Student(CMSID)
        ON UPDATE CASCADE ON DELETE CASCADE
);

------------------------------------------------------
-- 6. VIOLATION TABLE
------------------------------------------------------
CREATE TABLE Violation (
    ViolationID    INT AUTO_INCREMENT PRIMARY KEY,
    CMSID          INT NOT NULL,
    Detail         TEXT NOT NULL,
    ViolationDate  DATE DEFAULT (CURRENT_DATE),
	Fine DECIMAL(10, 2),
    CONSTRAINT fk_violation_student
        FOREIGN KEY (CMSID) REFERENCES Student(CMSID)
        ON UPDATE CASCADE ON DELETE CASCADE
);

------------------------------------------------------
-- 7. COMPLAINTS TABLE
------------------------------------------------------
CREATE TABLE Complaints (
    complaintID    INT AUTO_INCREMENT PRIMARY KEY,
    CMSID          INT NOT NULL,             -- Foreign key to Student
    hosID          INT NOT NULL,             -- Foreign key to Hostel
    complaintDate  DATE NOT NULL,
    complaintTime  TIME,
    complaintText  TEXT NOT NULL,
    status         VARCHAR(50) DEFAULT 'Pending', -- e.g., Pending, Resolved, In Progress
    FOREIGN KEY (CMSID) REFERENCES Student(CMSID) ON DELETE CASCADE,
    FOREIGN KEY (hosID) REFERENCES Hostel(hosID) ON DELETE CASCADE
);

------------------------------------------------------
-- 8. USERS TABLE
------------------------------------------------------
CREATE TABLE Users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    role ENUM('admin','manager', 'student', 'staff') NOT NULL
);

------------------------------------------------------
-- 9. ROLE TABLE
------------------------------------------------------
CREATE TABLE staffRole (
    roleID        	INT PRIMARY KEY,
    roleName		VARCHAR(100) NOT NULL
);

------------------------------------------------------
-- 10. STAFF_INFO TABLE
------------------------------------------------------
CREATE TABLE staffInfo (
    staffID        	INT PRIMARY KEY,
    staffName  		VARCHAR(100) NOT NULL,
    roleID 			INT,
    hosID 			INT,

    CONSTRAINT fk_staff_hostel
        FOREIGN KEY (hosID) REFERENCES Hostel(hosID)
        ON UPDATE CASCADE ON DELETE SET NULL,
	
    CONSTRAINT fk_staff_role
        FOREIGN KEY (roleID) REFERENCES staffRole(roleID)
        ON UPDATE CASCADE ON DELETE SET NULL
);

------------------------------------------------------
-- 11. STAFF RECORD TABLE
------------------------------------------------------
CREATE TABLE staffRecord (
    recordID     	INT AUTO_INCREMENT PRIMARY KEY,
    staffID        	INT NOT NULL,
    LeavingDate  	DATE,
    ArrivalDate  	DATE,
	Reason 			VARCHAR(100),
    
    CONSTRAINT fk_staff_record
        FOREIGN KEY (staffID) REFERENCES staffInfo(staffID)
        ON UPDATE CASCADE ON DELETE CASCADE
);
------------------------------------------------------


-- =========================
-- AUDIT TABLES (STRING LOG)
-- =========================

CREATE TABLE audit_students (
    auditID INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    loggedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_violations (
    auditID INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    loggedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_complaints (
    auditID INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    loggedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_cleaning (
    auditID INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    loggedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TRIGGERS
-- =========================

-- 1️⃣ STUDENT DELETE AUDIT
DROP TRIGGER IF EXISTS audit_student_delete;
DELIMITER $$

CREATE TRIGGER audit_student_delete
AFTER DELETE ON Student
FOR EACH ROW
BEGIN
    INSERT INTO audit_students (message)
    VALUES (
        CONCAT(
            'Student with CMSID: ',
            OLD.CMSID,
            ' was deleted at ',
            NOW()
        )
    );
END$$
DELIMITER ;



-- 2️⃣ VIOLATIONS DELETE AUDIT
DROP TRIGGER IF EXISTS audit_violations_delete;
DELIMITER $$

CREATE TRIGGER audit_violations_delete
AFTER DELETE ON Violation
FOR EACH ROW
BEGIN
    INSERT INTO audit_violations (message)
    VALUES (
        CONCAT(
            'Violation with violationID: ',
            OLD.violationID,
            ' and CMS ID: ',
            OLD.CMSID,
            ' was deleted at ',
            NOW(),
            ' with details: ',
            OLD.detail
        )
    );
END$$
DELIMITER ;



-- 3️⃣ COMPLAINTS DELETE AUDIT
DROP TRIGGER IF EXISTS audit_complaints_delete;
DELIMITER $$

CREATE TRIGGER audit_complaints_delete
AFTER DELETE ON Complaints
FOR EACH ROW
BEGIN
    INSERT INTO audit_complaints (message)
    VALUES (
        CONCAT(
            'Complaint with complaintID: ',
            OLD.complaintID,
            ' and CMS ID: ',
            OLD.CMSID,
            ' was deleted at ',
            NOW(),
            ' with details: ',
            OLD.complaintText
        )
    );
END$$
DELIMITER ;



-- 4️⃣ CLEANING RECORD DELETE AUDIT
DROP TRIGGER IF EXISTS audit_cleaning_delete;
DELIMITER $$

CREATE TRIGGER audit_cleaning_delete
AFTER DELETE ON CleaningRecord
FOR EACH ROW
BEGIN
    INSERT INTO audit_cleaning (message)
    VALUES (
        CONCAT(
            'Cleaning record with ID: ',
            OLD.recordID,
            ' with CMSID: ',
            OLD.CMSID,
            ' was deleted at ',
            NOW()
        )
    );
END$$
DELIMITER ;
