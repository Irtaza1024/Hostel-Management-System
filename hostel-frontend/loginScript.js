const backendUrl = "http://localhost:3000";

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                document.getElementById("errorMsg").innerText = data.message;
                document.getElementById("errorMsg").style.display = "block";
                return;
            }

            // Redirect based on role
            switch (data.role) {
                case "admin":
                    window.location.href = "dd.html";
                    break;
                case "manager":
                    window.location.href = "manager.html";
                    break;
                case "student":
                    window.location.href = "s.html";
                    break;
                case "staff":
                    window.location.href = "staff.html";
                    break;
                default:
                    document.getElementById("errorMsg").innerText = "Unknown role!";
                    document.getElementById("errorMsg").style.display = "block";
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById("errorMsg").innerText = "Server error!";
            document.getElementById("errorMsg").style.display = "block";
        });
});
