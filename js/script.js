// ==================================================================
// Tourism Management System - Main Script
// ==================================================================

// Run once DOM is ready

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Tourism Management System Loaded Successfully!");

  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");
  const page = window.location.pathname.split("/").pop();

  // Restrict access to admin pages if not logged in
  if (
    (page === "admin-dashboard.html" || page === "add-package.html") &&
    !isAdminLoggedIn
  ) {
    alert("Access denied! Please log in first.");
    window.location.href = "admin-login.html";
    return;
  }

  // Load packages automatically on admin dashboard
  if (page === "admin-dashboard.html") {
    loadPackages();
  }
});


// ==================================================================
// ADMIN LOGIN FUNCTION
// ==================================================================
function adminLogin(event) {
  event.preventDefault();

  const username = document.getElementById("adminUsername").value.trim();
  const password = document.getElementById("adminPassword").value.trim();

  if (username === "admin" && password === "admin123") {
    localStorage.setItem("adminLoggedIn", "true");
    alert("✅ Login successful!");
    window.location.href = "admin-dashboard.html";
  } else {
    alert("❌ Invalid credentials! Try admin / admin123");
  }
}


// ==================================================================
// ADMIN LOGOUT FUNCTION
// ==================================================================
function logoutAdmin() {
  localStorage.removeItem("adminLoggedIn");
  alert("👋 Logged out successfully!");
  window.location.href = "../index.html";
}


// ==================================================================
// ADD NEW PACKAGE FUNCTION
// ==================================================================
function addPackage(event) {
  event.preventDefault();

  const name = document.getElementById("packageName").value.trim();
  const price = document.getElementById("packagePrice").value.trim();
  const duration = document.getElementById("packageDuration").value.trim();
  const image = document.getElementById("packageImage").value.trim();

  if (!name || !price || !duration || !image) {
    alert("⚠️ Please fill in all fields!");
    return;
  }

  const newPackage = { name, price, duration, image };

  let packages = JSON.parse(localStorage.getItem("packages")) || [];
  packages.push(newPackage);
  localStorage.setItem("packages", JSON.stringify(packages));

  alert("✅ Package added successfully!");
  window.location.href = "admin-dashboard.html";
}


// ==================================================================
// LOAD PACKAGES ON ADMIN DASHBOARD
// ==================================================================
function loadPackages() {
  const packages = JSON.parse(localStorage.getItem("packages")) || [];
  const tableBody = document.querySelector("#packageTable tbody");

  if (!tableBody) return;

  tableBody.innerHTML = "";

  if (packages.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4">No packages available.</td></tr>`;
    return;
  }

  packages.forEach((pkg, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${pkg.name}</td>
      <td>${pkg.price}</td>
      <td>${pkg.duration}</td>
      <td>
        <button onclick="deletePackage(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}


// ==================================================================
// DELETE PACKAGE FUNCTION
// ==================================================================
function deletePackage(index) {
  let packages = JSON.parse(localStorage.getItem("packages")) || [];

  if (!confirm(`Are you sure you want to delete "${packages[index].name}"?`))
    return;

  packages.splice(index, 1);
  localStorage.setItem("packages", JSON.stringify(packages));

  alert("🗑️ Package deleted successfully!");
  loadPackages();
}
// ==================================================================
// USER REGISTRATION FUNCTION
// ==================================================================
function registerUser(event) {
  event.preventDefault();

  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const confirm = document.getElementById("regConfirm").value.trim();

  if (!name || !email || !password || !confirm) {
    alert("⚠️ Please fill in all fields!");
    return;
  }

  if (password !== confirm) {
    alert("❌ Passwords do not match!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Prevent duplicate registration
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    alert("⚠️ Email already registered! Try logging in instead.");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("✅ Registration successful! You can now log in.");
  window.location.href = "login.html";
}


// ==================================================================
// USER LOGIN FUNCTION (Optional for your login.html)
// ==================================================================
function userLogin(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const validUser = users.find(
    user => user.email === email && user.password === password
  );

  if (validUser) {
    alert(`✅ Welcome back, ${validUser.name}!`);
    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    window.location.href = "index.html";
  } else {
    alert("❌ Invalid email or password!");
  }
}
// ==================================================================
// CONTACT FORM FUNCTION
// ==================================================================
function sendContact(event) {
  event.preventDefault();

  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  if (!name || !email || !message) {
    alert("⚠️ Please fill out all fields!");
    return;
  }

  const contactData = { name, email, message, date: new Date().toLocaleString() };
  let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
  messages.push(contactData);
  localStorage.setItem("contactMessages", JSON.stringify(messages));

  alert("✅ Thank you for contacting us! We’ll get back soon.");
  event.target.reset();
}


// ==================================================================
// FEEDBACK FORM FUNCTION
// ==================================================================
function submitFeedback(event) {
  event.preventDefault();

  const name = document.getElementById("fbName").value.trim();
  const email = document.getElementById("fbEmail").value.trim();
  const message = document.getElementById("fbMessage").value.trim();

  if (!name || !email || !message) {
    alert("⚠️ Please complete all fields!");
    return;
  }

  const feedbackData = { name, email, message, date: new Date().toLocaleString() };
  let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbacks.push(feedbackData);
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  alert("🎉 Thanks for your valuable feedback!");
  event.target.reset();
}
// ===============================
// Confirm Booking Function
// ===============================
function confirmBooking(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const tour = document.getElementById("tour").value;
  const date = document.getElementById("date").value;
  const people = document.getElementById("people").value;

  const booking = {
    name,
    email,
    tour,
    date,
    people,
    timestamp: new Date().toLocaleString(),
  };

  // Save to localStorage
  localStorage.setItem("bookingDetails", JSON.stringify(booking));

  // Redirect to confirmation page
  window.location.href = "confirmation.html";
}
