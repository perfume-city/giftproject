// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAs4qjVud0NE6lkf-0GEa6VxFaLUhQGiGM",
  authDomain: "contacttest-b225c.firebaseapp.com",
  projectId: "contacttest-b225c",
  storageBucket: "contacttest-b225c.appspot.com",
  messagingSenderId: "968546523734",
  appId: "1:968546523734:web:01428f94a0d62c66c139f7",
  measurementId: "G-N9265PDPQ4",
  databaseURL: "https://gift-16723-default-rtdb.firebaseio.com/"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // يجب تعريف قاعدة البيانات

// Handle form submission
document.addEventListener("DOMContentLoaded", () => {
  const billingForm = document.getElementById("billingForm");

  billingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Validate fields
    const requiredFields = ["firstName", "lastName", "country", "phone", "email"];
    let isValid = true;

    requiredFields.forEach((field) => {
      const input = document.getElementById(field);
      if (!input.value.trim()) {
        isValid = false;
        input.style.border = "2px solid red";
      } else {
        input.style.border = "1px solid #ccc";
      }
    });

    if (!isValid) {
      alert("Please fill out all required fields.");
      return;
    }

    // Collect form data
    const formData = {
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      country: document.getElementById("country").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      refillScheme: document.getElementById("refillScheme").value.trim(),
    };

    // Store data in Firebase Realtime Database
    const dbRef = ref(database, "billingDetails"); // التأكد من تعريف `database`
    push(dbRef, formData)
      .then(() => {
        alert("Data submitted successfully!");
        billingForm.reset(); // Clear the form after submission
      })
      .catch((error) => {
        console.error("Error storing data:", error);
        alert("An error occurred while submitting the data. Please try again.");
      });
  });
});
