import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("leadForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;

  try {
    await addDoc(collection(db, "leads"), {
      nombre,
      email,
      telefono,
      fecha: new Date(),
      estado: "Nuevo",
      empresa: "Logísticos A y G"
    });

    const mensaje = `Hola, soy ${nombre}. Solicité información sobre los servicios empresariales de Logísticos A y G.`;

    const numeroEmpresa = "57TU_NUMERO_AQUI";

    window.open(
      `https://wa.me/${numeroEmpresa}?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );

    alert("Solicitud enviada correctamente 🚀");
    form.reset();

  } catch (error) {
    console.error(error);
    alert("Error al enviar solicitud");
  }
});
