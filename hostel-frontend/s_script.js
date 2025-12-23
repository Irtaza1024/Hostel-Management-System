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



function showStudentComplaints() {
    const cmsid = document.getElementById("studentCMSID").value;
    if (!cmsid) return alert("Enter CMSID");

    fetch(`${backendUrl}/students/${cmsid}/complaints`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("studentComplaintsTable");
            tbody.innerHTML = "";
            data.forEach(c =>
                tbody.appendChild(createTableRow(c, ["complaintID", "complaintDate", "complaintTime", "complaintText", "status"]))
            );
        }).catch(err => console.error(err));
}



function showStudentViolations() {
    const cmsid = document.getElementById("studentCMSID").value;
    if (!cmsid) return alert("Enter CMSID");

    fetch(`${backendUrl}/students/${cmsid}/violations`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("studentViolationsTable");
            tbody.innerHTML = "";
            data.forEach(v => tbody.appendChild(createTableRow(v, ["ViolationID", "ViolationDate", "Detail", "Fine"])));
        }).catch(err => console.error(err));
}




function showStudentMessStatus() {
    const cmsid = document.getElementById("studentCMSID").value;
    if (!cmsid) return alert("Enter CMSID");

    fetch(`${backendUrl}/students/${cmsid}/messStatus`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("studentMessStatusTable");
            tbody.innerHTML = "";
            data.forEach(r => tbody.appendChild(createTableRow(r, ["billID", "Amount", "Status"])));
        }).catch(err => console.error(err));
}



function showStudentMessRecords() {
    const cmsid = document.getElementById("studentCMSID").value;
    if (!cmsid) return alert("Enter CMSID");

    fetch(`${backendUrl}/students/${cmsid}/messRecords`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("studentMessRecordsTable");
            tbody.innerHTML = "";
            data.forEach(r => tbody.appendChild(createTableRow(r, ["recordID", "LeavingDate", "ArrivalDate"])));
        }).catch(err => console.error(err));
}



function showStudentCleaningRecords() {
    const cmsid = document.getElementById("studentCMSID").value;
    if (!cmsid) return alert("Enter CMSID");

    fetch(`${backendUrl}/students/${cmsid}/cleaningRecords`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("studentCleaningRecordsTable");
            tbody.innerHTML = "";
            data.forEach(r => tbody.appendChild(createTableRow(r, ["recordID", "requestDate", "serviceName", "Status"])));
        }).catch(err => console.error(err));
}


function addCleaning(e) {
    e.preventDefault();
    const form = document.getElementById("addCleaningForm");
    const payload = Object.fromEntries(new FormData(form));
    fetch(`${backendUrl}/cleaningrecords`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        .then(res => res.json())
        .then(() => { form.reset(); showStudentCleaningRecords(); })
        .catch(err => console.error(err));
}

if (document.getElementById("addCleaningForm")) {
    document.getElementById("addCleaningForm").addEventListener("submit", addCleaning);
    fetchCleaning();
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

// Initialize
if (document.getElementById("addComplaintForm")) {
    document.getElementById("addComplaintForm").addEventListener("submit", addComplaint);
    fetchComplaints();
}