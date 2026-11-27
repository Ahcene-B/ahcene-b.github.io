// light and dark (follows the system until the button is used), and the menu on small screens
(function () {
  var root = document.documentElement;
  document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var dark = root.getAttribute("data-theme") ? root.getAttribute("data-theme") === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
      var next = dark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  });
  var menu = document.querySelector(".menu"), sections = document.getElementById("sections");
  if (menu && sections) {
    menu.addEventListener("click", function () {
      var open = sections.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
  }
})();
