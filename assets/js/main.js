/* =========================================================
   FILE: assets/js/main.js
   renewt3ch · tiny enhancements (dark-only)
   - Glass nav on scroll
   - Accessible mobile menu toggle (aria-expanded, ESC, click outside)
   ========================================================= */
   (() => {
    const header = document.querySelector(".site-header");
    const hamb = document.getElementById("hamb") || document.querySelector(".hamb");
    const links =
      document.getElementById("navLinks") || document.querySelector(".nav-links");
  
    const onScroll = () => {
      if (!header) return;
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  
    const setMenu = (open) => {
      if (!hamb || !links) return;
      links.classList.toggle("open", open);
      hamb.classList.toggle("is-open", open);
      hamb.textContent = open ? "✕" : "☰";
      hamb.setAttribute("aria-expanded", open ? "true" : "false");
      hamb.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
  
    const closeMenu = () => setMenu(false);
    const toggleMenu = () => {
      if (!links) return;
      setMenu(!links.classList.contains("open"));
    };
  
    if (hamb && links) {
      hamb.setAttribute("aria-expanded", "false");
      if (!links.id) links.id = "navLinks";
      hamb.setAttribute("aria-controls", links.id);
  
      hamb.addEventListener("click", toggleMenu);
  
      links.addEventListener("click", (e) => {
        const t = e.target;
        if (t && t.tagName === "A") closeMenu();
      });
  
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
      });
  
      document.addEventListener("click", (e) => {
        if (!links.classList.contains("open")) return;
        const target = e.target;
        if (!target) return;
        if (links.contains(target) || hamb.contains(target)) return;
        closeMenu();
      });
    }
  })();