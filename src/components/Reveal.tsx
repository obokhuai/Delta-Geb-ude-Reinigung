"use client";

import { useEffect } from "react";

/**
 * Fades in `.reveal` elements that start below the fold.
 * Everything is visible without JavaScript and for reduced-motion users.
 */
export default function Reveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.remove("pending");
            io.unobserve(en.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    const vh = window.innerHeight;
    document.querySelectorAll(".reveal").forEach((el) => {
      if (el.getBoundingClientRect().top > vh) {
        el.classList.add("pending");
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, []);
  return null;
}
