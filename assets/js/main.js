/* ==========================================================================
   LOX RECOVERY — site scripts
   ========================================================================== */

const LOX_WHATSAPP_NUMBER = "5516991952928";

(function () {
  "use strict";

  /* ---- Header scroll state ---- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  const toggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.classList.toggle("is-open");
      mobileMenu.classList.toggle("is-open", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.classList.remove("is-open");
        mobileMenu.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-q");
    const answer = item.querySelector(".faq-a");
    if (!btn || !answer) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      item.parentElement.querySelectorAll(".faq-item.is-open").forEach((open) => {
        if (open !== item) {
          open.classList.remove("is-open");
          open.querySelector(".faq-a").style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove("is-open");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* ---- Footer year ---- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---- WhatsApp link builder ----
     Every whatsapp-cta element gets a prefilled wa.me link built from
     data-message (or a default), per the brief's WhatsApp integration rule. */
  function buildWaLink(message) {
    const text = encodeURIComponent(message || "Olá! Gostaria de falar com a equipe LOX Recovery.");
    return `https://wa.me/${LOX_WHATSAPP_NUMBER}?text=${text}`;
  }

  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    const msg = el.getAttribute("data-message");
    el.setAttribute("href", buildWaLink(msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* ---- Forms: validate, redirect to WhatsApp with prefilled message ---- */
  document.querySelectorAll("form[data-lox-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formName = form.getAttribute("data-lox-form");
      const fields = form.querySelectorAll("input, select, textarea");
      const lines = [`Olá! Vim pelo site da LOX Recovery — ${formName}.`];

      fields.forEach((field) => {
        if (field.type === "checkbox" || field.type === "hidden" || !field.name) return;
        const label = form.querySelector(`label[for="${field.id}"]`);
        const labelText = label ? label.textContent.trim() : field.name;
        if (field.value) lines.push(`${labelText}: ${field.value}`);
      });

      const message = lines.join("\n");
      const waLink = buildWaLink(message);

      const fieldsWrap = form.querySelector(".form-fields");
      const success = form.parentElement.querySelector(".form-success");
      if (fieldsWrap) fieldsWrap.classList.add("is-hidden");
      if (success) {
        success.classList.add("is-visible");
        const waBtn = success.querySelector("[data-wa-continue]");
        if (waBtn) waBtn.setAttribute("href", waLink);
      }

      window.open(waLink, "_blank", "noopener");
      form.reset();
    });
  });
})();
