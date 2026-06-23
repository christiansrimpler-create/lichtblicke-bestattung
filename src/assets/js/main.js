/* Lichtblicke Bestattung – mobiles Menü, Einblenden beim Scrollen, Header-Effekt */

(function () {
  "use strict";

  /* ---- Mobiles Menü ---- */
  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".mobile-menu");
  var closeBtn = document.querySelector(".menu-close");

  function openMenu() {
    menu.classList.add("open");
    document.body.style.overflow = "hidden";
    burger.setAttribute("aria-expanded", "true");
    if (closeBtn) closeBtn.focus();
  }
  function closeMenu() {
    menu.classList.remove("open");
    document.body.style.overflow = "";
    burger.setAttribute("aria-expanded", "false");
    burger.focus();
  }

  if (burger && menu) {
    burger.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) closeMenu();
    });
  }

  /* ---- Header bekommt beim Scrollen einen Schatten ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Dezentes Einblenden beim Scrollen ---- */
  var revealEls = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- Pakete: nur auf Mobile als Dropdown; auf Desktop dauerhaft offen ---- */
  var accs = document.querySelectorAll("details.paket-acc");
  if (accs.length) {
    var deskMq = window.matchMedia("(min-width: 761px)");
    var applyAccMode = function () {
      var desktop = deskMq.matches;
      accs.forEach(function (d) {
        d.classList.toggle("paket-acc--static", desktop);
        if (desktop) d.open = true;
      });
    };
    // Auf Desktop das Zuklappen per Klick verhindern
    accs.forEach(function (d) {
      var s = d.querySelector("summary");
      if (s) s.addEventListener("click", function (e) {
        if (deskMq.matches) e.preventDefault();
      });
    });
    applyAccMode();
    deskMq.addEventListener("change", applyAccMode);
  }

  /* ---- Preise: per Sprungmarke das passende Dropdown öffnen ---- */
  function openHashDetails() {
    if (!location.hash) return;
    var el = document.getElementById(location.hash.slice(1));
    if (el && el.tagName === "DETAILS") {
      el.open = true;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  window.addEventListener("hashchange", openHashDetails);
  if (location.hash) setTimeout(openHashDetails, 60);
})();
