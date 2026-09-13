(() => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const header = document.querySelector(".site-header");
  const progressBar = document.querySelector(".scroll-progress span");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const savedTheme = localStorage.getItem("shadow-spectrum-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const setTheme = (theme) => {
    const isDark = theme === "dark";
    root.dataset.theme = isDark ? "dark" : "light";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute(
      "aria-label",
      isDark ? "Activar modo claro" : "Activar modo oscuro",
    );
    toggle.querySelector("span").textContent = isDark ? "☀" : "☾";
    localStorage.setItem("shadow-spectrum-theme", theme);
  };

  setTheme(savedTheme || (prefersDark ? "dark" : "light"));
  toggle.addEventListener("click", () =>
    setTheme(root.dataset.theme === "dark" ? "light" : "dark"),
  );

  const updateScrollState = () => {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress =
      scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    progressBar.style.transform = `scaleX(${progress})`;
    header.classList.toggle("scrolled", window.scrollY > 24);
  };

  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  const internalLinks = document.querySelectorAll('a[href^="#"]');
  let navigationTimeout;

  const finishNavigation = () => {
    document.body.classList.remove("is-navigating");
    window.clearTimeout(navigationTimeout);
  };

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));

      if (!target) return;

      event.preventDefault();
      window.clearTimeout(navigationTimeout);

      if (!reducedMotion.matches) {
        document.body.classList.add("is-navigating");
      }

      window.history.pushState(null, "", link.getAttribute("href"));

      target.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "start",
      });

      navigationTimeout = window.setTimeout(finishNavigation, 520);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document
    .querySelectorAll(".reveal")
    .forEach((element) => observer.observe(element));

  if (!reducedMotion.matches) {
    const parallaxElements = document.querySelectorAll("[data-parallax]");
    const tiltElements = document.querySelectorAll(".info-card, .price-card");

    window.addEventListener(
      "pointermove",
      (event) => {
        const pointerX = event.clientX / window.innerWidth - 0.5;
        const pointerY = event.clientY / window.innerHeight - 0.5;

        parallaxElements.forEach((element) => {
          const depth = Number(element.dataset.parallax);
          element.style.setProperty("--parallax-x", `${pointerX * depth}px`);
          element.style.setProperty("--parallax-y", `${pointerY * depth}px`);
        });
      },
      { passive: true },
    );

    tiltElements.forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        element.style.setProperty("--tilt-x", `${x * 2.5}deg`);
        element.style.setProperty("--tilt-y", `${y * -2.5}deg`);
      });
      element.addEventListener("pointerleave", () => {
        element.style.setProperty("--tilt-x", "0deg");
        element.style.setProperty("--tilt-y", "0deg");
      });
    });
  }
})();
