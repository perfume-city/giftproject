document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isNewUser = localStorage.getItem("isNewUser");
  const profileIcon = document.getElementById("profileIcon");
  const profileName = document.getElementById("profileName");
  const logoutButton = document.getElementById("logoutButton");

  if (userData) {
    // Show a welcome message if the user is new
    if (isNewUser === "true") {
      Swal.fire({
        title: `Welcome, ${userData.username}!`,
        text: "We're glad to have you here.",
        icon: "success",
        confirmButtonText: "Let's Get Started",
      }).then(() => {
        // Clear the isNewUser flag so the message doesn't appear again
        localStorage.setItem("isNewUser", "false");
      });
    }

    // User is logged in, display username and show logout button
    profileName.textContent = userData.username || "User";
    profileIcon.addEventListener("click", () => {
      window.location.href = "./profileuser.html"; // Redirect to the user's profile page (optional)
    });

    // Show logout button
    logoutButton.style.display = "inline-block";

    // Logout functionality
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userData");
      localStorage.removeItem("isNewUser"); // Clear the flag on logout
      window.location.reload(); // Reload the page to update UI
    });
  } else {
    // User is not logged in, show 'Sign In'
    profileName.textContent = "Sign In";
    profileIcon.addEventListener("click", () => {
      window.location.href = "./signinup.html"; // Redirect to login page
    });

    // Hide logout button if not logged in
    logoutButton.style.display = "none";
  }
});
