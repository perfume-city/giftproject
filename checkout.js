// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, push, get, remove } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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
    const checkoutRef = ref(database, "checkout");

    // Collect form data
    const formData = {
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      country: document.getElementById("country").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      refillScheme: document.getElementById("refillScheme").value.trim(),
      paymentMethod: document.getElementById("paymentMethod").value.trim(),
    };

    // Store data in Firebase Realtime Database
   // التأكد من تعريف `database`
    push(checkoutRef, formData)
      .then(() => {
        alert("Data submitted successfully!");
        document.getElementById("billingForm").reset(); // Clear the form after submission
      })
      .catch((error) => {
        console.error("Error storing data:", error);
        alert("An error occurred while submitting the data. Please try again.");
      });
      console.log("Form Data:", formData);
  });
});

// دالة لجلب بيانات checkout وعرضها في DOM
// جلب معلومات المنتج وعرضها في DOM
async function fetchProductDetails() {
  const productRef = ref(database, "perfumMen/${productId}"); // قم بتحديث "specificProductID" بمعرف المنتج المناسب
  try {
    const snapshot = await get(productRef);
    if (snapshot.exists()) {
      const product = snapshot.val();
      const productDetailsContainer = document.getElementById("productDetails");

      // إنشاء عرض المنتج
      productDetailsContainer.innerHTML = `
        <h4>Product Details</h4>
        <img src="${product.imageURL}" alt="${product.name}" class="img-fluid mb-3" />
        <p><strong>Name:</strong> ${product.name}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Description:</strong> ${product.description}</p>
      `;
    } else {
      console.warn("No product details found.");
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

// استدعاء دالة جلب المنتج عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  fetchProductDetails();
});

// دالة لحذف منتج من checkout
function removeFromCheckout(productId) {
  const productRef = ref(database, `checkout/${productId}`);
  remove(productRef)
    .then(() => {
      alert("Item removed from checkout.");
      const rowToRemove = document.querySelector(`button[data-id="${productId}"]`).closest('tr');
      rowToRemove.remove(); // حذف الصف من الجدول
    })
    .catch((error) => {
      console.error("Error removing item:", error);
    });
}

// استدعاء الدالة عند تحميل الصفحة
getCheckoutItems();
