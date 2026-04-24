document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formulario");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const correo = document.getElementById("correo").value;

      let leads = JSON.parse(localStorage.getItem("leads")) || [];

      leads.push({ nombre, correo });

      localStorage.setItem("leads", JSON.stringify(leads));

      window.location.href = "gracias.html";
    });
  }

});

function verLeads() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  let leads = JSON.parse(localStorage.getItem("leads")) || [];

  leads.forEach(l => {
    let li = document.createElement("li");
    li.textContent = l.nombre + " - " + l.correo;
    lista.appendChild(li);
  });
}