/* =========================================================
   FILE: assets/js/main.js 
   - Theme defaults to user preference (prefers-color-scheme)
   - Theme toggle is icon-only and lives in mobile menu
   - Swapper handles <img src> AND inline SVG <use href/xlink:href>
   ========================================================= */
   (() => {
    const header = document.querySelector(".site-header");
    const hamb = document.getElementById("hamb") || document.querySelector(".hamb");
    const links =
      document.getElementById("navLinks") || document.querySelector(".nav-links");
  
    /* ---------- Glass nav on scroll ---------- */
    const onScroll = () => {
      if (!header) return;
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  
    /* ---------- Accessible mobile menu ---------- */
    const setHambState = (open) => {
      if (!hamb || !links) return;
      links.classList.toggle("open", open);
      hamb.classList.toggle("is-open", open);
      hamb.textContent = open ? "✕" : "☰";
      hamb.setAttribute("aria-expanded", open ? "true" : "false");
      hamb.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
  
    const closeMenu = () => setHambState(false);
    const toggleMenu = () => {
      if (!links) return;
      setHambState(!links.classList.contains("open"));
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
  
    /* ---------- Theme system ---------- */
    const STORAGE_KEY = "renewt3ch-theme";
    const root = document.documentElement;
  
    const prefersLight = () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
  
    const isLight = () => root.getAttribute("data-theme") === "light";
  
    const getInitialTheme = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
      return prefersLight() ? "light" : "dark";
    };
  
    /* ---------- Asset swapping rules ---------- */
    const EXPLICIT_SWAPS = [
      { re: /wordmark-pure-white(\.[a-z0-9]+)$/i, to: "wordmark-black$1" },
    ];
  
    const tokenSwapWhiteToBlack = (s) =>
      s.replace(/(^|[\/._-])white(?=([\/._-]|$))/gi, "$1black");
  
    const lightVariant = (src) => {
      for (const rule of EXPLICIT_SWAPS) {
        if (rule.re.test(src)) return src.replace(rule.re, rule.to);
      }
      return tokenSwapWhiteToBlack(src);
    };
  
    function syncImgAssets(theme) {
      const light = theme === "light";
      const imgs = document.querySelectorAll(
        ".logo-band img, .logo-tile img, img[data-swap-theme]"
      );
  
      imgs.forEach((img) => {
        const src = img.getAttribute("src");
        if (!src) return;
  
        if (!img.dataset.srcDark) img.dataset.srcDark = src;
  
        img.setAttribute("src", light ? lightVariant(img.dataset.srcDark) : img.dataset.srcDark);
      });
    }
  
    function syncSvgUseAssets(theme) {
      const light = theme === "light";
      const uses = document.querySelectorAll("svg use");
  
      uses.forEach((u) => {
        const href = u.getAttribute("href") || u.getAttribute("xlink:href");
        if (!href) return;
  
        // store original once
        if (!u.dataset.hrefDark) u.dataset.hrefDark = href;
  
        const next = light ? lightVariant(u.dataset.hrefDark) : u.dataset.hrefDark;
  
        if (u.hasAttribute("href")) u.setAttribute("href", next);
        if (u.hasAttribute("xlink:href")) u.setAttribute("xlink:href", next);
      });
    }
  
    function syncAllAssets(theme) {
      syncImgAssets(theme);
      syncSvgUseAssets(theme);
    }
  
    const setTheme = (theme) => {
      if (theme === "light") root.setAttribute("data-theme", "light");
      else root.removeAttribute("data-theme");
      localStorage.setItem(STORAGE_KEY, theme);
      syncAllAssets(theme);
      syncThemeBtn();
    };
  
    /* ---------- Mobile menu theme toggle (icon-only) ---------- */
    const injectThemeToggleIntoMenu = () => {
      if (!links) return null;
  
      const existing = links.querySelector("[data-theme-toggle]");
      if (existing) return existing;
  
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn--ghost theme-toggle--icon";
      btn.setAttribute("data-theme-toggle", "true");
      btn.setAttribute("aria-pressed", "false");
  
      links.appendChild(btn);
  
      btn.addEventListener("click", () => {
        setTheme(isLight() ? "dark" : "light");
      });
  
      return btn;
    };
  
    const themeBtn = injectThemeToggleIntoMenu();
  
    const syncThemeBtn = () => {
      if (!themeBtn) return;
      const light = isLight();
      themeBtn.textContent = light ? "☀" : "☾";
      themeBtn.setAttribute("aria-pressed", light ? "true" : "false");
      themeBtn.setAttribute(
        "aria-label",
        light ? "Switch to dark theme" : "Switch to light theme"
      );
      themeBtn.title = light ? "Switch to dark theme" : "Switch to light theme";
    };
  
    /* ---------- Init ---------- */
    setTheme(getInitialTheme());
  
    // Optional: if user never picked a theme, follow OS changes live
    if (!localStorage.getItem(STORAGE_KEY) && window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: light)");
      const onChange = () => setTheme(prefersLight() ? "light" : "dark");
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  })();