(() => {
  "use strict";

  const buttons = document.querySelectorAll(".filter__btn");
  const items = document.querySelectorAll(".service");

  if (!buttons.length || !items.length) return;

  const applyFilter = (filter) => {
    items.forEach((item) => {
      const visible = filter === "todos" || item.dataset.category === filter;
      item.hidden = !visible;
    });

    buttons.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter));
  });
})();