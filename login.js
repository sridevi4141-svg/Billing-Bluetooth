import { auth, db } from "./firebase.js";

import { signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

window.loginOwner = async function () {

    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value;

    if (!username || !password) {
        alert("Enter Username & Password");
        return;
    }

    try {

        const q = query(
            collection(db, "owners"),
            where("username", "==", username)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            alert("Username Not Found");
            return;
        }

        const owner = snapshot.docs[0].data();
        const email = owner.email;

        await signInWithEmailAndPassword(auth, email, password);

        alert("Login Successful");
        location.href = "index.html";

    } catch (e) {
        alert(e.message);
    }
};