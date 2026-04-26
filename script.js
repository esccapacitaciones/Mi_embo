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

// Guardar lead
const form = document.getElementById("leadForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  await addDoc(collection(db, "leads"), {
    nombre: nombre.value,
    email: email.value,
    telefono: telefono.value,
    fecha: new Date()
  });

  form.reset();
  cargarLeads();
});

// Mostrar leads
const leadsList = document.getElementById("leadsList");

let leadsGlobal = [];

async function cargarLeads() {
  leadsList.innerHTML = "";

  const snapshot = await getDocs(collection(db, "leads"));

  leadsGlobal = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    leadsGlobal.push(data);

    leadsList.innerHTML += `
      <div style="border:1px solid #ddd;padding:10px;margin:5px;">
        <b>${data.nombre}</b><br>
        ${data.email}<br>
        ${data.telefono}
      </div>
    `;
  });
}

cargarLeads();

// EXPORTAR A CSV (Excel)
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
