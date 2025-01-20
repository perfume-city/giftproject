import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, get, child, push,onChildAdded } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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

document.addEventListener("DOMContentLoaded", async () => {
    // قراءة المعرف من الرابط
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
        try {
            // جلب بيانات المنتج من Firebase
            const dbRef = ref(db);
            const snapshot = await get(child(dbRef, `naturalProducts/${productId}`));
            
            if (snapshot.exists()) {
                const product = snapshot.val();

                // تحديث الصفحة بمعلومات المنتج
                document.querySelector(".product-header img").src =` image/${product.image}`;
                document.querySelector(".product-header img").alt = product.nameProduct;
                document.querySelector(".product-header h1").textContent = product.nameProduct;
                document.querySelector(".rating").textContent = "★★★★★"; // أو بناءً على التقييم
                document.querySelector(".details").innerHTML = `Details: ${product.detailsProduct}`;
                document.querySelector(".price").textContent = `${product.price}.00 JD`;
                // document.querySelector(".product-description p").textContent = product.detailsProduct;
            } else {
                console.error("Product not found.");
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    } else {
        console.error("No product ID found in URL.");
    }
});



async function getPerfumeMenItems() {
    const dbRef = ref(db);
    try {
      const snapshot = await get(child(dbRef, "naturalProducts"));
      if (snapshot.exists()) {
        const data = snapshot.val();
  
        // تحويل البيانات إلى مصفوفة
        const productsArray = Object.entries(data).map(([key, product]) => ({
          key,
          ...product,
        }));
  
        // اختيار 4 منتجات عشوائية
        const randomProducts = productsArray
          .sort(() => 0.5 - Math.random()) // مزج المصفوفة عشوائيًا
          .slice(0, 4); // أخذ أول 4 عناصر
  
        // حاوية المنتجات
        const productContainer = document.querySelector(".content");
        productContainer.innerHTML = ""; // تفريغ المحتوى القديم
  
        // عرض المنتجات العشوائية على DOM
        randomProducts.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.className = "productCard";
  
          productCard.innerHTML = `
              <div class="product-image">
                  <img src="${product.image}" alt="${product.nameProduct}">
              </div>
              <p class="nameProduct">${product.nameProduct}</p>
              <p class="detailsProduct">${product.detailsProduct}</p>
              <strong class="project-title">
                  <span class="rate">
                      <i class="fa-solid fa-star" style="color: #b99765;"></i>
                      <i class="fa-solid fa-star" style="color: #b99765;"></i>
                      <i class="fa-solid fa-star" style="color: #b99765;"></i>
                      <i class="fa-solid fa-star" style="color: #b99765;"></i>
                      <i class="fa-solid fa-star" style="color: #b99765;"></i>
                  </span>
              </strong>
              <p class="price">${product.price}.00JD</p>
              <a href="detailsNatural.html?id=${product.key}" class="more-details">Read More</a>
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
  
  document.addEventListener("DOMContentLoaded", async () => {
      // قراءة المعرف من الرابط
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get("id");
  
      if (productId) {
          try {
              // جلب بيانات المنتج من Firebase
              const dbRef = ref(db);
              const snapshot = await get(child(dbRef, `naturalProducts/${productId}`));
              
              if (snapshot.exists()) {
                  const product = snapshot.val();
  
                  // تحديث الصفحة بمعلومات المنتج
                  document.querySelector(".product-header img").src = product.image;
                  document.querySelector(".product-header img").alt = product.nameProduct;
                  document.querySelector(".product-header h1").textContent = product.nameProduct;
                  document.querySelector(".rating").textContent = "★★★★★"; // أو بناءً على التقييم
                  document.querySelector(".details").innerHTML = `Details: ${product.detailsProduct}`;
                  document.querySelector(".price").textContent = `${product.price}.00 JD`;
              } else {
                  console.error("Product not found.");
              }
          } catch (error) {
              console.error("Error fetching product:", error);
          }
      } else {
          console.error("No product ID found in URL.");
      }
  });
  
  ///////// rating and review ///////////////////
  document.getElementById('reviewForm').addEventListener('submit', function (event) {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const rating = document.querySelector('input[name="rating"]:checked')?.value;
      const review = document.getElementById('review').value;
  
      if (name && rating && review) {
          // إرسال البيانات إلى Firebase
          const reviewsRef = ref(db, 'reviews');  // تغيير إلى 'ref(db, 'reviews')'
          push(reviewsRef, {
              name: name,
              rating: rating,
              review: review
          });
  
          // تنظيف النموذج بعد الإرسال
          document.getElementById('reviewForm').reset();
      } else {
          alert('Enter Your Name & Rate and Reviews');
      }
  });
  
  // استرجاع التعليقات والتقييمات من Firebase وعرضها في DOM
  const reviewsRef = ref(db, 'reviews');
  onChildAdded(reviewsRef, function (snapshot) {
      const reviewData = snapshot.val();
      const stars = '★'.repeat(reviewData.rating);
      const reviewElement = document.createElement('div');
      reviewElement.classList.add('review')
      reviewElement.innerHTML = `
          <p><strong>${reviewData.name}</strong></p>
          <p class="star-rating-display">${stars}</p>
          <p>${reviewData.review}</p>
      `;
      document.getElementById('reviews').appendChild(reviewElement);
  });