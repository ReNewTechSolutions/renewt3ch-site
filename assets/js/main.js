/* =========================================================
   FILE: assets/js/main.js
   renewt3ch · tiny enhancements (safe / page-aware)
   - Glass nav on scroll (only if .site-header exists)
   - Accessible mobile menu (only if #hamb + .nav-links exist)
   - Auto aria-current (only if .nav-links exists)
   ========================================================= */

   (() => {
    "use strict";
  
    // Run after DOM is ready (prevents null refs on odd pages)
    const ready = (fn) => {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fn, { once: true });
      } else {
        fn();
      }
    };
  
    ready(() => {
      // If a page does not contain the main site nav/header (ex: brand-guide),
      // do NOTHING. This prevents any accidental layout or class changes.
      const header = document.querySelector(".site-header");
      const links = document.getElementById("navLinks") || document.querySelector(".nav-links");
      const hamb = document.getElementById("hamb") || document.querySelector(".hamb");
  
      const hasSiteNav = !!(header && links);
      if (!hasSiteNav) return; // <-- brand-guide page will bail out here
  
      /* ---------- Glass nav on scroll ---------- */
      const onScroll = () => {
        header.classList.toggle("scrolled", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
  
      /* ---------- Mobile menu ---------- */
      const setMenu = (open) => {
        if (!hamb) return; // allow desktop pages with no hamburger
        links.classList.toggle("open", open);
        hamb.classList.toggle("is-open", open);
        hamb.textContent = open ? "✕" : "☰";
        hamb.setAttribute("aria-expanded", open ? "true" : "false");
        hamb.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      };
  
      const closeMenu = () => setMenu(false);
      const toggleMenu = () => setMenu(!links.classList.contains("open"));
  
      if (hamb) {
        hamb.setAttribute("aria-expanded", hamb.getAttribute("aria-expanded") || "false");
        if (!links.id) links.id = "navLinks";
        hamb.setAttribute("aria-controls", links.id);
  
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
  
      /* ---------- Auto aria-current ---------- */
      const normalizePath = (p) => {
        const s = String(p || "/").split("?")[0].split("#")[0];
        const noTrailing = s.replace(/\/+$/, "");
        return noTrailing === "" ? "/" : noTrailing;
      };
  
      const currentPath = normalizePath(location.pathname);
  
      links.querySelectorAll("a").forEach((a) => {
        a.removeAttribute("aria-current");
        const href = a.getAttribute("href") || "";
        if (!href.startsWith("/")) return;
        if (normalizePath(href) === currentPath) a.setAttribute("aria-current", "page");
      });
    });
  })();