const API_BASE_URL = "http://localhost:3000/api";

// Redirect users based on role after login
async function handleLogin(formId, redirectUser, redirectOfficer) {
  document.getElementById(formId).addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = data.role === "officer" ? redirectOfficer : redirectUser;
      } else {
        alert(data.msg || "Login failed");
      }
    } catch (err) {
      console.error(err);
    }
  });
}

// User & Officer Login
if (document.getElementById("loginForm")) handleLogin("loginForm", "dashboard.html", "officer-dashboard.html");
if (document.getElementById("officerLoginForm")) handleLogin("officerLoginForm", "dashboard.html", "officer-dashboard.html");

// Fetch Complaints
async function fetchComplaints(listId, endpoint) {
  if (document.getElementById(listId)) {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      const data = await response.json();
      if (response.ok) {
        const list = document.getElementById(listId);
        list.innerHTML = data.map(complaint => `<li class='p-2 border-b'>${complaint.description}</li>`).join("");
      } else {
        alert(data.msg || "Failed to fetch complaints");
      }
    } catch (err) {
      console.error(err);
    }
  }
}
fetchComplaints("complaintsList", "complaints");
fetchComplaints("officerComplaintsList", "officer/complaints");
