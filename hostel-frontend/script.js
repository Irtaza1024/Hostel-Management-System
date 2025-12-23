const backendUrl = "http://localhost:3000";

// ------------------ HELPER ------------------
function createTableRow(data, columns, deleteFunc) {
    const tr = document.createElement("tr");
    tr.innerHTML = columns.map(col => `<td>${data[col] ?? ""}</td>`).join("");
    if (deleteFunc) {
        const td = document.createElement("td");
        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.onclick = () => deleteFunc(data);
        td.appendChild(btn);
        tr.appendChild(td);
    }
    return tr;
}

// ------------------ STUDENTS ------------------
function fetchStudents() {
    fetch(`${backendUrl}/students`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("studentsTable");
            tbody.innerHTML = "";
            data.forEach(s => tbody.appendChild(createTableRow(s, ["CMSID", "studentName", "roomNo", "Semester", "Major", "hosID"], deleteStudent)));
        })
        .catch(err => console.error(err));
}

function addStudent(e) {
    e.preventDefault();
    const form = document.getElementById("addStudentForm");
    const payload = Object.fromEntries(new FormData(form));
    fetch(`${backendUrl}/students`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        .then(res => res.json())
        .then(() => { form.reset(); fetchStudents(); })
        .catch(err => console.error(err));
}

function deleteStudent(student) {
    fetch(`${backendUrl}/students/${student.CMSID}`, { method: "DELETE" })
        .then(() => fetchStudents())
        .catch(err => console.error(err));
}

if (document.getElementById("addStudentForm")) {
    document.getElementById("addStudentForm").addEventListener("submit", addStudent);
    fetchStudents();
}

// ------------------ HOSTELS ------------------
function fetchHostels() {
    fetch(`${backendUrl}/hostels`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("hostelsTable");
            tbody.innerHTML = "";
            data.forEach(h => tbody.appendChild(createTableRow(h, ["hosID", "hostelName", "managerName", "managerContact"], deleteHostel)));
        })
        .catch(err => console.error(err));
}

function addHostel(e) {
    e.preventDefault();
    const form = document.getElementById("addHostelForm");
    const payload = Object.fromEntries(new FormData(form));
    fetch(`${backendUrl}/hostels`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        .then(res => res.json())
        .then(() => { form.reset(); fetchHostels(); })
        .catch(err => console.error(err));
}

function deleteHostel(hostel) {
    fetch(`${backendUrl}/hostels/${hostel.hosID}`, { method: "DELETE" })
        .then(() => fetchHostels())
        .catch(err => console.error(err));
}

if (document.getElementById("addHostelForm")) {
    document.getElementById("addHostelForm").addEventListener("submit", addHostel);
    fetchHostels();
}

// ------------------ MESS RECORD ------------------
function fetchMess() {
    fetch(`${backendUrl}/messrecords`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("messTable");
            tbody.innerHTML = "";
            data.forEach(r => tbody.appendChild(createTableRow(r, ["recordID", "CMSID", "ArrivalDate", "LeavingDate"], deleteMess)));
        })
        .catch(err => console.error(err));
}

function addMess(e) {
    e.preventDefault();
    const form = document.getElementById("addMessForm");
    const payload = Object.fromEntries(new FormData(form));
    fetch(`${backendUrl}/messrecords`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        .then(res => res.json())
        .then(() => { form.reset(); fetchMess(); })
        .catch(err => console.error(err));
}

function deleteMess(record) {
    fetch(`${backendUrl}/messrecords/${record.recordID}`, { method: "DELETE" })
        .then(() => fetchMess())
        .catch(err => console.error(err));
}

if (document.getElementById("addMessForm")) {
    document.getElementById("addMessForm").addEventListener("submit", addMess);
    fetchMess();
}

// ------------------ CLEANING RECORD ------------------
function fetchCleaning() {
    fetch(`${backendUrl}/cleaningrecords`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("cleaningTable");
            tbody.innerHTML = "";
            data.forEach(r => tbody.appendChild(createTableRow(r, ["recordID", "CMSID", "RequestDate", "ServiceName", "Status"], deleteCleaning)));
        })
        .catch(err => console.error(err));
}

function addCleaning(e) {
    e.preventDefault();
    const form = document.getElementById("addCleaningForm");
    const payload = Object.fromEntries(new FormData(form));
    fetch(`${backendUrl}/cleaningrecords`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        .then(res => res.json())
        .then(() => { form.reset(); fetchCleaning(); })
        .catch(err => console.error(err));
}

function deleteCleaning(record) {
    fetch(`${backendUrl}/cleaningrecords/${record.recordID}`, { method: "DELETE" })
        .then(() => fetchCleaning())
        .catch(err => console.error(err));
}

if (document.getElementById("addCleaningForm")) {
    document.getElementById("addCleaningForm").addEventListener("submit", addCleaning);
    fetchCleaning();
}

// ------------------ MESS BILLS ------------------
function fetchBills() {
    fetch(`${backendUrl}/messbills`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("billsTable");
            tbody.innerHTML = "";
            data.forEach(r => tbody.appendChild(createTableRow(r, ["billID", "CMSID", "Amount", "Status"], deleteBill)));
        })
        .catch(err => console.error(err));
}

