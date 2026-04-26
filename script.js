import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc
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

// LOGIN
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

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    data.id = docSnap.id;
    leadsGlobal.push(data);

    leadsList.innerHTML += renderLead(data);
  });
}

// HTML de cada lead
function renderLead(data) {
  return `
    <div style="border:1px solid #ccc;padding:10px;margin:5px;">
      <b>${data.nombre}</b><br>
      ${data.email}<br>
      ${data.telefono}<br>

      <b>Estado:</b> ${data.estado || "Nuevo"}<br>

      <button onclick="cambiarEstado('${data.id}', 'Contactado')">Contactado</button>
      <button onclick="cambiarEstado('${data.id}', 'Vendido')">Vendido</button>

      <a href="https://wa.me/57${data.telefono}" target="_blank">
        📲 WhatsApp
      </a>
    </div>
  `;
}

// CAMBIAR ESTADO
window.cambiarEstado = async function (id, estado) {
  await updateDoc(doc(db, "leads", id), {
    estado: estado
  });

  cargarLeads();
};

// BUSCADOR
window.buscar = function () {
  const value = document.getElementById("search").value.toLowerCase();

  const filtered = leadsGlobal.filter(l =>
    l.nombre.toLowerCase().includes(value) ||
    l.email.toLowerCase().includes(value)
  );

  const leadsList = document.getElementById("leadsList");
  leadsList.innerHTML = "";

  filtered.forEach(l => {
    leadsList.innerHTML += renderLead(l);
  });
};

// EXPORTAR CSV
window.exportarCSV = function () {
  let csv = "Nombre,Email,Telefono,Estado\n";

  leadsGlobal.forEach(l => {
    csv += `${l.nombre},${l.email},${l.telefono},${l.estado || "Nuevo"}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "leads.csv";
  a.click();
};
