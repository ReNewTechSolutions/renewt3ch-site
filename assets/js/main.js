/* =========================================================
   FILE: assets/js/main.js
   renewt3ch · tiny enhancements
   - Glass nav on scroll
   - Accessible mobile menu (aria-expanded, ESC, click outside)
   - Auto aria-current for clean routes ("/about", "/pricing", etc.)
   ========================================================= */

   (() => {
    const header = document.querySelector(".site-header");
    const hamb = document.getElementById("hamb") || document.querySelector(".hamb");
    const links = document.getElementById("navLinks") || document.querySelector(".nav-links");
  
    /* ---------- Glass nav on scroll ---------- */
    const onScroll = () => {
      if (!header) return;
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  
    /* ---------- Mobile menu ---------- */
    const setMenu = (open) => {
      if (!hamb || !links) return;
      links.classList.toggle("open", open);
      hamb.classList.toggle("is-open", open);
      hamb.textContent = open ? "✕" : "☰";
      hamb.setAttribute("aria-expanded", open ? "true" : "false");
      hamb.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
  
    const closeMenu = () => setMenu(false);
    const toggleMenu = () => setMenu(!links?.classList.contains("open"));
  
    if (hamb && links) {
      // Ensure a11y wiring is present even if HTML changes
      hamb.setAttribute("aria-expanded", hamb.getAttribute("aria-expanded") || "false");
      if (!links.id) links.id = "navLinks";
      hamb.setAttribute("aria-controls", links.id);
  
      hamb.addEventListener("click", toggleMenu);
  
      // Close on nav click
      links.addEventListener("click", (e) => {
        const a = e.target?.closest?.("a");
        if (a) closeMenu();
      });
  
      // Close on ESC
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
      });
  
      // Close on outside click (when open)
      document.addEventListener("click", (e) => {
        if (!links.classList.contains("open")) return;
        const target = e.target;
        if (!target) return;
        if (links.contains(target) || hamb.contains(target)) return;
        closeMenu();
      });
    }
  
    /* ---------- Auto aria-current (clean URLs) ---------- */
    const normalizePath = (p) => {
      const s = String(p || "/").split("?")[0].split("#")[0];
      const noTrailing = s.replace(/\/+$/, "");
      return noTrailing === "" ? "/" : noTrailing;
    };
  
    const currentPath = normalizePath(location.pathname);
  
    document.querySelectorAll(".nav-links a").forEach((a) => {
      a.removeAttribute("aria-current");
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("/")) return; // only match clean routes
      if (normalizePath(href) === currentPath) {
        a.setAttribute("aria-current", "page");
      }
    });
  })();