/* =========================================================
   FILE: assets/js/main.js
   renewt3ch · tiny enhancements (safe / page-aware)
   - Glass nav on scroll (only if .site-header exists)
   - Accessible mobile menu (only if #hamb + .nav-links exist)
   - Auto aria-current (supports "/about" and "/about.html")
   ========================================================= */

   (() => {
    "use strict";
  
    const onReady = (fn) => {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fn, { once: true });
      } else {
        fn();
      }
    };
  
    const normalizePath = (p) => {
      const s = String(p || "/").split("?")[0].split("#")[0];
      let t = s.replace(/\/+$/, "") || "/";
      t = t.replace(/index\.html$/i, "");
      t = t.replace(/\.html$/i, "");
      return t === "" ? "/" : t;
    };
  
    onReady(() => {
      // Bail out on pages that don't use the site header/nav (ex: brand-guide)
      const header = document.querySelector(".site-header");
      const links = document.getElementById("navLinks") || document.querySelector(".nav-links");
      if (!header || !links) return;
  
      const hamb = document.getElementById("hamb") || document.querySelector(".hamb");
  
      /* ---------- Glass nav on scroll ---------- */
      const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
  
      /* ---------- Mobile menu ---------- */
      const setMenu = (open) => {
        links.classList.toggle("open", open);
        if (!hamb) return;
        hamb.classList.toggle("is-open", open);
        hamb.textContent = open ? "✕" : "☰";
        hamb.setAttribute("aria-expanded", open ? "true" : "false");
        hamb.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      };
  
      const closeMenu = () => setMenu(false);
      const toggleMenu = () => setMenu(!links.classList.contains("open"));
  
      if (hamb) {
        if (!links.id) links.id = "navLinks";
        hamb.setAttribute("aria-controls", links.id);
        if (!hamb.hasAttribute("aria-expanded")) hamb.setAttribute("aria-expanded", "false");
  
        hamb.addEventListener("click", (e) => {
          e.preventDefault();
          toggleMenu();
        });
  
        links.addEventListener("click", (e) => {
          const a = e.target && e.target.closest ? e.target.closest("a") : null;
          if (a) closeMenu();
        });
  
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") closeMenu();
        });
  
        document.addEventListener("click", (e) => {
          if (!links.classList.contains("open")) return;
          const t = e.target;
          if (!t) return;
          if (links.contains(t) || hamb.contains(t)) return;
          closeMenu();
        });
      }
  
      /* ---------- Auto aria-current (supports .html + clean routes) ---------- */
      const current = normalizePath(location.pathname);
  
      links.querySelectorAll("a").forEach((a) => {
        a.removeAttribute("aria-current");
  
        const raw = a.getAttribute("href") || "";
        if (!raw) return;
  
        // support "/about" and "about.html" style
        const href = raw.startsWith("/") ? raw : ("/" + raw.replace(/^\.\//, ""));
        if (normalizePath(href) === current) a.setAttribute("aria-current", "page");
      });
    });
  })();