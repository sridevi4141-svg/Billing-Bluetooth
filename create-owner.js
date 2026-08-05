import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
document.getElementById("btnCreate").addEventListener("click", createOwner);

async function createOwner() {

   
    let ownerName = document.getElementById("ownerName").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let email = document.getElementById("email").value.trim();
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    // Migatha code same...

    if (
        
        !ownerName ||
        !mobile ||
        !email ||
        !username ||
        !password ||
        !confirmPassword
    ) {
        alert("Please Fill All Fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords Do Not Match");
        return;
    }

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        await setDoc(
            doc(db, "owners", userCredential.user.uid),
            {
                
                ownerName: ownerName,
                mobile: mobile,
                email: email,
                username: username,
                createdAt: new Date()
            }
        );

        alert("Owner Account Created Successfully");

        location.href = "login.html";

    } catch (e) {
    console.log(e);
    console.log(e.code);
    console.log(e.message);

    alert(e.code + "\n" + e.message);

    }
}
console.log(db);
console.log(auth);
console.log(userCredential.user.uid);