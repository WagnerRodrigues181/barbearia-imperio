(() => {
  "use strict";

  const navbar = document.querySelector(".navbar");
  const toggle = document.getElementById("navbar-toggle");
  const menu = document.getElementById("menu-principal");
  const overlay = document.getElementById("navbar-overlay");
  const links = document.querySelectorAll(".navbar__link");

  if (!navbar || !toggle || !menu || !overlay) return;

  const BREAKPOINT_DESKTOP = 900;
  const SCROLL_THRESHOLD = 40;

  /* ===== Scroll solidify ===== */
  const handleScroll = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* ===== Menu mobile ===== */
  const openMenu = () => {
    menu.classList.add("is-open");
    overlay.classList.add("is-visible");
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
  };

  const closeMenu = () => {
    menu.classList.remove("is-open");
    overlay.classList.remove("is-visible");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  // Fecha ao clicar em qualquer link do menu (inclui o botão Agendar)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Fecha com ESC e devolve o foco ao botão
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  // Se redimensionar pra desktop com o menu aberto, reseta tudo
  window.addEventListener("resize", () => {
    if (window.innerWidth >= BREAKPOINT_DESKTOP) closeMenu();
  });

  /* ===== Link ativo conforme a seção visível ===== */
  const sections = [...links]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  }
})();