function addBill(e) {
    e.preventDefault();
    const form = document.getElementById("addBillForm");
    const payload = Object.fromEntries(new FormData(form));
    fetch(`${backendUrl}/messbills`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        .then(res => res.json())
        .then(() => { form.reset(); fetchBills(); })
        .catch(err => console.error(err));
}

function deleteBill(record) {
    fetch(`${backendUrl}/messbills/${record.billID}`, { method: "DELETE" })
        .then(() => fetchBills())
        .catch(err => console.error(err));
}

if (document.getElementById("addBillForm")) {
    document.getElementById("addBillForm").addEventListener("submit", addBill);
    fetchBills();
}

// ------------------ VIOLATIONS ------------------
function fetchViolations() {
    fetch(`${backendUrl}/violations`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("violationsTable");
            tbody.innerHTML = "";
            data.forEach(r => tbody.appendChild(createTableRow(r, ["ViolationID", "CMSID", "Detail", "ViolationDate", "Fine"], deleteViolation)));
        })
        .catch(err => console.error(err));
}

function addViolation(e) {
    e.preventDefault();
    const form = document.getElementById("addViolationForm");
    const payload = Object.fromEntries(new FormData(form));
    fetch(`${backendUrl}/violations`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        .then(res => res.json())
        .then(() => { form.reset(); fetchViolations(); })
        .catch(err => console.error(err));
}

function deleteViolation(record) {
    fetch(`${backendUrl}/violations/${record.ViolationID}`, { method: "DELETE" })
        .then(() => fetchViolations())
        .catch(err => console.error(err));
}

if (document.getElementById("addViolationForm")) {
    document.getElementById("addViolationForm").addEventListener("submit", addViolation);
    fetchViolations();
}

// ------------------ COMPLAINTS ------------------
function fetchComplaints() {
    fetch(`${backendUrl}/complaints`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("complaintsTable");
            tbody.innerHTML = "";
            data.forEach(r =>
                tbody.appendChild(createTableRow(r,
                    ["complaintID", "CMSID", "hosID", "complaintDate", "complaintTime", "complaintText", "status"],
                    deleteComplaint
                ))
            );
        })
        .catch(err => console.error(err));
}

