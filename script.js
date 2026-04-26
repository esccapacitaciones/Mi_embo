import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

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

const form = document.getElementById("leadForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "leads"), {
      nombre: document.getElementById("nombre").value,
      email: document.getElementById("email").value,
      telefono: document.getElementById("telefono").value,
      fecha: new Date(),
      estado: "Nuevo",
      empresa: "Logísticos A y G"
    });

    alert("Gracias, pronto te contactamos 🚀");
    form.reset();

  } catch (error) {
    console.error(error);
    alert("Error al enviar información");
  }
});
