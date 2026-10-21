(function () {
  "use strict";

  /* ---------- Année du pied de page ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    toggle.querySelector("i").className = open ? "bi bi-x-lg" : "bi bi-list";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Lien actif selon la section visible ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav ul a"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Aperçu agrandi des captures d’écran ---------- */
  var box = document.getElementById("lightbox");
  var boxImg = document.getElementById("lightbox-img");
  var boxCaption = document.getElementById("lightbox-caption");

  if (box && typeof box.showModal === "function") {
    document.querySelectorAll(".shot").forEach(function (btn) {
      btn.addEventListener("click", function () {
        boxImg.src = btn.dataset.full;
        boxImg.alt = btn.querySelector("img").alt;
        boxCaption.textContent = btn.dataset.caption || "";
        box.showModal();
      });
    });
    box.querySelector(".lightbox-close").addEventListener("click", function () { box.close(); });
    // Fermer en cliquant à côté de l’image
    box.addEventListener("click", function (e) {
      if (e.target === box) box.close();
    });
  } else {
    // Navigateur sans <dialog> : ouvrir l’image dans un nouvel onglet
    document.querySelectorAll(".shot").forEach(function (btn) {
      btn.addEventListener("click", function () { window.open(btn.dataset.full, "_blank", "noopener"); });
    });
  }

  /* ---------- Formulaire : ouvre la messagerie avec le message prêt ---------- */
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var body =
        data.get("message") +
        "\n\n—\n" + data.get("nom") + "\n" + data.get("email");
      var url =
        "mailto:thiamaminata185@gmail.com" +
        "?subject=" + encodeURIComponent(data.get("objet")) +
        "&body=" + encodeURIComponent(body);
      window.location.href = url;
      if (note) {
        note.textContent = "Si rien ne s’ouvre, écrivez-moi directement à thiamaminata185@gmail.com.";
      }
    });
  }
})();
