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
      window.location.href = "./index.html";
    });

    // Populate the user profile form
    document.getElementById("header-name").innerHTML = userData.username || "User";
    document.getElementById("fullName").value = userData.username || "";
    document.getElementById("email").value = userData.email || "";
    document.getElementById("phone").value = userData.phoneNumber || "";


    // Save Changes (Edit Profile)
    const saveButton = document.getElementById("save");
    saveButton.addEventListener("click", () => {
      const newHeaderName = document.getElementById("header-name").innerHTML.trim();
      const newFullName = document.getElementById("editFullName").value.trim();
      const newPhone = document.getElementById("editPhone").value.trim();

      if (!newFullName || !/^\w+(\s\w+)*$/.test(newFullName)) {
        Swal.fire({
          title: "Invalid Name",
          text: "Please enter a valid full name.",
          icon: "error",
        });
        return;
      }

      if (!newPhone || !/^07\d{8}$/.test(newPhone)) {
        Swal.fire({
          title: "Invalid Phone",
          text: "Phone number must be 10 digits and start with 07.",
          icon: "error",
        });
        return;
      }

      // Update user data
      userData.username = newFullName;
      userData.phoneNumber = newPhone;
      // Save updated user data locally
      localStorage.setItem("userData", JSON.stringify(userData));

      Swal.fire({
        title: "Profile Updated",
        text: "Your changes have been saved successfully.",
        icon: "success",
      }).then(() => {
        // Update form fields
        document.getElementById("fullName").value = userData.username;
        document.getElementById("phone").value = userData.phoneNumber;
        document.getElementById("editFullName").value = "";
        document.getElementById("editPhone").value = "";
        document.getElementById("header-name").innerHTML = userData.username;
        profileName.textContent = userData.username;
      });
    });

    // Delete Profile
    const deleteButton = document.querySelector(".btn-danger");
    deleteButton.addEventListener("click", () => {
      Swal.fire({
        title: "Are you sure?",
        text: "This action will delete your profile and cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // Clear user data
          localStorage.removeItem("userData");
          localStorage.removeItem("isNewUser");

          Swal.fire({
            title: "Profile Deleted",
            text: "Your profile has been deleted successfully.",
            icon: "success",
          }).then(() => {
            window.location.href = "./signinup.html"; // Redirect to login page
          });
        }
      });
    });
  } else {
    // User is not logged in
    profileName.textContent = "Sign In";
    profileIcon.addEventListener("click", () => {
      window.location.href = "./signinup.html"; // Redirect to login page
    });

    // Hide logout button
    logoutButton.style.display = "none";
  }
});
