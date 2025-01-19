// استيراد وظائف Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAs4qjVud0NE6lkf-0GEa6VxFaLUhQGiGM",
  authDomain: "contacttest-b225c.firebaseapp.com",
  projectId: "contacttest-b225c",
  storageBucket: "contacttest-b225c.appspot.com",
  messagingSenderId: "968546523734",
  appId: "1:968546523734:web:01428f94a0d62c66c139f7",
  measurementId: "G-N9265PDPQ4",
  databaseURL: "https://gift-16723-default-rtdb.firebaseio.com"  // تأكد من الرابط الصحيح
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// معالجة إرسال النموذج
document.getElementById("feedbackForm").addEventListener("submit", function (e) {
  e.preventDefault(); // منع إعادة تحميل الصفحة

  // الحصول على البيانات من الحقول
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // إنشاء مرجع في قاعدة البيانات
  const feedbackRef = ref(db, "feedback");

  // إضافة البيانات إلى Realtime Database
  push(feedbackRef, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    subject: subject,
    message: message,
  })
    .then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'your feedback was sent successfully.',
            confirmButtonText: 'OK'
          });
          
    //   alert("تم إرسال الرسالة بنجاح!");
      document.getElementById("feedbackForm").reset(); // إعادة تعيين النموذج
    })
    .catch((error) => {
      console.error("خطأ أثناء تخزين البيانات: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while sending the message.Please try again.",
      });
    });
});
