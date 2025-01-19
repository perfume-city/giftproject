import {
  auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  doc,
  ref,
  set,
  firestore,
  database,
} from "./firebaseConfig.js";
                                                            
const signUpForm = document.getElementById("sign-up-form");                        
const registrationMessage = document.getElementById("registrationMessage");             

signUpForm.addEventListener("submit", async (e) => {             
  e.preventDefault();                             
                                                    
  const formData = new FormData(signUpForm);                                                                                                               
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const phoneNumber = formData.get("phonenumber");

  // Regex patterns for email and password validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const phoneNumberPattern = /^07\d{8}$/;

  if (!username || !email || !password || !phoneNumber) {
    registrationMessage.textContent = "Please fill in all fields.";
    return;
  }

  if (!emailPattern.test(email)) {
    registrationMessage.textContent = "Invalid email format.";
    return;
  }

  if (!passwordPattern.test(password)) {
    registrationMessage.textContent =
      "Password must be at least 8 characters long and contain at least one numeric digit, one uppercase and one lowercase letter.";
    return;
  }

  if (!phoneNumberPattern.test(phoneNumber)) {
    registrationMessage.textContent =
      "Phone number must be 10 digits and start with 07.";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userData = { username, email, phoneNumber };

    await setDoc(doc(firestore, "users", user.uid), userData);
    await set(ref(database, `users/${user.uid}`), userData);

    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isNewUser", "true"); // Mark as new user

    registrationMessage.textContent = "Registration successful!";
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 1000);
  } catch (error) {
    registrationMessage.textContent = `${error.message}`;
  }
});

const signInForm = document.getElementById("sign-in-form");
const signInMessage = document.getElementById("signInMessage");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("sign-in-email").value;
  const password = document.getElementById("sign-in-password").value;

  // Regex pattern for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    signInMessage.textContent = "Please fill in all fields.";
    return;
  }

  if (!emailPattern.test(email)) {
    signInMessage.textContent = "Invalid email format.";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userData = {
      email: user.email,
      uid: user.uid,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isNewUser", "false"); // Mark as returning user

    signInMessage.textContent = "Sign-in successful!";
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 1000);
  } catch (error) {
    signInMessage.textContent = `${error.message}`;
  }
});

const googleSignInBtn = document.getElementById("googleSignInBtn");
googleSignInBtn.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const [username] = user.displayName
      ? user.displayName.split(" ")
      : ["", ""];
    const userData = {
      username,
      email: user.email,
      uid: user.uid,
    };

    await setDoc(doc(firestore, "users", user.uid), userData);
    await set(ref(database, `users/${user.uid}`), userData);

    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isNewUser", "true"); // Mark as new user

    registrationMessage.textContent = "Google sign-in successful!";
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 4000);
  } catch (error) {
    registrationMessage.textContent = `${error.message}`;
  }
});

const googleSignUpBtn = document.getElementById("googleSignUpBtn");
googleSignUpBtn.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const [username] = user.displayName
      ? user.displayName.split(" ")
      : ["", ""];
    const userData = {
      username,
      email: user.email,
      uid: user.uid,
    };

    await setDoc(doc(firestore, "users", user.uid), userData);
    await set(ref(database, `users/${user.uid}`), userData);

    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isNewUser", "true"); // Mark as new user

    registrationMessage.textContent = "Google sign-up successful!";
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 4000);
  } catch (error) {
    registrationMessage.textContent = `${error.message}`;
  }
});

const facebookSignInBtn = document.getElementById("facebookSignInBtn");
facebookSignInBtn.addEventListener("click", async () => {
  const provider = new FacebookAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userData = {
      username: user.displayName.split(" ")[0],
      email: user.email,
      uid: user.uid,
    };

    await setDoc(doc(firestore, "users", user.uid), userData);

    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isNewUser", "true"); // Mark as new user

    registrationMessage.textContent = "Facebook sign-in successful!";
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 4000);
  } catch (error) {
    registrationMessage.textContent = `${error.message}`;
  }
});

const facebookSignUpBtn = document.getElementById("facebookSignUpBtn");
facebookSignUpBtn.addEventListener("click", async () => {
  const provider = new FacebookAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userData = {
      username: user.displayName.split(" ")[0],
      email: user.email,
      uid: user.uid,
    };

    await setDoc(doc(firestore, "users", user.uid), userData);

    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isNewUser", "true"); // Mark as new user

    registrationMessage.textContent = "Facebook sign-up successful!";
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 4000);
  } catch (error) {
    registrationMessage.textContent = `${error.message}`;
  }
});

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
