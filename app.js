// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAINwFYBKqgYOGbzTGwVZuMtFPVXZqxfjQ",
  authDomain: "pro-jonassberdon.firebaseapp.com",
  projectId: "pro-jonassberdon",
  storageBucket: "pro-jonassberdon.firebasestorage.app",
  messagingSenderId: "322971135977",
  appId: "1:322971135977:web:84159acd85da9e54882578",
  measurementId: "G-4KB5WTJ4RY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Usuario registrado"))
    .catch(e => alert(e.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Bienvenido"))
    .catch(e => alert(e.message));
}

function logout() {
  auth.signOut();
}

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("reserva-section").style.display = "block";
    document.getElementById("user-info").innerText = Usuario: ${user.email};
    mostrarReservas(user.uid);
  } else {
    document.getElementById("login-section").style.display = "block";
    document.getElementById("reserva-section").style.display = "none";
  }
});

function reservar() {
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const lab = document.getElementById("laboratorio").value;
  const user = auth.currentUser;

  db.collection("reservas").add({
    uid: user.uid,
    email: user.email,
    fecha,
    hora,
    laboratorio: lab
  }).then(() => {
    alert("Reservación registrada");
    mostrarReservas(user.uid);
  });
}

function mostrarReservas(uid) {
  db.collection("reservas").where("uid", "==", uid).get().then(snapshot => {
    const lista = document.getElementById("lista-reservas");
    lista.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const li = document.createElement("li");
      li.innerText = ${data.fecha} - ${data.hora} - ${data.laboratorio};
      lista.appendChild(li);
    });
  });
}