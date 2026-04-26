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

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;

  await addDoc(collection(db, "leads"), {
    nombre,
    email,
    telefono,
    fecha: new Date()
  });

  alert("Lead guardado correctamente 🔥");
  form.reset();
});
