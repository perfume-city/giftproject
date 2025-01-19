import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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
const db = getDatabase(app);

// الدالة لجلب البيانات وعرضها على DOM
async function getPerfumeMenItems() {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, "hairCare"));
    if (snapshot.exists()) {
      const data = snapshot.val();

      // حاوية المنتجات
      const productContainer = document.querySelector(".product-container");
      productContainer.innerHTML = ""; // تفريغ المحتوى القديم

      // عرض كل منتج على DOM
      Object.entries(data).forEach(([key, hairCare]) => {
        const productCard = document.createElement("div");
        productCard.className = "productCard";

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${hairCare.image}" alt="${hairCare.name}">
            </div>
            <p class="nameProduct">${hairCare.nameProduct}</p>
            <p class="detailsProduct">${hairCare.detailsProduct}</p>
            <strong class="project-title">
                <span class="rate">
                    <i class="fa-solid fa-star" style="color: #b99765;"></i>
                    <i class="fa-solid fa-star" style="color: #b99765;"></i>
                    <i class="fa-solid fa-star" style="color: #b99765;"></i>
                    <i class="fa-solid fa-star" style="color: #b99765;"></i>
                    <i class="fa-solid fa-star" style="color: #b99765;"></i>
                </span>
            </strong>
            <p class="price">${hairCare.price}.00JD</p>
            <a href="detailsHair.html?id=${key}" class="more-details">Read More</a>
        `;

        productContainer.appendChild(productCard);
      });
    } else {
      console.log("No data available in perfumeMen");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// استدعاء الدالة
getPerfumeMenItems();
