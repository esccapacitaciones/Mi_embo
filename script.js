import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAeWRoVhh8ZnGMb9bs6N5faAqOaoCZEol8",
  authDomain: "mi-embudo-oficial.firebaseapp.com",
  projectId: "mi-embudo-oficial",
  storageBucket: "mi-embudo-oficial.firebasestorage.app",
  messagingSenderId: "426831146692",
  appId: "1:426831146692:web:c35005f06cb410ed8ae391"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let leadsGlobal = [];

// LOGIN SIMPLE
window.login = function () {
  const pass = document.getElementById("password").value;

  if (pass === "1234") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("crmPanel").style.display = "block";
    cargarLeads();
  } else {
    alert("Contraseña incorrecta");
  }
};

// CARGAR LEADS
async function cargarLeads() {
  const leadsList = document.getElementById("leadsList");
  leadsList.innerHTML = "";

  const snapshot = await getDocs(collection(db, "leads"));

  leadsGlobal = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    leadsGlobal.push(data);

    leadsList.innerHTML += `
      <div style="border:1px solid #ccc;padding:10px;margin:5px;">
        <b>${data.nombre}</b><br>
        ${data.email}<br>
        ${data.telefono}<br>

        <a href="https://wa.me/57${data.telefono}" target="_blank">
          📲 WhatsApp
        </a>
      </div>
    `;
  });
}

// BUSCADOR
window.search = function () {
  const value = document.getElementById("search").value.toLowerCase();

  const filtered = leadsGlobal.filter(l =>
    l.nombre.toLowerCase().includes(value) ||
    l.email.toLowerCase().includes(value)
  );

  const leadsList = document.getElementById("leadsList");
  leadsList.innerHTML = "";

  filtered.forEach((data) => {
    leadsList.innerHTML += `
      <div style="border:1px solid #ccc;padding:10px;margin:5px;">
        <b>${data.nombre}</b><br>
        ${data.email}<br>
        ${data.telefono}<br>

        <a href="https://wa.me/57${data.telefono}" target="_blank">
          📲 WhatsApp
        </a>
      </div>
    `;
  });
};

// EXPORTAR CSV
window.exportarCSV = function () {
  let csv = "Nombre,Email,Telefono\n";

  leadsGlobal.forEach(l => {
    csv += `${l.nombre},${l.email},${l.telefono}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "leads.csv";
  a.click();
};
