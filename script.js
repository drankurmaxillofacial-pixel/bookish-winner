/* =========================================================
   DENTAL HOME — script.js
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  function closeMenu() {
    mainNav.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
});

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (e) => {
      if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  const header = document.getElementById("siteHeader");
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 8 ? "0 6px 20px rgba(20,40,60,0.06)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll reveal animations ---------- */
  const animatedEls = document.querySelectorAll("[data-animate]");
  if ("IntersectionObserver" in window && animatedEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute("data-delay") || 0;
            entry.target.style.transitionDelay = `${delay}ms`;
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    animatedEls.forEach((el) => observer.observe(el));
  } else {
    animatedEls.forEach((el) => el.classList.add("in-view"));
  }

  /* ---------- Testimonial dots (visual state only; single testimonial shown) ---------- */
  const dots = document.querySelectorAll(".testimonial-dots .dot");
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      dots.forEach((d) => {
        d.classList.remove("active");
        d.setAttribute("aria-selected", "false");
      });
      dot.classList.add("active");
      dot.setAttribute("aria-selected", "true");
    });
  });

  /* ---------- Appointment form ---------- */
  const form = document.getElementById("appointmentForm");
  const status = document.getElementById("formStatus");
  const dateField = document.getElementById("date");

  if (dateField) {
    const today = new Date().toISOString().split("T")[0];
    dateField.setAttribute("min", today);
  }

  if (form && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = "Please fill in all required fields correctly.";
        status.className = "form-status error";
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());

      // Placeholder for real submission (API / email service / backend endpoint).
      console.log("Appointment request:", data);

      status.textContent = `Thank you, ${data.fullName.split(" ")[0]}! Your appointment request has been received. We'll call you shortly to confirm.`;
      status.className = "form-status success";
      form.reset();
    });
  }

  /* ---------- Smooth scroll offset for sticky header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();