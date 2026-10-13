document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const opened = nav.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(opened));
      toggle.textContent = opened ? "✕" : "☰";
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  document.querySelectorAll("[data-copy]").forEach(button => {
    button.addEventListener("click", async () => {
      const text = button.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(text);
        const old = button.textContent;
        button.textContent = "Скопировано ✓";
        button.classList.add("copied");
        setTimeout(() => {
          button.textContent = old;
          button.classList.remove("copied");
        }, 1400);
      } catch (error) {
        window.prompt("Скопируй текст:", text);
      }
    });
  });

  document.querySelectorAll(".print-button").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".cheat-card");
      if (!card) return;
      document.body.classList.add("printing-card");
      card.classList.add("print-target");
      window.print();
      card.classList.remove("print-target");
      document.body.classList.remove("printing-card");
    });
  });
});