function addComplaint(e) {
    e.preventDefault();
    const form = document.getElementById("addComplaintForm");
    const payload = Object.fromEntries(new FormData(form));
    fetch(`${backendUrl}/complaints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(() => {
            form.reset();
            fetchComplaints();
        })
        .catch(err => console.error(err));
}

function deleteComplaint(record) {
    fetch(`${backendUrl}/complaints/${record.complaintID}`, { method: "DELETE" })
        .then(() => fetchComplaints())
        .catch(err => console.error(err));
}

// Initialize
if (document.getElementById("addComplaintForm")) {
    document.getElementById("addComplaintForm").addEventListener("submit", addComplaint);
    fetchComplaints();
}

// ------------------ STUDENT REPORTS ------------------
function showStudentReports() {
    const cmsid = document.getElementById("studentCMSID").value;
    if (!cmsid) return alert("Enter CMSID");

    fetch(`${backendUrl}/students/${cmsid}/mess`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("studentMessStatusTable");
            tbody.innerHTML = "";
            data.forEach(r => tbody.appendChild(createTableRow(r, ["CMSID", "studentName", "Amount", "Status"])));
        }).catch(err => console.error(err));

    fetch(`${backendUrl}/students/${cmsid}/violations`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("studentViolationsTable");
            tbody.innerHTML = "";
            data.forEach(v => tbody.appendChild(createTableRow(v, ["ViolationID", "ViolationDate", "Detail", "Fine"])));
        }).catch(err => console.error(err));

    fetch(`${backendUrl}/students/${cmsid}/complaints`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("studentComplaintsTable");
            tbody.innerHTML = "";
            data.forEach(c =>
                tbody.appendChild(createTableRow(c, ["complaintID", "complaintDate", "complaintTime", "complaintText", "status"]))
            );
        }).catch(err => console.error(err));

    fetch(`${backendUrl}/students/${cmsid}/roommates`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("studentRoommatesTable");
            tbody.innerHTML = "";
            data.forEach(r => tbody.appendChild(createTableRow(r, ["CMSID", "studentName", "Semester"])));
        }).catch(err => console.error(err));


}

function fetchNoViolationStudents() {
    fetch(`${backendUrl}/students/no-violations`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("noViolationStudentsTable");
            tbody.innerHTML = "";
            data.forEach(s => tbody.appendChild(createTableRow(s, ["CMSID", "studentName", "roomNo", "Semester", "Major"])));
        }).catch(err => console.error(err));
}

// ------------------ HOSTEL REPORTS ------------------
function showHostelReports() {
    const hosid = document.getElementById("hostelID").value;
    if (!hosid) return alert("Enter Hostel ID");

    fetch(`${backendUrl}/hostels/${hosid}/unpaidmess`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("hostelUnpaidMessTable");
            tbody.innerHTML = "";
            data.forEach(r => tbody.appendChild(createTableRow(r, ["CMSID", "studentName", "roomNo", "Amount", "Status"])));
        }).catch(err => console.error(err));

    fetch(`${backendUrl}/hostels/${hosid}/pendingcleaning`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("hostelPendingCleaningTable");
            tbody.innerHTML = "";
            data.forEach(r => tbody.appendChild(createTableRow(r, ["recordID", "CMSID", "studentName", "ServiceName", "RequestDate", "Status"])));
        }).catch(err => console.error(err));

    fetch(`${backendUrl}/hostels/${hosid}/violations`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("hostelViolationsTable");
            tbody.innerHTML = "";
            data.forEach(v => tbody.appendChild(createTableRow(v, ["ViolationID", "CMSID", "studentName", "ViolationDate", "Detail", "Fine"])));
        }).catch(err => console.error(err));

    fetch(`${backendUrl}/hostels/${hosid}/complaints`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("hostelComplaintsTable");
            tbody.innerHTML = "";
            data.forEach(c =>
                tbody.appendChild(createTableRow(c, [
                    "complaintID",
                    "CMSID",
                    "studentName",
                    "complaintDate",
                    "complaintTime",
                    "complaintText",
                    "status"
                ]))
            );
        })
        .catch(err => console.error(err));

}

// ========== FETCH STAFF ==========
function fetchStaff() {
    fetch(`${backendUrl}/staff`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#staffTable tbody");
            tbody.innerHTML = "";

            data.forEach(s => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${s.staffID}</td>
                    <td>${s.staffName}</td>
                    <td>${s.hostelName}</td>
                    <td>${s.roleName || "—"}</td>
                    <td><button onclick="deleteStaff(${s.staffID})">Delete</button></td>
                `;
                tbody.appendChild(row);
            });
        });
}

// ========== ADD STAFF ==========
const addStaffForm = document.getElementById("addStaffForm");
if (addStaffForm) {
    addStaffForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const staffObj = {
            staffID: document.getElementById("staffID").value,
            staffName: document.getElementById("staffName").value,
            roleID: document.getElementById("roleID").value,
            hosID: document.getElementById("hosID").value
        };

        fetch(`${backendUrl}/staff`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(staffObj)
        })
            .then(() => { addStaffForm.reset();  fetchStaff()});
    });
}

// ========== DELETE STAFF ==========
function deleteStaff(id) {
    fetch(`${backendUrl}/staff/${id}`, {
        method: "DELETE"
    }).then(() => fetchStaff());
}

// Auto-load on staff.html
if (window.location.pathname.endsWith("staff.html")) {
    fetchStaff();
}


// ========== FETCH LEAVES ==========
function fetchLeaves() {
    fetch(`${backendUrl}/staffLeaves`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#leaveTable tbody");
            tbody.innerHTML = "";

            data.forEach(l => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${l.recordID}</td>
                    <td>${l.staffID}</td>
                    <td>${l.staffName}</td>
                    <td>${l.roleName || "—"}</td>
                    <td>${l.hostelName}</td>
                    <td>${l.ArrivalDate}</td>
                    <td>${l.LeavingDate}</td>
                    <td>${l.Reason}</td>
                    <td><button onclick="deleteLeave(${l.recordID})">Delete</button></td>
                `;
                tbody.appendChild(row);
            });
        });
}

// ========== ADD LEAVE ==========
const addLeaveForm = document.getElementById("addLeaveForm");
if (addLeaveForm) {
    addLeaveForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const leaveObj = {
            staffID: document.getElementById("leaveStaffID").value,
            ArrivalDate: document.getElementById("arrivalDate").value,
            LeavingDate: document.getElementById("leavingDate").value,
            Reason: document.getElementById("reason").value
        };

        fetch(`${backendUrl}/staffLeaves`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(leaveObj)
        })
            .then(() => fetchLeaves());
    });
}

// ========== DELETE LEAVE ==========
function deleteLeave(id) {
    fetch(`${backendUrl}/staffLeaves/${id}`, {
        method: "DELETE"
    }).then(() => fetchLeaves());
}

// Auto-load on staffLeaves.html
if (window.location.pathname.endsWith("staffLeaves.html")) {
    fetchLeaves();
}
