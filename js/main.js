"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // =====================================
  // MOBILE NAVIGATION
  // =====================================

  const menuButton = document.querySelector("[data-menu-button]");

  const mobileMenu = document.querySelector("[data-mobile-menu]");

  const menuIcon = menuButton?.querySelector("svg");

  if (menuButton && mobileMenu) {
    const openMenu = () => {
      mobileMenu.classList.remove("hidden");

      menuButton.setAttribute("aria-expanded", "true");

      menuButton.setAttribute("aria-label", "Tutup menu navigasi");

      if (menuIcon) {
        menuIcon.innerHTML = `
          <path d="m18 6-12 12M6 6l12 12"/>
        `;
      }
    };

    const closeMenu = () => {
      mobileMenu.classList.add("hidden");

      menuButton.setAttribute("aria-expanded", "false");

      menuButton.setAttribute("aria-label", "Buka menu navigasi");

      if (menuIcon) {
        menuIcon.innerHTML = `
          <path d="M4 7h16M4 12h16M4 17h16"/>
        `;
      }
    };

    // Toggle menu

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close after clicking navigation link

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close using Escape

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Close menu when clicking outside

    document.addEventListener("click", (event) => {
      const clickedInside =
        mobileMenu.contains(event.target) || menuButton.contains(event.target);

      if (!clickedInside) {
        closeMenu();
      }
    });

    // Close menu when viewport becomes desktop

    const desktopMedia = window.matchMedia("(min-width: 1024px)");

    desktopMedia.addEventListener("change", (event) => {
      if (event.matches) {
        closeMenu();
      }
    });
  }

  // =====================================
  // STICKY HEADER
  // =====================================

  const header = document.querySelector("#site-header");

  if (header) {
    const updateHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  // =====================================
  // ACTIVE NAVIGATION
  // =====================================

  const navigationLinks = document.querySelectorAll(
    ".desktop-navigation a, .mobile-navigation a",
  );

  const setActiveNavigation = (hash) => {
    navigationLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === hash;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const hash = link.getAttribute("href");

      if (hash) {
        setActiveNavigation(hash);
      }
    });
  });

  // =====================================
  // CURRENT YEAR
  // =====================================

  const yearElement = document.querySelector("[data-current-year]");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
